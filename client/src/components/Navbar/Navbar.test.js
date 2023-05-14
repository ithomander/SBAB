import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("The navbar", () => {
  it("should render", async () => {
    render(<Navbar />);
    expect(await screen.findByText("Top Ten Bus")).toBeVisible();
  });
});
