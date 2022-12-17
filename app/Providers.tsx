"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { Auth } from "../components/General/Auth";

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <Auth>
        {children}
      </Auth>
    </SessionProvider>
  );
};

export default Providers;
