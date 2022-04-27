import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import ListaDeUsuarios from "./ListaDeUsuarios";

import axios from "axios";

const dataApi = [
  {
    id: 1001,
    name: "Eduardo Santos",
    img: "https://randomuser.me/api/portraits/men/9.jpg",
    username: "@eduardo.santos",
  },
  {
    id: 1002,
    name: "Marina Coelho",
    img: "https://randomuser.me/api/portraits/women/37.jpg",
    username: "@marina.coelho",
  },
  {
    id: 1003,
    name: "Márcia da Silva",
    img: "https://randomuser.me/api/portraits/women/57.jpg",
    username: "@marcia.silva",
  },
];

jest.mock("axios", () => ({
  get: jest.fn((..._) => {
    return new Promise((resolve) => {
      resolve(true);
    });
  }),
}));

describe("<ListaDeUsuarios />", () => {
  it("should render", async () => {
    axios.get.mockResolvedValue({ data: dataApi });
    const container = render(<ListaDeUsuarios />);
    expect(container).toBeTruthy();
  });

  it("should render card ", async () => {
    await waitFor(() => {
      render(<ListaDeUsuarios />);
    });
    await waitFor(() =>
      expect(screen.getByText(/eduardo santos/i)).toBeTruthy()
    );
  });

  it("should click in PAGAR and open a moldal ", async () => {
    await waitFor(() => {
      render(<ListaDeUsuarios />);
    });

    await waitFor(() => {
      userEvent.click(screen.getAllByTestId("btn-paymente")[0]);
    });

    await waitFor(() =>
      expect(screen.getAllByTestId("header-modal-text")[0]).toBeVisible()
    );
  });

  it("should complete payment ", async () => {
    await waitFor(() => {
      render(<ListaDeUsuarios />);
    });

    await waitFor(() => {
      userEvent.click(screen.getAllByTestId("btn-paymente")[0]);
    });

    const input = screen.getAllByTestId("input-payment")[0];

    userEvent.type(input, "12");

    fireEvent.keyPress(screen.getAllByTestId("btn-pagar")[0]);

    await waitFor(() => {
      expect(
        screen.getByText(/o pagamento foi concluído com !/i)
      ).toBeInTheDocument();
    });
  });

  it("should close modal", async () => {
    await waitFor(() => {
      render(<ListaDeUsuarios />);
    });

    await waitFor(() => {
      userEvent.click(screen.getAllByTestId("btn-paymente")[0]);
    });

    await waitFor(() => {
      userEvent.click(screen.getByTestId("btn-close"));
    });

    const headerModal = screen.queryByTestId("header-modal-text");
    expect(headerModal).not.toBeInTheDocument();
  });
});
