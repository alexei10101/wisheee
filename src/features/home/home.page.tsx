import { UserAuth } from "@/app/auth-context";
import { supabase } from "@/shared/api/supabase-client";
import { Button } from "@/shared/ui/kit/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Gift, Users } from "lucide-react";
import { useEffect, useState } from "react";
import ListOfWishes from "./list-of-wishes";
import type { Wishlist } from "@/shared/types/wishlist";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { v4 as uuidv4 } from "uuid";

type FormValues = z.infer<typeof wishlistSchema>;

const wishlistSchema = z.object({
  title: z.string().min(1, "Введите название вишлиста"),
  description: z.string(),
  isPublic: z.boolean(),
});

const HomePage = () => {
  const { profile } = UserAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  useEffect(() => {
    setWishlists(profile?.wishlists ?? []);
  }, [profile]);

  const form = useForm<FormValues>({
    resolver: zodResolver(wishlistSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublic: true,
    },
  });

  const handleSubmit = form.handleSubmit(async () => {
    if (!profile) return;
    const newWishlist = createWishlist();

    try {
      console.log("123");
      const { error } = await supabase
        .from("wishlists")
        .upsert({
          ...newWishlist,
        })
        .single();
      if (error) {
        console.log(error);
        return;
      }
      setWishlists((prev) => [newWishlist, ...prev]);
    } catch (error) {
      console.log(error);
    }

    form.reset();
  });

  const createWishlist = (): Wishlist => {
    return {
      id: uuidv4(),
      user_id: profile!.id,
      title: form.getValues("title"),
      description: form.getValues("description"),
      is_public: form.getValues("isPublic"),
    };
  };

  return (
    <main className="container m-auto py-5">
      <section className="flex flex-col items-center justify-center gap-12">
        <Avatar className="max-w-1/6 min-w-32 rounded-lg overflow-hidden">
          <AvatarImage className="w-full h-full" src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
        <p>{profile?.username}</p>
        <div className="flex flex-row items-center gap-8">
          <p className="flex gap-1">
            <Gift /> Подарки
          </p>
          <p className="flex gap-1">
            <Users />
            Друзья
          </p>
        </div>
      </section>

      <section>
        {/* <h2 className="text-5xl">Созданные списки</h2> */}

        <form id="wishlist-form" onSubmit={handleSubmit}>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="wishlist-form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Название списка"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError className="text-destructive text-sm" errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <Field>
                <Input {...field} id="wishlist-form-description" placeholder="Описание списка" autoComplete="off" />
              </Field>
            )}
          />
          <Controller
            name="isPublic"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="wishlist-form-isPublic">Список видно всем</FieldLabel>
                <Input
                  id="wishlist-form-isPublic"
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </Field>
            )}
          />
          <Button type="submit">Создать список</Button>
        </form>

        <div className="flex flex-col gap-4">
          {wishlists?.map((wishlist) => (
            <ListOfWishes key={wishlist.id} {...wishlist} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
