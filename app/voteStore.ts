import { create } from "zustand";

export const useVoteStore = create((set) => ({
  votes: {},
  vote: (id, amount) =>
    set((state) => ({
      votes: {
        ...state.votes,
        [id]: (state.votes[id] || 0) + amount
      }
    }))
}));
