import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js";
//Admin job posting
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const users = await User.find({
      role: "Student"
   });
  //  console.log(users)

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    for (const user of users) {

  await sendEmail(
    user.email,
    "🚀 New Job Opportunity",

    `
      <div style="font-family: Arial; padding:20px;">

        <h2 style="color:#2563eb;">
          New Job Posted 🚀
        </h2>

        <hr/>

        <p><strong>Job Title:</strong> ${job.title}</p>

        <p><strong>Description:</strong> ${job.description}</p>

        <p><strong>Location:</strong> ${job.location}</p>

        <p><strong>Salary:</strong> ₹${job.salary}</p>

        <p><strong>Job Type:</strong> ${job.jobType}</p>

        <p><strong>Experience:</strong> ${job.experienceLevel} years</p>

        <p><strong>Requirements:</strong> ${job.requirements.join(", ")}</p>

        <br/>

        <a 
          href="http://localhost:5173/jobs"
          style="
            background:#2563eb;
            color:white;
            padding:10px 20px;
            text-decoration:none;
            border-radius:5px;
          "
        >
          Apply Now
        </a>

        <br/><br/>

        <p>
          Best Regards,<br/>
          Job Portal Team
        </p>

      </div>
    `
  );
}

    res.status(201).json({
      message: "Job posted successfully.",
      job,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};

//Users
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    // console.log(jobs)

    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", status: false });
    }
    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};

//Users
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications company",
    });
    // console.log(job)
    if (!job) {
      return res.status(404).json({ message: "Job not found", status: false });
    }
    return res.status(200).json({ job, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};

//Admin job created

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      sort: { createdAt: -1 },
    });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", status: false });
    }
    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};

// Admin job update
export const updateJobs = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      position,
      requirements,
      experienceLevel,
      jobType,
    } = req.body;
    // console.log(title);
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", status: false });
    }
    if (title) job.title = title;
    if (description) job.description = description;
    if (location) job.location = location;
    if (salary) job.salary = Number(salary);
    if (position) job.position = Number(position);
    if (requirements) job.requirements = requirements;
    if (experienceLevel) job.experienceLevel = Number(experienceLevel);
    if (jobType) job.jobType = jobType;

    await job.save();

    const updatedJob = {
      _id: job._id,
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      position: job.position,
      requirements: job.requirements,
      experienceLevel: job.experienceLevel,
      jobType: job.jobType,
    };

    return res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error updating profile",
      success: false,
    });
  }
};

// star job
export const starJob = async (req, res) => {
  try {

    const userId = req.id;
    const jobId = req.params.id;

    const user = await User.findById(userId);


    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    // already saved check
    const isSaved = user.profile.savedJobs.some(
      (id) => id.toString() === jobId
    );

    // jo saved na hoy to add karo
    if (!isSaved) {
      user.profile.savedJobs.push(jobId);
      await user.save();
    }

    // IMPORTANT
    // updated populated data fetch karo
    const updatedUser = await User.findById(userId).populate({
      path: "profile.savedJobs",
      populate: {
        path: "company",
      },
    });

    return res.status(200).json({
      status: true,
      message: "Job starred successfully",
      starredJobs: updatedUser.profile.savedJobs,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      status: false,
    });
  }
};
// star job fetch
export const getStarredJobs = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).populate({
      path: "profile.savedJobs",
      populate: {
        path: "company",
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    return res.status(200).json({
      savedJobs: user.profile.savedJobs,
      status: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      status: false,
    });
  }
};

// remove star job
export const removeStarredJob = async (req, res) => {
  try {

    const userId = req.id;
    const jobId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    // remove job from savedJobs
    user.profile.savedJobs = user.profile.savedJobs.filter(
      (id) => id.toString() !== jobId
    );

    await user.save();

    // IMPORTANT
    // latest updated populated user fetch karo
    const updatedUser = await User.findById(userId).populate({
      path: "profile.savedJobs",
      populate: {
        path: "company",
      },
    });

    return res.status(200).json({
      status: true,
      message: "Job removed from starred",
      starredJobs: updatedUser.profile.savedJobs,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      status: false,
    });
  }
};