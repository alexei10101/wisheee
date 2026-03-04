import { cn } from "@/shared/lib/css";
import type { Profile } from "@/shared/types/profile";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardAction, CardContent, CardDescription, CardTitle } from "@/shared/ui/kit/card";
import { Plus, X } from "lucide-react";
import { memo } from "react";

type UserCardProps = {
  variant: "default" | "thin";
  user: Profile;
};

const UserCard = ({ variant, user }: UserCardProps) => {
  return (
    <Card
      key={user.id}
      className={cn(
        "relative flex flex-row w-full mx-auto cursor-pointer group",
        variant === "default" && "max-w-2xl py-6",
        variant === "thin" && "py-1 px-3 rounded-md",
      )}>
      <CardContent className={cn("flex flex-col gap-3 max-w-1/2", variant === "thin" && "p-0")}>
        <CardTitle className={cn(variant === "thin" && "leading-6.5")}>{user.username}</CardTitle>
        <CardDescription hidden={true}></CardDescription>
      </CardContent>
      <CardAction className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        {variant === "default" && (
          <div>
            <Button className="absolute right-2 -translate-y-1/4" variant="ghost">
              <X />
            </Button>
          </div>
        )}
        {variant === "thin" && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" className="absolute right-2 -translate-y-0.75" variant="ghost">
              <Plus />
            </Button>
          </div>
        )}
      </CardAction>
    </Card>
  );
};

export default memo(UserCard);
