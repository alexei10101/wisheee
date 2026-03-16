import { UserAuth } from "@/app/contexts/auth.context";
import type { User } from "@/entities/user/user";
import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

type FormValues = z.infer<typeof userSchema>;
const userSchema = z.object({
  username: z.string().min(1, "Введите имя"),
  // avatarLink: z.string(),
});

export function UserUpdateDialog() {
  const { user, updateUser } = UserAuth();
  const [open, setOpen] = useState<boolean>(false);

  // TODO: avatar uploading
  const updateUserForm = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      // avatarLink: "",
    },
  });

  useEffect(() => {
    if (open && user?.id) {
      updateUserForm.reset({
        username: user.username ?? "",
        // avatarLink: data.avatarLink,
      });
    }
  }, [user?.id, open]);

  const handleFormSubmit = async () => {
    if (!user?.id) return;

    const formValues = updateUserForm.getValues();
    const dirtyFields = updateUserForm.formState.dirtyFields;

    const newData = {} as Partial<User>;
    if (dirtyFields.username) {
      newData.username = formValues.username.trim();
    }

    // if (dirtyFields.avatarLink) {
    //   newData.avatarLink = formValues.avatarLink;
    // }

    if (Object.keys(newData).length === 0) {
      console.log("Поля не изменены");
      setOpen(false);
      return;
    }

    const response = await updateUser(newData);
    if (response.error) {
      console.error(response.error);
    }

    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) setOpen(false);
      }}>
      <Button variant="ghost" className="cursor-pointer w-full" onClick={() => setOpen(true)}>
        <Settings />
        Настройки
      </Button>
      <DialogContent className="sm:max-w-106.25">
        <DialogTitle>Изменение информации профиля</DialogTitle>
        <DialogDescription>Измените имя и аватар профиля</DialogDescription>
        <form id="profile-edit-form" onSubmit={updateUserForm.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <Controller
            name="username"
            control={updateUserForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="profile-form-username">Имя пользователя</Label>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  id="profile-form-username"
                  aria-invalid={fieldState.invalid}
                  placeholder="Имя пользователя"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError className="text-destructive text-sm" errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/* <Controller
            name="avatarLink"
            control={updateUserForm.control}
            render={({ field }) => (
              <Field>
                <Input {...field} id="profile-form-description" placeholder="Описание" autoComplete="off" />
              </Field>
            )}
          /> */}
        </form>
        <DialogFooter>
          <Button variant="outline" className="w-26" onClick={() => setOpen(false)}>
            Отмена
          </Button>
          <Button type="submit" form="profile-edit-form" className="w-26">
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
