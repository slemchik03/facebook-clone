"use client"

import { Dialog } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import SelectedPostPopupContent from "./SelectedPostPopupContent";

const SelectedPostPopup: FC = ({}) => {
  const [postId, setPostId] = useState("");
  const [isOpen, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { data: session } = useSession();

  const closeHandler = () => {
    setOpen(false);
    router?.push(pathname);
  };

  useEffect(() => {
    const post = params.get("post");

    if (post) {
      setOpen(true);
      setPostId(post as string);
    }
  }, [params]);

  return (
    <>
      <Dialog open={isOpen} onClose={closeHandler}>
        <div className="popup-container items-start">
          <Dialog.Panel>
            <SelectedPostPopupContent
              id={postId}
              closeHandler={closeHandler}
              authorImg={session?.user.image}
              name={session?.user.name}
              userId={session?.user.id}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default SelectedPostPopup;
