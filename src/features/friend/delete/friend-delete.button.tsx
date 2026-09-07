import { Button } from "@/shared/ui/kit/button";
import { X } from "lucide-react";

type AddFriendBtnProps = {
  username: string;
  onDeleteFriend: () => Promise<void>;
};

export const DeleteFriendBtn = ({ username, onDeleteFriend }: AddFriendBtnProps) => {
  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label={`Удалить ${username} из друзей`}
      onClick={onDeleteFriend}
    >
      <X aria-hidden="true" />
    </Button>
  );
};
