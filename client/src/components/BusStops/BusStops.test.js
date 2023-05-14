import React from "react";
import { render, screen } from "@testing-library/react";
import BusStops from "./BusStops";

const mockStops = [
  "Norrtälje busstation",
  "Älmsta busstation",
  "Harnäset",
  "Sjöängen",
  "Skeppsmyra affär",
  "Skeppsmyra by",
  "Skeppsmyra östra",
];

describe("The bus stops", () => {
  it("should show bus stop names", async () => {
    render(<BusStops stopsList={mockStops} />);
    expect(await screen.findByText("Norrtälje busstation")).toBeVisible();
  });
});
