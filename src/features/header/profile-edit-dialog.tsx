import type { Profile } from "@/shared/types/profile";
import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

type ProfileEditDialogProps = {
  open: boolean;
  data: Profile;
  resolver: {
    resolve: ({}: Partial<Profile>) => void;
    reject: () => void;
  } | null;
};

type FormValues = z.infer<typeof profileSchema>;
const profileSchema = z.object({
  username: z.string().min(1, "Введите имя"),
  // avatarLink: z.string(),
});

export function ProfileEditDialog({ open, data, resolver }: ProfileEditDialogProps) {
  // TODO: avatar uploading
  const editProfileForm = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      // avatarLink: "",
    },
  });

  useEffect(() => {
    if (open && data) {
      editProfileForm.reset({
        username: data.username,
        // avatarLink: data.avatarLink,
      });
    }
  }, [data, open]);

  const handleFormSubmit = () => {
    const formValues = editProfileForm.getValues();
    const dirtyFields = editProfileForm.formState.dirtyFields;

    const newData = {} as Partial<Profile>;
    if (dirtyFields.username) {
      newData.username = formValues.username.trim();
    }

    // if (dirtyFields.avatarLink) {
    //   newData.avatarLink = formValues.avatarLink;
    // }

    resolver?.resolve(newData);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          resolver?.reject();
        }
      }}>
      <DialogContent className="sm:max-w-106.25">
        <DialogTitle>Изменение информации профиля</DialogTitle>
        <DialogDescription>Измените имя и аватар профиля</DialogDescription>
        <form id="profile-edit-form" onSubmit={editProfileForm.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <Controller
            name="username"
            control={editProfileForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="profile-form-username">Имя пользователя</Label>
                <Input
                  {...field}
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
            control={editProfileForm.control}
            render={({ field }) => (
              <Field>
                <Input {...field} id="profile-form-description" placeholder="Описание" autoComplete="off" />
              </Field>
            )}
          /> */}
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-26" onClick={() => resolver?.reject()}>
              Отмена
            </Button>
          </DialogClose>
          <Button type="submit" form="profile-edit-form" className="w-26">
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
