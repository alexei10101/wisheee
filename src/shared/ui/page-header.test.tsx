import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageHeader } from "./page-header";

describe("PageHeader", () => {
  it("keeps navigation, title, context and action in one accessible hierarchy", () => {
    render(
      <PageHeader
        left={<button type="button">Назад</button>}
        user={<span>Анна</span>}
        title="Мои вишлисты"
        right={<button type="button">Добавить</button>}
      />,
    );

    expect(screen.getAllByRole("button", { name: "Назад" })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Мои вишлисты" })).toBeVisible();
    expect(screen.getByText("Анна")).toBeVisible();
    expect(screen.getAllByRole("button", { name: "Добавить" })).toHaveLength(1);
  });
});
