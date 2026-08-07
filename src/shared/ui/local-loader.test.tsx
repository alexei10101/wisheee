import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LocalLoader } from "./local-loader";

describe("LocalLoader", () => {
  it("announces loading without adding visible noise", () => {
    render(<LocalLoader />);

    expect(screen.getByRole("status", { name: "Загрузка" })).toBeVisible();
  });
});
