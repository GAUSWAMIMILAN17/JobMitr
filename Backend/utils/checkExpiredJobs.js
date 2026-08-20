import { Job } from "../models/job.model.js";

export const closeExpiredJobs = async () => {
  try {
    const now = new Date();

    const result = await Job.updateMany(
      {
        applicationDeadline: { $lte: now },
        status: "ACTIVE",
      },
      {
        $set: {
          status: "CLOSED",
        },
      }
    );
    console.log("Expired jobs check completed.");

    if (result.modifiedCount > 0) {
      console.log(
        `${result.modifiedCount} expired job(s) automatically closed`
      );
    }
  } catch (error) {
    console.error("Error closing expired jobs:", error);
  }
};