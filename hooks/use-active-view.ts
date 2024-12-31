
import { create } from "zustand";

export type activeType = 
  "transfers" |
  "contacts" |
  "shared-with-me"

// you can extend this type if you have more modal

// export type ModalType = "..." | "...." | "...."

type data = {

};

type activeStore = {
  type: activeType | null;
  data: data;
  isOpen: boolean;
  onOpen: (type: activeType, data?: data) => void;
  onClose: () => void;
};

export const useActiveView = create<activeStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onClose: () => set({ type: null, isOpen: false }),
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
}));
