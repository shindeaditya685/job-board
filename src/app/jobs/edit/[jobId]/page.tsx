import JobForm from "@/app/components/JobForm";
import { JobModel } from "@/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

interface PageProps {
  params: {
    jobId: string;
  };
}

const EditJobPage = async ({ params }: PageProps) => {
  const jobId = params.jobId;

  await mongoose.connect(process.env.MONGO_CONNECTION_URL as string);
  const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));
  if (!jobDoc) return <div className="container">Not found!</div>;
  const { user } = await getUser();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  if (!user) {
    return <div className="container">You need to login</div>;
  }

  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: jobDoc.orgId,
  });

  if (oms.data.length === 0) {
    return <div className="container">Access denied!</div>;
  }

  return (
    <div className="container">
      <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc}/>
    </div>
  );
};

export default EditJobPage;
