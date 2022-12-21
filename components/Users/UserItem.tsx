import { FC } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  name: string;
  img: string;
  email: string;
}

export const UserItem: FC<Props> = ({ name, img, email }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const clickHandler = () => {
    if (email === session?.user.email) {
      return router.push("/");
    }
  };
  return (
    <></>
  );
};
