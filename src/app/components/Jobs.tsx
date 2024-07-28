import JobRow from "./JobRow";
import { JobRowProps } from "@/models/Job";

const Jobs = ({
  header,
  jobs,
}: {
 
  header: string;
  jobs: JobRowProps[];
}) => {
  return (
    <div className="bg-slate-200 py-6 rounded-3xl">
      <div className="container">
        <h2 className="font-bold mb-4">{header}</h2>
        <div className="flex flex-col gap-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job, index) => (
              <JobRow key={index} job={job}  />
            ))
          ) : (
            <div>No job found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
