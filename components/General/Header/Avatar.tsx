"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

const Avatar: FC<{ src: string }> = ({ src }) => {
  return (
    <Image
      onClick={() => signOut()}
      className="rounded-full cursor-pointer"
      src={src}
      width={40}
      height={40}
      layout="fixed"
      alt="avatar"
    />
  );
};

export default Avatar;
