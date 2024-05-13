"use client";
import useAuth from "@/hooks/useAuth";
import GoogleIcon from "@/icons/google";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const route = useRouter();
  const pathname = usePathname();
  const { user, isPageLoading, signInWithGoogle, isLoading } = useAuth();

  useEffect(() => {
    if (user) {
      route.push("/");
    }
  }, [user?.email]);

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh] w-full">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white no-underline"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign {pathname.includes("signup") ? "up" : "in"} to your account
            </h1>
            <div className="signin-with-google">
              <LoadingButton
                loading={isLoading}
                className="bg-white border-[1px] border-gray-200 border-solid w-full gap-2 h-[50px]"
                onClick={signInWithGoogle}
              >
                <div className="w-5">
                  <GoogleIcon />
                </div>
                Sign in with Google
              </LoadingButton>
            </div>
            <div className="text-sm text-center text-gray-500 dark:text-gray-400 flex items-center gap-4">
              <div className="w-full bg-gray-300 h-[2px]"></div>
              <div>or</div>
              <div className="w-full bg-gray-300 h-[2px]"></div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
