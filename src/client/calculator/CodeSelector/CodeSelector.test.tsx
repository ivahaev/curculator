import React from "react";
import { create } from "react-test-renderer";
import { mockUseCodes } from "../../hooks/mockers";
import CodeSelector from "./CodeSelector";

describe("CodeSelector", () => {
  it("renders select with options from useAPI hook", () => {
    mockUseCodes({ supportedCodes: [{ code: "RUB", label: "Russian Ruble" }] });

    const renderer = create(<CodeSelector />);

    const select = renderer.root.findByType("select");
    const options = select.props.children;
    expect(options).toHaveLength(1);
    expect(options[0].props.children).toBe("Russian Ruble");
    expect(options[0].props.value).toBe("RUB");
  });

  it("calls setCurrentCode when onChange event is fired", () => {
    mockUseCodes();
    const renderer = create(<CodeSelector />);
    const select = renderer.root.findByType("select");

    select.props.onChange({ target: { value: "RUB" } });
  });
});
