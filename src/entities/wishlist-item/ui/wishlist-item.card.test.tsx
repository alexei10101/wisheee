import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { WishlistItem } from "@/entities/wishlist-item/model/item";
import type { Permissions } from "@/shared/lib/permissions";
import { WishlistItemCard } from "./wishlist-item.card";

const ownerPermissions: Permissions = {
  canAdd: true,
  canUpdate: true,
  canDelete: true,
  canReserve: false,
  canViewPrivate: true,
};

const viewerPermissions: Permissions = {
  canAdd: false,
  canUpdate: false,
  canDelete: false,
  canReserve: true,
  canViewPrivate: true,
};

const item: WishlistItem = {
  id: "item-1",
  wishlistId: "wishlist-1",
  title: "Наушники",
  description: "С шумоподавлением",
  link: "https://example.com/headphones",
  price: 12500,
  image: "https://example.com/headphones.jpg",
  reserver: "user-2",
  createdAt: new Date("2026-01-01"),
};

describe("WishlistItemCard", () => {
  it("presents product information and existing viewer actions without hiding them behind swipe", () => {
    render(
      <WishlistItemCard
        wishlistItem={item}
        permissions={viewerPermissions}
        isMobile
        onOpen={vi.fn()}
        handleReserve={vi.fn()}
      />,
    );

    expect(screen.getByRole("heading", { name: "Наушники" })).toBeVisible();
    expect(screen.getByRole("img", { name: "Наушники" })).toHaveAttribute("src", item.image);
    expect(screen.getByText(/12\s*500 ₽/)).toBeVisible();
    expect(screen.getByText("Забронировано")).toBeVisible();
    expect(screen.getByRole("button", { name: "Открыть магазин" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Снять бронь" })).toBeVisible();
  });

  it("keeps owner actions accessible and calls the existing callbacks", async () => {
    const user = userEvent.setup();
    const handleUpdate = vi.fn();
    const handleDelete = vi.fn();

    render(
      <WishlistItemCard
        wishlistItem={item}
        permissions={ownerPermissions}
        isMobile={false}
        onOpen={vi.fn()}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Действия с желанием" }));
    await user.click(screen.getByRole("menuitem", { name: "Редактировать" }));
    expect(handleUpdate).toHaveBeenCalledWith(item.id);

    await user.click(screen.getByRole("button", { name: "Действия с желанием" }));
    await user.click(screen.getByRole("menuitem", { name: "Удалить" }));
    expect(handleDelete).toHaveBeenCalledWith(item.id);
  });

  it("does not invent price or store actions when values are unavailable", () => {
    render(
      <WishlistItemCard
        wishlistItem={{ ...item, price: null, link: "", image: "", reserver: null }}
        permissions={ownerPermissions}
        isMobile
        onOpen={vi.fn()}
      />,
    );

    expect(screen.queryByText(/₽/)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Открыть магазин" })).not.toBeInTheDocument();
    expect(screen.getByText("Нет изображения")).toBeVisible();
  });
});
