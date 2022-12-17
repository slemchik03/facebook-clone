"use client";

import { collection } from "firebase/firestore";
import { Spinner } from "../../components/General/Spinner";
import { UserItem } from "../../components/Users/UserItem";
import { firestore } from "../../firebase";
import { useInfinityData } from "../../utils/hooks/useInfinityData";

export default function Page() {
  const { realtimeData: users, loading } = useInfinityData({
    collectionRef: collection(firestore, "users"),
    preloadDataCount: 30,
    orderParams: ["name", "desc"],
  });

  return (
    <>
      <p className="text-center font-bold text-3xl py-5">List of all users!</p>
      <div className="grid grid-rows-[730px] mt-10 space-y-5">
        {users.map((user, i) => {
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
    </>
  );
}
