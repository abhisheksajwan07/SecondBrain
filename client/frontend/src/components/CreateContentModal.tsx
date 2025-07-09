import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";

export function CreateContentModal({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="w-screen h-screen bg-slate-950 fixed top-0 left-0 bg-opacity-60 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
              {/* Close Icon */}
              <div className="flex justify-end">
                <IoMdClose onClick={onClose} />
              </div>

              {/* Input Fields */}
              <div>
                <Input placeholder={"Title"} />
                <Input placeholder={"Link"} />
              </div>

              {/* Submit Button */}
              <Button variant="primary" size="md" text="Submit" />
            </span>
          </div>
        </div>
      )}
    </>
  );
}
type InputProps = {
  onChange?: () => void;
  placeholder: string;
};
function Input({ onChange, placeholder }: InputProps) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={"text"}
        className="px-4 py-2 border rounded"
        onChange={onChange}
      />
    </div>
  );
}
