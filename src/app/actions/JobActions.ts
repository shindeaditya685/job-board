"use server";

import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function getJobDataById(id:string) {
   await mongoose.connect(process.env.MONGO_CONNECTION_URL as string);
   const job = await JobModel.findById({_id: id});
   return JSON.parse(JSON.stringify(job));
}

export async function getAllJobsAction() {
  await mongoose.connect(process.env.MONGO_CONNECTION_URL as string);
  const jobDocs = await JobModel.find({});

  return JSON.parse(JSON.stringify(jobDocs));

}

export async function saveJobAction(formData: FormData) {
  await mongoose.connect(process.env.MONGO_CONNECTION_URL as string);
  const { id, ...jobData } = Object.fromEntries(formData);
  let jobDoc;

  try {
    jobDoc = id
      ? await JobModel.findByIdAndUpdate(id, jobData, { new: true })
      : await JobModel.create(jobData);
  } catch (error) {
    console.error("Error saving job:", error);
    return { error: "Failed to save job" };
  }

  if (jobData.orgId) {
    try {
      await revalidatePath(`/jobs/${jobData.orgId}`);
    } catch (error) {
      console.error("Error revalidating path:", error);
    }
  }

  return JSON.parse(JSON.stringify(jobDoc));
}

export async function deleteJobAction(id: string, orgId: string) {
  await mongoose.connect(process.env.MONGO_CONNECTION_URL as string);
  const jobDoc = await JobModel.findByIdAndDelete({ _id: id });

  await revalidatePath(`/jobs/${orgId}`);
  return JSON.parse(JSON.stringify(jobDoc));
}
