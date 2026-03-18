import { useAuth } from "@/entities/user/model/use-auth";
import type { User } from "@/entities/user/model/user";
import { useUpdateUser } from "@/entities/user/model/user.mutations";
import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

type UserUpdateDialogProps = {
  open: boolean;
  onClose: () => void;
};

type FormValues = z.infer<typeof userSchema>;
const userSchema = z.object({
  username: z.string().min(1, "Введите имя"),
  // avatarLink: z.string(),
});

export function UserUpdateDialog({ open, onClose }: UserUpdateDialogProps) {
  const { user } = useAuth();
  const updateUser = useUpdateUser();

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

    const newData = {} as Pick<User, "username" | "avatarLink">;
    if (dirtyFields.username) {
      newData.username = formValues.username.trim();
    }

    // if (dirtyFields.avatarLink) {
    //   newData.avatarLink = formValues.avatarLink;
    // }

    if (Object.keys(newData).length === 0) {
      console.log("Поля не изменены");
      onClose();
      return;
    }

    updateUser.mutate(
      { id: user.id, updateData: newData },
      {
        onError: (error) => console.log("Ошибка при обновлении профиля: " + ((error as Error).message ?? "Неизвестная ошибка")),
      },
    );

    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}>
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
          <Button variant="outline" className="w-26" onClick={onClose}>
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
