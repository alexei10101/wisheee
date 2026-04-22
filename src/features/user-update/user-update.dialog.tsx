import { useCurrentUser } from "@/entities/user/model/use-current-user";
import type { User } from "@/entities/user/model/user";
import { useUpdateUser } from "@/entities/user/model/user.mutations";
import { userService } from "@/entities/user/model/user.service";
import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
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
  avatar_url: z.union([z.instanceof(File), z.null()]).optional(),
});

export function UserUpdateDialog({ open, onClose }: UserUpdateDialogProps) {
  const { data: user } = useCurrentUser();
  const updateUser = useUpdateUser();

  const updateUserForm = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      avatar_url: undefined,
    },
  });

  const avatarFile = updateUserForm.watch("avatar_url");
  const previewUrl = avatarFile instanceof File ? URL.createObjectURL(avatarFile) : avatarFile === null ? null : user?.avatar_url;

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (open && user?.id) {
      updateUserForm.reset({
        username: user.username ?? "",
      });
    }
  }, [user?.id, open]);

  const handleFormSubmit = async () => {
    if (!user?.id) return;

    const formValues = updateUserForm.getValues();
    const dirtyFields = updateUserForm.formState.dirtyFields;

    const newData = {} as Pick<User, "username"> & { avatar_url: string | null };
    if (dirtyFields.username) {
      newData.username = formValues.username.trim();
    }

    try {
      const avatarValue = formValues.avatar_url;

      if (avatarValue instanceof File) {
        const uploadResult = await userService.uploadAvatar(user.id, avatarValue);

        if (uploadResult.error) {
          throw new Error(uploadResult.error);
        }

        newData.avatar_url = `${uploadResult.result?.publicUrl}?t=${Date.now()}`;
      }

      if (avatarValue === null) {
        userService.removeAvatar(user.id);
        newData.avatar_url = null;
      }

      if (Object.keys(newData).length === 0) {
        console.log("Поля не изменены");
        onClose();
        return;
      }

      await updateUser.mutateAsync({
        id: user.id,
        updateData: newData,
      });
    } catch (error) {
      console.log("Ошибка при обновлении профиля: " + ((error as Error).message ?? "Неизвестная ошибка"));
    } finally {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}>
      <DialogContent className="p-2 sm:p-6 sm:max-w-106.25">
        <DialogTitle>Изменение информации профиля</DialogTitle>
        <DialogDescription>Измените имя и аватар профиля</DialogDescription>
        <form id="form" onSubmit={updateUserForm.handleSubmit(handleFormSubmit)} className="flex gap-4">
          <Controller
            name="avatar_url"
            control={updateUserForm.control}
            render={({ field }) => (
              <Field className="w-20">
                <Label className="cursor-pointer relative group">
                  <img src={previewUrl ?? "/default-avatar.webp"} className="w-16 h-16 rounded-full object-cover" />
                  <Input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                  />
                  <Button
                    className="absolute top-17 left-4 transition-opacity opacity-0 group-hover:opacity-100"
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => updateUserForm.setValue("avatar_url", null)}>
                    <X />
                  </Button>
                </Label>
              </Field>
            )}
          />
          <Controller
            name="username"
            control={updateUserForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="form-username">Имя пользователя</Label>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  id="form-username"
                  aria-invalid={fieldState.invalid}
                  placeholder="Имя пользователя"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError className="text-destructive text-sm" errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </form>
        <DialogFooter>
          <Button variant="outline" className="sm:w-26" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" form="form" className="sm:w-26" disabled={updateUser.isPending}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
