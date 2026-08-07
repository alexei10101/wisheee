import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DialogCustomContent, DialogCustomOverlay } from "./dialog";
import { Dialog, DialogDescription, DialogPortal, DialogTitle } from "./kit/dialog";

describe("DialogCustomContent", () => {
  it("provides a consistent accessible close action", () => {
    render(
      <Dialog open>
        <DialogPortal>
          <DialogCustomOverlay />
          <DialogCustomContent>
            <DialogTitle>Создать вишлист</DialogTitle>
            <DialogDescription>Заполните данные</DialogDescription>
          </DialogCustomContent>
        </DialogPortal>
      </Dialog>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Создать вишлист" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Закрыть" })).toBeInTheDocument();
  });
});
