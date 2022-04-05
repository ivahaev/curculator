import React from "react";
import { create } from "react-test-renderer";
import { mockUseCodes } from "../hooks/mockers";
import InitialForm from "../InitialForm/InitialForm";
import Calculator from "./Calculator";
import TableWrapper from "./TableWrapper/TableWrapper";

jest.mock("../InitialForm/InitialForm");
jest.mock("./TableWrapper/TableWrapper");

describe("Calculator", () => {
  describe("when no supported codes", () => {
    const supportedCodes = [{ code: "", label: "Select Code" }];

    it("renders InitialForm", () => {
      mockUseCodes({ supportedCodes });

      const renderer = create(<Calculator />);

      expect(() => renderer.root.findByType(InitialForm)).not.toThrow();
    });

    it("does not render TableWrapper", () => {
      mockUseCodes({ supportedCodes });

      const renderer = create(<Calculator />);

      expect(() => renderer.root.findByType(TableWrapper)).toThrow();
    });
  });

  describe("when have supported codes", () => {
    const supportedCodes = [
      { code: "", label: "" },
      { code: "", label: "Select Code" },
    ];

    it("renders TableWrapper", () => {
      mockUseCodes({
        supportedCodes,
      });

      const renderer = create(<Calculator />);

      expect(() => renderer.root.findByType(TableWrapper)).not.toThrow();
    });

    it("does not renders InitialForm", () => {
      mockUseCodes({
        supportedCodes,
      });

      const renderer = create(<Calculator />);

      expect(() => renderer.root.findByType(InitialForm)).toThrow();
    });
  });
});
