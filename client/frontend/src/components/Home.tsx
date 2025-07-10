import { useState } from "react";
import { Card } from "./Card";
import { CreateContentModal } from "./CreateContentModal";

import SideNav from "./SideNav";
import Top from "./Top";

// const cards: { title: string; link: string; type: "youtube" | "twitter" }[] = [
//   {
//     title: "React Tutorial",
//     link: "https://www.youtube.com/watch?v=dGcsHMXbSOA",
//     type: "youtube",
//   },
//   {
//     title: "Twitter Post",
//     link: "https://x.com/gemsofbabus_/status/1942437694526882051",
//     type: "twitter",
//   },
//   {
//     title: "Another React Video",
//     link: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
//     type: "youtube",
//   },
// ];
type CardType = {
  title: string;
  link: string;
  type: string; 
};
const Home = () => {
  const [cards, setCards] = useState<CardType[]>([
    {
      title: "React Tutorial",
      link: "https://www.youtube.com/watch?v=dGcsHMXbSOA",
      type: "youtube",
    },
    {
      title: "Twitter Post",
      link: "https://x.com/gemsofbabus_/status/1942437694526882051",
      type: "twitter",
    },
    {
      title: "Another React Video",
      link: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
      type: "youtube",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex overflow-hidden h-screen">
      <SideNav />
      <div className="w-[85%] h-full overflow-x-hidden overflow-auto ">
        <Top onAddContentClick={() => setShowModal(true)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              link={card.link}
              type={card.type}
            />
          ))}
        </div>
        <CreateContentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={(newCard) => {
            setCards([...cards, newCard]);
            setShowModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
