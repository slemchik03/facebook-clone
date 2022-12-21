"use client";

import { collection } from "firebase/firestore";
import { FC } from "react";
import { firestore } from "../../firebase";
import { useInfinityData } from "../../utils/hooks/useInfinityData";
import { Spinner } from "../General/Spinner";
import { UserItem } from "./UserItem";

interface Props {
  preloadedUsers?: { name: string; img: string; email: string }[];
}

const Users: FC<Props> = ({ preloadedUsers }) => {
  const { realtimeData: users, loading } = useInfinityData({
    collectionRef: collection(firestore, "users"),
    preloadDataCount: 30,
    orderParams: ["name", "desc"],
  });

  return (
    <div>
      {!users.length
        ? preloadedUsers?.map((user, i) => {
            return <UserItem key={i} {...user} />;
          })
        : users.map((user, i) => {
            const userItem = {
              name: user.data().name,
              img: user.data().image,
              email: user.data().email,
            };
            return <UserItem key={i} {...userItem} />;
          })}
      {loading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Users;
