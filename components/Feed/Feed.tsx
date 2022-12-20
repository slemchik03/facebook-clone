import { Suspense } from "react";
import { InputBox } from "./InputBox";
import Posts from "./Posts/Posts";
import Stories from "./Stories";

export default async function Feed() {
  return (
    <div className="flex justify-center pt-7 md:mr-[110px]">
      <div>
        {/* Stories */}
        {/* @ts-ignore Server Component */}
        <Stories />
        {/* Input box */}
        <InputBox />
        {/* Posts */}
        <Suspense fallback={<h1>loading</h1>} >
           {/* @ts-ignore Server Component */}
          <Posts />
        </Suspense>
      </div>
    </div>
  );
}
