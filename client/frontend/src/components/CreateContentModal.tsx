import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";

type CardType = {
  id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter" | "document" | "link" | "other";
};
type NewCardInput = {
  title: string;
  link: string;
  type: "youtube" | "twitter" | "document" | "link" | "other";
};
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newCard: NewCardInput) => void;
}

export function CreateContentModal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [type, setType] = useState<
    "youtube" | "link" | "twitter" | "document" | "other"
  >("youtube");

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setLink("");
      setType("youtube");
    }
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-3xl"
        >
          <IoMdClose />
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-6 text-center">
          Add New Content
        </h2>

        {/* Modal Form */}
        <div className="flex flex-col gap-4">
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            className="px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            placeholder="Link"
            value={link}
            type="text"
            onChange={(e) => setLink(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-400"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as CardType["type"])}
            className="px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="youtube">YouTube</option>
            <option value="twitter">Twitter</option>
            <option value="document">Document</option>
            <option value="link">Link</option>
            <option value="other">Other</option>
          </select>

          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              const newCard = { title, link, type };
              onSubmit(newCard);
            }}
            text="  Add"
            className="justify-center font-medium flex"
          />
        </div>
      </div>
    </div>
  );
}
