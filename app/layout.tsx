import { headers } from "next/headers";
import Header from "../components/General/Header/Header";
import "../styles/global.css";
import getSession from "../utils/getSession";
import Providers from "./Providers";

export default async function RootLayout({ children }) {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <html lang="en">
      <head>
        <title>Social media clone</title>
      </head>
      <body>
        <Providers>
          {/* @ts-ignore Server Component */}
          {session?.user && <Header />}
          <main className="px-2 min-h-screen bg-gray-50">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
