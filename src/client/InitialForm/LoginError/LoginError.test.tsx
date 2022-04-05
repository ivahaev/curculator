import React from "react";
import { create } from "react-test-renderer";
import { mockUseLogin } from "../../hooks/mockers";
import LoginError from "./LoginError";

describe("LoginError", () => {
  it("renders nothing when no error", () => {
    mockUseLogin({ error: "" });

    const renderer = create(<LoginError />);

    expect(renderer.toJSON()).toBeNull();
  });

  it("renders error message", () => {
    const error = "some error";
    mockUseLogin({ error });

    const renderer = create(<LoginError />);

    expect(() => renderer.root.findByProps({ children: error })).not.toThrow();
  });
});
