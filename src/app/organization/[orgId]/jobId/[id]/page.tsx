import { getJobDataById } from "@/app/actions/JobActions";
import ReactTimeAgo from "@/app/components/ReactTimeAgo";
import Image from "next/image";
import React from "react";

// Assuming this is a server-side component (using async/await)
const JobPopUp = async ({
  params,
}: {
  params: {
    orgId: string;
    id: string;
  };
}) => {
  let job;
  try {
    job = await getJobDataById(params.id);
  } catch (error) {
    console.error("Error occurred while fetching job details", error);
    return <div>Error occurred while fetching job details</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {job ? (
        <div className="bg-white px-6 py-6 rounded-lg shadow-xl ">
          <div className="flex items-center w-full gap-10 pb-4 border-b-2">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <Image
                src={job.jobIcon}
                alt="Company Icon"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <div className="flex-1 text-start">
              <h1 className="text-4xl font-bold">{job.title}</h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:gap-4 mt-4">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <Image
                src={job.contactPhoto}
                alt="Contact Photo"
                width={100}
                height={100}
                className="rounded-full"
              />
              <p className="text-center">Contact Photo</p>
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium">{job.contactName}</p>
              <p>{job.contactEmail}</p>
              <p>{job.contactPhone}</p>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Job Address</h2>
            <p>
              {job.city}, {job.state}, {job.country}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:gap-4 mt-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Salary </h2>
              <p>${job.salary} k/y</p>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Job Type</h2>
              <p className=" capitalize">{job.type} Time</p>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Job Description</h2>
            <p>{job.description}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Created At</h2>
            <p>
              <ReactTimeAgo createdAt={job.createdAt} />
            </p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default JobPopUp;
