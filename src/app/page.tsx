import { getAllJobsAction } from "./actions/JobActions";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";

export default async function Home() {
  const jobDocs = await getAllJobsAction();


  return (
    <>
      <Hero />
      <Jobs header="Recent Jobs" jobs={jobDocs}  />
    </>
  );
}
