"use client";

import { deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FC, useCallback, useState } from "react";
import { firestore } from "../../../firebase";
import Post, { IPost } from "./Post";
import PostDeletePopup from "./PostDeletePopup";

interface Props extends IPost {}

const PostItem: FC<Props> = (props) => {
  const [isDeletePopupOpen, setDeletePopupStatus] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const postRef = doc(
    firestore,
    "users",
    user?.id + "",
    "posts",
    props?.id + ""
  );

  const deletePost = useCallback(async () => {
    await deleteDoc(postRef);
    setDeletePopupStatus(false);
  }, []);

  const deleteHandler = useCallback(() => {
    setDeletePopupStatus(true);
  }, []);

  return (
    <>
      <Post post={props} deleteHandler={deleteHandler} />
      <PostDeletePopup
        isOpen={isDeletePopupOpen}
        closeHandler={() => setDeletePopupStatus(false)}
        acceptHandler={deletePost}
      />
    </>
  );
};

export default PostItem;
