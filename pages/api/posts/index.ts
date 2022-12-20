import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../../firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = new URL(process.env.NEXTAUTH_URL + req.url).searchParams;
  const userId = params.get("userId");
  const postsLimit = +params.get("limit");

  const preloadedPosts = await getDocs(
    query(
      collection(firestore, "users", userId + "", "posts"),
      limit(!postsLimit ? 10 : postsLimit * 10),
      orderBy("timestamp", "desc")
    )
  ).then((data) =>
    data.docs.map((post) => {
      return {
        id: post.id,
        ...post.data(),
        timestamp: null,
      };
    })
  );

  return res.status(200).json(preloadedPosts);
}
