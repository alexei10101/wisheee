import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UserCard } from "./user.card";

describe("UserCard", () => {
  it("exposes profile and friendship actions without hover", async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    const onAddFriend = vi.fn().mockResolvedValue(undefined);

    render(
      <UserCard id="user-1" username="Анна" avatar="" onOpen={onOpen} onAddFriend={onAddFriend} />,
    );

    await user.click(screen.getByRole("button", { name: "Открыть профиль Анна" }));
    expect(onOpen).toHaveBeenCalledWith("user-1");
    await user.click(screen.getByRole("button", { name: "Добавить Анна в друзья" }));
    expect(onAddFriend).toHaveBeenCalledWith("user-1", "Анна", "");
  });
});
