import type { Wishlist } from "@/shared/types/wishlist";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardAction, CardContent, CardDescription, CardTitle } from "@/shared/ui/kit/card";

const ListOfWishes = (wishlist: Wishlist) => {
  return (
    <Card key={wishlist?.id} className="flex flex-row w-full max-w-2xl mx-auto p-6">
      <CardContent className="flex flex-col gap-3 max-w-1/2">
        <CardTitle>{wishlist.title}</CardTitle>
        <CardDescription>{wishlist.description}</CardDescription>
      </CardContent>
      {/* <CardAction className="ml-auto">
        <Button variant="default" className="">...</Button>
      </CardAction> */}
    </Card>
  );
};

export default ListOfWishes;
