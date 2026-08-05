import { useQuery } from "@tanstack/react-query";
import { friendKeys } from "./friend.queries";
import { friendsRepository } from "../api/friend.repository";

export const useMyFriends = () =>
  useQuery({
    queryKey: friendKeys.me,
    queryFn: () => friendsRepository.getList(),
  });

export const useUserFriends = (userId: string) =>
  useQuery({
    queryKey: friendKeys.user(userId),
    queryFn: () => friendsRepository.getList(userId),
  });
