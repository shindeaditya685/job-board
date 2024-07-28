"use client";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useRef } from "react";
import { JobRowProps } from "@/models/Job";
import ReactTimeago from "react-timeago";
import Link from "next/link";
import { deleteJobAction } from "../actions/JobActions";
import { usePathname } from "next/navigation";

const JobRow = ({ job }: { job: JobRowProps }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const currentPath = usePathname();

  async function handleDeleteJob(id: string, orgId: string) {
    const jobDoc = await deleteJobAction(id, orgId);
    // Handle any further actions after deleting the job
  }

  return (
    <>
      <Link
        ref={linkRef}
        className="hidden"
        href={`/organization/${job?.orgId}/jobId/${job?._id}`}
      ></Link>
      <div
        onClick={
          currentPath === "/" ? () => linkRef.current?.click() : undefined
        }
        className={`bg-white p-4 rounded-lg shadow-sm relative ${
          currentPath === "/" && "cursor-pointer" 
        } `}
      >
        <div className="absolute cursor-pointer top-4 right-4 ">
          <FontAwesomeIcon icon={faHeart} className="size-4 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <div className="content-center">
            <Image src={job.jobIcon} alt="logo" width={50} height={50} />
          </div>
          <div className="grow sm:flex ">
            <div className="grow">
              <p className="text-gray-500 text-sm">{job.orgName}</p>
              <p className="font-bold text-lg mb-1">{job.title}</p>
              <p className="text-sm text-gray-400 capitalize">
                {job.remote} &middot; {job.city}, {job.country} &middot;{" "}
                {job.type}-Time
                {job.isAdmin && (
                  <>
                    {" "}
                    &middot; <Link href={`/jobs/edit/${job._id}`}>
                      {" "}
                      Edit{" "}
                    </Link>{" "}
                    &middot;{" "}
                    <button onClick={() => handleDeleteJob(job._id, job.orgId)}>
                      Delete
                    </button>
                  </>
                )}
              </p>
            </div>
            {job.createdAt && (
              <p className="content-end text-gray-500 text-sm">
                <ReactTimeago date={job.createdAt} />
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobRow;
