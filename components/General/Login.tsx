"use client";

import { FC } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export const Login: FC = () => {
  return (
    <div className="grid place-items-center pt-[150px]">
      <Image
        width={200}
        height={200}
        src="/google-logo.png"
        className="rounded-full object-contain"
        alt="google image"
      />
      <h1
        onClick={() => signIn("google")}
        className="bg-blue-500 mt-5 text-white text-center 
            p-3 text-[16px] font-bold rounded-full cursor-pointer"
      >
        Login with your Google account:
      </h1>
    </div>
  );
};
