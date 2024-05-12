"use client";
import useAuth from "@/hooks/useAuth";
import { SignInType } from "@/types/auth";
import { Button, Checkbox, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
type Props = {};

const SignInPage = (props: Props) => {
  const { signIn, isLoading } = useAuth();

  const [dataUser, setDataUser] = useState<SignInType>({
    email: "",
    password: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(dataUser);
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
      <TextField
        type="email"
        label="Email"
        name="email"
        className="w-full"
        onChange={handleOnChange}
      />
      <TextField
        type="password"
        label="Password"
        name="password"
        className="w-full"
        onChange={handleOnChange}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <Checkbox name="remember" />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Forgot password?
        </Link>
      </div>
      <LoadingButton
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        className="w-full text-white !bg-blue-600 hover:!bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-[50px]"
      >
        Sign in
      </LoadingButton>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Link
          href={"/signup"}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignInPage;
