import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

const useGamesStore = create((set) => ({
  isLoadingGames: true,
  isAddingGame: false,
  isEditingGame: false,
  isDeletingGame: false,
  gameToEdit: null,
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
  getGameToEdit: async (_id) => {
    try {
      const res = await axiosInstance.get(`/games/${_id}`);
      set({ gameToEdit: res.data });
    } catch (error) {
      console.log("error in getting game to edit react", error);
      toast.error(error.response.data.message);
    }
  },
  editGame: async (_id, gameData, navigate) => {
    set({ isEditingGame: true });
    try {
      const res = await axiosInstance.put(`/games/${_id}`, gameData);
      if (res.data) {
        toast.success("Game edited successfully");
        navigate('/admin-panel');
      }
    } catch (error) {
      console.log("error in editing game react", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isEditingGame: false });
    }
  }
}));

export default useGamesStore;
