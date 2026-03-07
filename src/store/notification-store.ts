import type { Notification } from "@/shared/types/notification";
import { create } from "zustand";

interface NotificationState {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

  setNotifications: (notifications) => set({ notifications }),

  addNotification: (notification) =>
    set((state) => {
      if (state.notifications.some((n) => n.id === notification.id)) {
        return state;
      }

      const newNotifications = [notification, ...state.notifications].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
      console.log(newNotifications);
      return {
        notifications: newNotifications,
      };
    }),

  unreadCount: () => get().notifications.filter((n) => !n.is_read).length,
}));
