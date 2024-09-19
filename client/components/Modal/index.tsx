import { X } from "lucide-react";
import { ReactNode } from "react";
import ReactDOM from "react-dom";
import Header from "../Header";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal = ({ children, isOpen, name, onClose }: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <section className="fixed inset-0 flex size-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-0 p-4">
      <div className="dark:bg-dark-secondary w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg">
        <Header
          name={name}
          buttonComponent={
            <button
              className="bg-blue-primary flex size-7 items-center justify-center rounded-full text-white hover:bg-blue-600"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          }
          isSmallText
        />
        {children}
      </div>
    </section>,
    document.body,
  );
};

export default Modal;
