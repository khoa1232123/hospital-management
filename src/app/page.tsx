"use client";
import SignIn from "@/components/auth/SignIn";
import useAuth from "@/hooks/useAuth";
import { Button } from "@mui/material";

export default function Home() {
  const { user, signOut, isPageLoading } = useAuth();

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh] w-full">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center">
      {user ? <Button onClick={signOut}>Sign Out</Button> : <SignIn />}
    </main>
  );
}
