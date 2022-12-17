"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import {checkAccess} from "../../utils/pageAccess";
import { Spinner } from "./Spinner";


interface Props {
  children: ReactNode
}

export const Auth: FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const pageAccess = checkAccess(pathname);
  const { data: session } = useSession();

  useEffect(() => {
    if (pageAccess === "protected" && !session?.user) {
      // redirect
      router.push("/403");
    }
  }, [router]);
  
  return (
    // if user auth or page is public draw page
    <>{children}</>
  );
};
