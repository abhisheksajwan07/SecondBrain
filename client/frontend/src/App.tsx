import { PlusIcon } from "./components/icons/PlusIcon";
import { ShareIcon } from "./components/icons/ShareIcon";
import { Button } from "./components/ui/button";

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 gap-4">
      <Button
        variant="primary"
        size="lg"
        startIcon={<PlusIcon size="lg" />}
        text="Click me"
        onClick={() => alert("Button clicked!")}
      />
      <Button
        variant="secondary"
        size="md"
        text="share"
        onClick={() => alert("Share button clicked!")}
      />
      <Button
        variant="secondary"
        size="sm"
        text="Share"
        startIcon={<ShareIcon/>}
        onClick={() => alert("Share button clicked!")}
      />
     
    </div>
  );
};

export default App;
