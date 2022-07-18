import { NextPage } from "next";
import { ReactChild, ReactElement } from "react";

type NextCustomPage<P = {}> = NextPage<P> & {
    access: "protected" | "public",
    getLayout: (page: ReactElement) => ReactNode
}

