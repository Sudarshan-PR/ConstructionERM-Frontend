import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      user: null,
      refresh: 0,
    };
  },
  actions: {
    incrementRefresh() {
      this.refresh++;
    },
  },
});
