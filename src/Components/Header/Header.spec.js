import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { Header } from "./index";

describe("<Header/>", () => {
  it("should render", () => {
    const container = render(<Header />);
    expect(container).toBeTruthy();
  });

  it("should render img", () => {
    render(<Header />);
    expect(
      screen.getByRole("img", {
        name: /logo/i,
      })
    ).toBeInTheDocument();
  });
});
