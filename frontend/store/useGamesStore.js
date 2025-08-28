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
  addGame: async (gameData, navigate) => {
    set({isAddingGame: true});
    try {
      console.log('Sending game data to backend:', gameData);
      const res = await axiosInstance.post("/games", gameData);
      if (res.data) {
        console.log('Response from backend:', res.data);
        toast.success("Game added successfully!");
        // Update local state by adding the new game
        set((state) => ({
          games: state.games ? [...state.games, res.data] : [res.data]
        }));
        navigate("/admin-panel");
      }
    } catch (error) {
      console.log("Error in adding game react");
      toast.error(error.response.data.message);
    } finally {
      set({isAddingGame: false});
    }
  },
  editGame: async (_id, gameData, navigate) => {
    set({ isEditingGame: true });
    try {
      const res = await axiosInstance.put(`/games/${_id}`, gameData);
      if (res.data) {
        toast.success("Game edited successfully");
        // Update local state by updating the edited game
        set((state) => ({
          games: state.games.map(game => 
            game._id === _id ? { ...game, ...gameData } : game
          ),
          gameToEdit: null
        }));
        navigate('/admin-panel');
      }
    } catch (error) {
      console.log("error in editing game react", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isEditingGame: false });
    }
  },
  deleteGame: async (_id) => {
    set({isDeletingGame: true});
    try {
      const res = await axiosInstance.delete(`/games/${_id}`);
      if (res.data) {
        toast.success(`${res.data.name} deleted successfully!`);
        // Update local state by removing the deleted game
        set((state) => ({
          games: state.games ? state.games.filter(game => game._id !== _id) : []
        }));
      }
    } catch (error) {
      console.log("error in deleting game react", error);
      toast.error(error.response.data.message);
    } finally {
      set({isDeletingGame: false});
    }
  }
}));

export default useGamesStore;
