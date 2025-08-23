import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

const useGamesStore = create((set) => ({
  isLoadingGames: true,
  games: null,
  getGames: async () => {
    try {
      const res = await axiosInstance.get("/games");
      set({ games: res.data });
    } catch (error) {
      console.log("error in getting games react", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingGames: false });
    }
  },
}));

export default useGamesStore;
