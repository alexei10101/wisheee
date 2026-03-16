import type { AppNotification } from "@/entities/notification/model/notification";
import { create } from "zustand";

interface NotificationState {
  notifications: AppNotification[];
  setNotifications: (notifications: AppNotification[]) => void;
  addNotification: (notification: AppNotification) => void;
  markAllAsRead: () => void;
  updateNotification: (notification: AppNotification) => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

  setNotifications: (notifications) => set({ notifications }),

  addNotification: (notification) =>
    set((state) => {
      if (state.notifications.some((n) => n.id === notification.id)) return state;

      const newNotifications = [notification, ...state.notifications].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
      return {
        notifications: newNotifications,
      };
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({
        ...n,
        is_read: true,
      })),
    })),
  updateNotification: (notification) =>
    set((state) => {
      const filtered = state.notifications.filter((n) => n.id !== notification.id);
      const newNotifications = [notification, ...filtered].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
      return { notifications: newNotifications };
    }),
  unreadCount: () => get().notifications.filter((n) => !n.is_read).length,
}));
