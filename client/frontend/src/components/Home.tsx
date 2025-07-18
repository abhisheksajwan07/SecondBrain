import { useEffect, useState } from "react";
import { Card } from "./Card";
import { CreateContentModal } from "./CreateContentModal";

import SideNav from "./SideNav";
import Top from "./Top";

import { useContentStore } from "../store/content.store";
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
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const cards = useContentStore((state) => state.cards);
  const fetchContent = useContentStore((state) => state.fetchContent);
  const addContent = useContentStore((state) => state.addContent);
  const deleteContent = useContentStore((state) => state.deleteContent);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);
  const handleContent = async (newCard: NewCardInput) => {
    await addContent(newCard);
    fetchContent();
    setShowModal(false);
  };
  const handleDelete = async (id: string) => {
    await deleteContent(id);
    fetchContent();
  };
  return (
    <div className="flex overflow-hidden h-screen">
      <SideNav />
      <div className="w-[85%] h-full overflow-x-hidden overflow-auto ">
        <Top onAddContentClick={() => setShowModal(true)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              link={card.link}
              type={card.type}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <CreateContentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          // onSubmit={(newCard) => {
          //   setCards([...cards, newCard]);
          //   setShowModal(false);
          // }}
          onSubmit={handleContent}
        />
      </div>
    </div>
  );
};

export default Home;

// const [cards, setCards] = useState<CardType[]>([
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
// ]);

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

// const [cards, setCards] = useState<CardType[]>([]);
//content fetch
// const fetchContent = async () => {
//   try {
//     const res = await axios.get(BACKEND_URL + "/api/v1/getContent", {
//       withCredentials: true,
//     });
//     setCards(res.data.content);
//   } catch (err) {
//     console.error("error", err);
//   }
// };

// const handleContent = async (newCard: CardType): Promise<void> => {
//   try {
//     const res = await axios.post(BACKEND_URL + "/api/v1/content", newCard, {
//       withCredentials: true,
//     });

//     setCards((prev) => [...prev, res.data.content]);
//     fetchContent();
//     setShowModal(false);
//   } catch (err) {
//     console.error("error", err);
//   }
// };
