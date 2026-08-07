import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { MenuCard } from "./menu-card";

describe("MenuCard", () => {
  it("uses the whole responsive surface as a labelled destination", () => {
    render(
      <MemoryRouter>
        <MenuCard title="Вишлисты" description="5 вишлистов" link="/wishlists" />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /Вишлисты/i })).toHaveAttribute("href", "/wishlists");
    expect(screen.getByRole("heading", { name: "Вишлисты" })).toBeVisible();
  });
});
