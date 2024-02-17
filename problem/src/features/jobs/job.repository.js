// Please don't change the pre-written code
// Import the necessary modules here

import mongoose from "mongoose";
import { applyJobSchema } from "./schema/applyJob.schema.js";
import { jobSchema } from "./schema/newJob.schema.js";

const jobModel = mongoose.model('Job', jobSchema);
const jobApplicationModel = mongoose.model('JobApplicants', applyJobSchema);
var ObjectId = mongoose.Types.ObjectId;

export const createNewJob = async (job) => {
  // Write your code here
  try {
    const createdJob = new jobModel(job);
    await createdJob.save();
    return createdJob;
  } catch (error) {
    console.log(error);
  }
};

export const applyJobRepo = async (jobId, userId) => {
  // Write your code here
  try {
    const jobRepo = await jobModel.findOne({ _id: new ObjectId(jobId), applicants: { $in: [userId]} });
    if(!jobRepo) {
      const newApply = new jobApplicationModel({
        jobId,
        userId
      });
      await newApply.save();
      const applyJob = await jobModel.findOneAndUpdate({ _id: new ObjectId(jobId) }, { $push: { applicants: userId } }, { new: true });
      return applyJob;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
export const findJobRepo = async (_id) => {
  // Write your code here
  try {
    const jobRepo = await jobModel.findById({ _id });
    return jobRepo;
  } catch (error) {
    console.log(error);
  }
};
