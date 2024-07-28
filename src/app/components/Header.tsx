import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from "@workos-inc/authkit-nextjs";
import Link from "next/link";

const Header = async () => {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();

  return (
    <header>
      <div className="container flex items-center justify-between mx-auto my-4">
        <Link href={"/"} className="font-bold text-xl">
          Job Board
        </Link>
        <nav className="flex gap-2  ">
          {!user ? (
            <Link className="bg-gray-200 py-2 px-4 rounded-md" href={signInUrl}>
              Login
            </Link>
          ) : (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="bg-gray-200 py-2 px-4 rounded-md"
              >
                Logout
              </button>
            </form>
          )}
          <Link
            className="bg-blue-600 py-2 px-4 rounded-md text-white"
            href={"/new-listing"}
          >
            Post a job
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
