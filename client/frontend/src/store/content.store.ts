import { create } from "zustand";
import { BACKEND_URL } from "../components/config/config";
import axios from "axios";

type CardType = {
  id: string;
  link: string;
  title: string;
  type: "youtube" | "twitter" | "document" | "link" | "other";
};
type NewCardInput = {
  title: string;
  link: string;
  type: "youtube" | "twitter" | "document" | "link" | "other";
};
type ContentStore = {
  cards: CardType[];
  loading: boolean;
  error: null | string;
  fetchContent: () => Promise<void>;
  addContent: (newCard: NewCardInput) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
};

export const useContentStore = create<ContentStore>((set) => ({
  cards: [],
  loading: true,
  error: null,
  fetchContent: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/getContent`, {
        withCredentials: true,
      });
      const mappedContent = res.data.content.map((item: any) => ({
        ...item,
        id: item._id,
      }));
      set({ cards: mappedContent, loading: false, error: null });
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  },
  addContent: async (newCard:{title: string; link: string; type: CardType["type"] }) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/content`, newCard, {
        withCredentials: true,
      });
      const mapped= ({
        ...res.data.content,
        id:res.data.content._id
      })
      set((state) => ({
        cards: [...state.cards, mapped],
        loading: false,
        error: null,
      }));
    } catch (err) {
      console.log("error adding content", err);
      set({ loading: false, error: "failed to load content" });
    }
  },
  deleteContent: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        cards: state.cards.filter((card) => card.id !== id),
        loading: false,
        error: null,
      }));
    } catch (err) {
      console.error("Error deleting content:", err);
      set({ loading: false, error: "Failed to delete content" });
    }
  },
}));
