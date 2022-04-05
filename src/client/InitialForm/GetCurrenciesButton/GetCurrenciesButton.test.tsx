import React from "react";
import { create } from "react-test-renderer";
import { mockUseRates, mockUseLogin } from "../../hooks/mockers";
import GetCurrenciesButton from "./GetCurrenciesButton";

describe("GetCurrenciesButton", () => {
  it("calls getSupportedCodes when button is clicked", () => {
    const { getSupportedCodes } = mockUseRates();
    mockUseLogin();
    const renderer = create(<GetCurrenciesButton />);

    renderer.root.findByType("button").props.onClick();

    expect(getSupportedCodes).toHaveBeenCalledTimes(1);
  });

  it("renders disabled when fetching is in progress", () => {
    mockUseRates();
    mockUseLogin({ fetching: true });

    const renderer = create(<GetCurrenciesButton />);

    const button = renderer.root.findByType("button");
    expect(button.props.disabled).toBe(true);
  });
});
