import { Chat } from "../models/chat.model.js";
import { askAI } from "../utils/ai.js";
import {User} from "../models/user.model.js";
import {Job} from "../models/job.model.js";

export const createChat = async (req, res) => {
  try {
    const { title } = req.body;
    const chat = await Chat.create({
      userId: req.id,
      title: title,
      messages: [],
    });

    res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const chatMessages = async (req, res) => {
  try {
    const { chatId, message } = req.body;

    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.id,
    });

    console.log(chat);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    chat.messages.push({
      role: "user",
      content: message,
    });

    const history = chat.messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    console.log("History:", history);
    const aiReply = await askAI(history);
    console.log("AI Reply:", aiReply);

    chat.messages.push({
      role: "assistant",
      content: aiReply,
    });

    await chat.save();

    res.status(200).json({
      success: true,
      reply: aiReply,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      userId: req.id,
    })
      .select("title updatedAt")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      userId: req.id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const recommendJobs = async (req, res) => {
  try {
    // 1. Logged in user

    const user = await User.findById(req.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Fetch jobs

    const jobs = await Job.find().populate("company").limit(30);

    if (!jobs.length) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
      });
    }
    console.log("Fetched Jobs:", jobs.length);
    // 3. Prepare jobs for AI

    const jobsForAI = jobs.map((job) => ({
      id: job._id.toString(),
      title: job.title,
      description: job.description,
      location: job.location,
      requirements: job.requirements,
    }));

    // 4. User profile

    const userSkills = user.profile.skills || [];
    // console.log("User Skills:", userSkills);

    const userExperience = user.profile.experience || "Fresher";
    // console.log("User Experience:", userExperience);

    // 5. AI Prompt

    const prompt = `You are an AI Job Recommendation System.

        User Skills:${userSkills.join(", ")}
        Experience:${userExperience}
        Available Jobs:${JSON.stringify(jobsForAI)}
        Recommend top 10 jobs.
      Return ONLY JSON.

  Format:

[
 {
   "jobId":"",
   "matchPercentage":95,
   "reason":""
 }
]

Rules:

1. Use only given job ids.
2. Do not create new jobs.
3. No markdown.
4. No extra text.
`;

    // 6. AI Call

    const aiReply = await askAI(prompt);

    // 7. Clean AI response

    const cleaned = aiReply
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // 8. Convert JSON

    const aiData = JSON.parse(cleaned);
    // console.log("AI Data:", aiData.length);

    // 9. Extract ids

    const ids = aiData.map((item) => item.jobId);

    // 10. Fetch jobs again

    const recommendedJobs = await Job.find({
      _id: { $in: ids },
    }).populate("company");

    // 11. Merge AI data

    const finalJobs = recommendedJobs.map((job) => {
      const extra = aiData.find((item) => item.jobId === job._id.toString());

      return {
        ...job.toObject(),

        matchPercentage: extra?.matchPercentage || 0,

        reason: extra?.reason || "",
      };
    });

    // 12. Sort

    finalJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // 13. Return response

    return res.status(200).json({
      success: true,
      jobs: finalJobs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
