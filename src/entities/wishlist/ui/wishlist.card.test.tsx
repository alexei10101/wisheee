import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Wishlist } from "@/entities/wishlist/model/wishlist";
import type { Permissions } from "@/shared/lib/permissions";
import { TooltipProvider } from "@/shared/ui/kit/tooltip";
import { WishlistCard } from "./wishlist.card";

const ownerPermissions: Permissions = {
  canAdd: true,
  canUpdate: true,
  canDelete: true,
  canReserve: false,
  canViewPrivate: true,
};

const wishlist: Wishlist = {
  id: "wishlist-1",
  ownerId: "owner-1",
  title: "День рождения",
  description: "То, чему я точно буду рада",
  isPublic: false,
  createdAt: new Date("2026-01-01"),
};

describe("WishlistCard", () => {
  it("makes privacy and the existing open action explicit", async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();

    render(
      <TooltipProvider>
        <WishlistCard
          wishlist={wishlist}
          onOpen={onOpen}
          onUpdate={vi.fn()}
          onDelete={vi.fn()}
          permissions={ownerPermissions}
          isOwner={true}
        />
      </TooltipProvider>,
    );

    expect(screen.getByRole("heading", { name: "День рождения" })).toBeVisible();
    expect(screen.getByText("Приватный")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Открыть вишлист День рождения" }));
    expect(onOpen).toHaveBeenCalledWith(wishlist.id);
  });

  it("keeps owner actions in an accessible destructive-aware menu", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    const onDelete = vi.fn();

    render(
      <TooltipProvider>
        <WishlistCard
          wishlist={wishlist}
          onOpen={vi.fn()}
          onUpdate={onUpdate}
          onDelete={onDelete}
          permissions={ownerPermissions}
          isOwner={true}
        />
      </TooltipProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Действия с вишлистом" }));
    await user.click(screen.getByRole("menuitem", { name: "Редактировать" }));
    expect(onUpdate).toHaveBeenCalledOnce();

    await user.click(screen.getByRole("button", { name: "Действия с вишлистом" }));
    await user.click(screen.getByRole("menuitem", { name: "Удалить" }));
    expect(onDelete).toHaveBeenCalledOnce();
  });
});
