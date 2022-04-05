import React from "react";
import { create } from "react-test-renderer";
import { mockUseLogin } from "../../hooks/mockers";
import KeyPrompt from "./KeyPrompt";

describe("KeyPrompt", () => {
  it("renders input with value", () => {
    const { key } = mockUseLogin();
    const renderer = create(<KeyPrompt />);

    const input = renderer.root.findByType("input");
    expect(input.props.value).toBe(key);
  });

  it("renders disabled input when fetching is in progress", () => {
    mockUseLogin({ fetching: true });
    const renderer = create(<KeyPrompt />);

    const input = renderer.root.findByType("input");
    expect(input.props.disabled).toBe(true);
  });

  it("calls setKey when onChange event is fired", () => {
    const { setKey } = mockUseLogin();
    const renderer = create(<KeyPrompt />);
    const input = renderer.root.findByType("input");

    input.props.onChange({ target: { value: "new value" } });

    expect(setKey).toHaveBeenCalledWith("new value");
  });
});
