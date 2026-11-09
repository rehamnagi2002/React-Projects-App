// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./AuthProvider";
import { withAuth } from "./hocs/withAuth";

afterEach(cleanup);

describe("routing", () => {
  it("renders the Not found page for an unknown URL", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/does-not-exist"]}>
          <App />
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Page Not Found" }),
    ).toBeTruthy();
  });
});

describe("withAuth", () => {
  it("sends a signed-out user to /login", () => {
    function Secret() {
      return <p>Secret page</p>;
    }
    const ProtectedSecret = withAuth(Secret);

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/secret"]}>
          <Routes>
            <Route path="/secret" element={<ProtectedSecret />} />
            <Route path="/login" element={<p>Login page</p>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByText("Login page")).toBeTruthy();
    expect(screen.queryByText("Secret page")).toBeNull();
  });
});
