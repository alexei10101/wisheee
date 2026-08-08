import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateUser } from "@/entities/user/model/user.mutations";
import { useRequiredUser } from "@/entities/user/model/user.hooks";
import { UpdateUserSchema, type UpdateUserType } from "@/entities/user/model/user.validation";

type UserUpdateDialogProps = {
  open: boolean;
  isMobile: boolean;
  onClose: () => void;
};

export function UserUpdateDialog({ open, isMobile, onClose }: UserUpdateDialogProps) {
  const user = useRequiredUser();
  const updateUser = useUpdateUser();

  const updateUserForm = useForm<UpdateUserType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      username: "",
      avatar: undefined,
    },
  });

  const avatarFile = updateUserForm.watch("avatar");
  const previewUrl =
    avatarFile instanceof File
      ? URL.createObjectURL(avatarFile)
      : avatarFile === null
        ? null
        : user?.avatar;

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (open && user.id) {
      updateUserForm.reset({
        username: user.username,
      });
    }
  }, [user, open, updateUserForm]);

  const handleFormSubmit = async () => {
    const formValues = updateUserForm.getValues();
    const dirtyFields = updateUserForm.formState.dirtyFields;

    const updated = {} as UpdateUserType;
    if (dirtyFields.username) updated.username = formValues?.username?.trim();

    try {
      // const avatarValue = formValues.avatar;
      // if (avatarValue instanceof File) {
      //   const uploadResult = await userService.uploadAvatar(user.id, avatarValue);
      //   if (uploadResult.error) {
      //     throw new Error(uploadResult.error);
      //   }
      //   updated.avatar = `${uploadResult.result?.publicUrl}?t=${Date.now()}`;
      // }
      // if (avatarValue === null) {
      //   userService.removeAvatar(user.id);
      //   updated.avatar = null;
      // }
      // if (Object.keys(updated).length === 0) {
      //   console.log("Поля не изменены");
      //   onClose();
      //   return;
      // }
      await updateUser.mutateAsync(updated);
    } catch (error) {
      console.log(
        "Ошибка при обновлении профиля: " + ((error as Error).message ?? "Неизвестная ошибка"),
      );
    } finally {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="p-2 sm:max-w-106.25 sm:p-6">
        <DialogTitle>Изменение информации профиля</DialogTitle>
        <DialogDescription>Измените имя и аватар профиля</DialogDescription>
        <form
          id="form"
          onSubmit={updateUserForm.handleSubmit(handleFormSubmit)}
          className="flex gap-4"
        >
          <Controller
            name="avatar"
            control={updateUserForm.control}
            render={({ field }) => (
              <Field className="w-20">
                <Label className="group relative cursor-pointer">
                  <img
                    src={previewUrl ?? "/default-avatar.webp"}
                    alt="Предпросмотр аватара"
                    className="size-16 rounded-full object-cover"
                  />
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
                    className={cn(
                      "absolute",
                      isMobile
                        ? "-top-1 -right-5 opacity-100"
                        : "top-17 left-4 opacity-0 transition-opacity group-hover:opacity-100",
                    )}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => updateUserForm.setValue("avatar", null)}
                  >
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
                {fieldState.invalid && (
                  <FieldError className="text-sm text-destructive" errors={[fieldState.error]} />
                )}
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
