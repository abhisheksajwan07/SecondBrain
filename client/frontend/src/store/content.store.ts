import { create } from "zustand";
import { BACKEND_URL } from "../components/config/config";
import axios from "axios";

type CardType = {
  id:string;
  link: string;
  title: string;
  type: "youtube" | "twitter" | "document" | "link" | "other";
};
type ContentStore = {
  cards: CardType[];
  loading: boolean;
  error: null | string;
  fetchContent: () => Promise<void>;
  addContent: (newCard: CardType) => Promise<void>;
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
      set({ cards: res.data.content, loading: false, error: null });
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  },
  addContent: async (newCard) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/content`, newCard, {
        withCredentials: true,
      });
      set((state) => ({
        cards: [...state.cards, res.data.content],
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
      await axios.delete(`${BACKEND_URL}/api/v1/delete/${id}`, {
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
