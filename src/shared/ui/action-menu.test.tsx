import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DropdownMenuItem } from "@/shared/ui/kit/dropdown-menu";
import { ActionMenu } from "./action-menu";

describe("ActionMenu", () => {
  it("keeps secondary actions discoverable behind an accessible trigger", async () => {
    const user = userEvent.setup();

    render(
      <ActionMenu label="Действия с желанием">
        <DropdownMenuItem>Редактировать</DropdownMenuItem>
      </ActionMenu>,
    );

    await user.click(screen.getByRole("button", { name: "Действия с желанием" }));

    expect(screen.getByRole("menuitem", { name: "Редактировать" })).toBeVisible();
  });
});
