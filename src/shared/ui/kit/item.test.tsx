import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Item } from "./item";

describe("Item", () => {
  it("does not force motion on people who request reduced motion", () => {
    render(<Item data-testid="item">Карточка</Item>);

    expect(screen.getByTestId("item")).toHaveClass("motion-reduce:transition-none");
  });
});
