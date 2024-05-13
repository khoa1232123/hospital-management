import { auth } from "@/lib/firebase/client";
import { SignInType, SignUpType } from "@/types/auth";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const route = useRouter();
  const [isPageLoading, setIsPageLoading] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(() => {
    const userJSON =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    return userJSON !== null ? JSON.parse(userJSON) : null;
  });

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
      setIsPageLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const signInWithGoogle = () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log("Signed in successfully!", userCredential);
        route.push("/");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Sign in failed!", error);
        setIsLoading(false);
      });
  };

  const signIn = (user: SignInType) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        console.log("Signed in successfully!", userCredential);
        setIsLoading(false);
        route.push("/");
      })
      .catch((error) => {
        console.log("Sign in failed!", { error });
        setIsLoading(false);
      });
  };

  const signUp = (user: SignUpType) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        console.log("Signed in successfully!", userCredential);
        setIsLoading(false);
        route.push("/");
      })
      .catch((error) => {
        console.log("Sign in failed!", error);
        setIsLoading(false);
      });
  };

  const signOut = () => {
    signOutAuth(auth)
      .then(() => {
        console.log("Signed out successfully!");
        route.push("/signin");
      })
      .catch((error) => {
        console.log("Sign out failed!", error);
      });
  };

  return {
    signIn,
    isLoading,
    isPageLoading,
    signUp,
    signOut,
    user,
    signInWithGoogle,
  };
};

export default useAuth;
