import { Dialog } from "@headlessui/react";
import { FC } from "react";

interface Props {
  isOpen: boolean;
  closeHandler: () => void;
  acceptHandler: () => void;
}

const PostDeletePopup: FC<Props> = ({
  isOpen,
  closeHandler,
  acceptHandler,
}) => {
  return (
    <Dialog open={isOpen} onClose={closeHandler}>
      <div className="popup-container">
        <Dialog.Panel className="grid cursor-pointer items-center p-5 rounded-xl bg-white mt-5 shadow-md">
          <Dialog.Title>
            Are you sure, that you want delete the post?
          </Dialog.Title>
            <div className="grid grid-flow-col items-center pt-5 gap-4 justify-end">
              <button className="popup-button" onClick={acceptHandler}>
                Yes.
              </button>
              <button className="popup-button" onClick={closeHandler}>
                No.
              </button>
            </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PostDeletePopup;
