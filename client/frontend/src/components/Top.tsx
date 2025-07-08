import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { Button } from "./ui/button";
const Top = () => {
  return (
    <div className=" flex  justify-between px-12 py-7  mx-auto">
      <div>
        <h1 className="text-2xl"> All Notes</h1>
      </div>
      <div className="flex items-center gap-4 ">
        <Button
          variant="primary"
          size="md"
          startIcon={<ShareIcon />}
          className="flex items-center gap-5 text-2xl "
          text="Share Brain"
          onClick={() => console.log("share")}
        />
        <Button
          variant="secondary"
          size="md"
          startIcon={<PlusIcon size="md" />}
          className="flex items-center gap-5 text-2xl  "
          text="Add Content"
          onClick={() => console.log("content")}
        />
      </div>
    </div>
  );
};

export default Top;
