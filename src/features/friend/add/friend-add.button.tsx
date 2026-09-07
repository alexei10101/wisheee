import { Button } from "@/shared/ui/kit/button";
import { Check, Plus } from "lucide-react";

type AddFriendBtnProps = {
  isFriend: boolean;
  username: string;
  onAddFriend: () => Promise<void>;
};

export const AddFriendBtn = ({ isFriend, username, onAddFriend }: AddFriendBtnProps) => {
  return (
    <Button
      type="button"
      size="icon"
      variant={isFriend ? "secondary" : "ghost"}
      aria-label={isFriend ? `${username} уже в друзьях` : `Добавить ${username} в друзья`}
      onClick={onAddFriend}
      disabled={isFriend}
    >
      {isFriend ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
    </Button>
  );
};
