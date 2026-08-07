import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("announces an empty collection and preserves its available action", () => {
    render(
      <EmptyState
        title="Пока пусто"
        description="Добавьте первое желание"
        action={<button type="button">Добавить</button>}
      />,
    );

    expect(screen.getByRole("heading", { name: "Пока пусто" })).toBeVisible();
    expect(screen.getByText("Добавьте первое желание")).toBeVisible();
    expect(screen.getByRole("button", { name: "Добавить" })).toBeVisible();
  });
});
