import JobForm from "@/app/components/JobForm";
import { getSignInUrl, getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import { redirect } from "next/navigation";

import "react-country-state-city/dist/react-country-state-city.css";

interface PageProps {
  params: {
    orgId: string;
  };
}

const NewListingForOrgPage = async ({ params }: PageProps) => {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();

  if (!user) {
    redirect(signInUrl);
  }

  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const orgId = params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user?.id,
    organizationId: orgId,
  });
  const hasAccess = oms.data.length > 0;

  if (!hasAccess) {
    return <div className="container">No access.</div>;
  }

  return (
    <>
      <JobForm orgId={orgId} />
    </>
  );
};

export default NewListingForOrgPage;
