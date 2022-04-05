import React from "react";
import { useCodes } from "../hooks/useCodes";
import InitialForm from "../InitialForm/InitialForm";
import TableWrapper from "./TableWrapper/TableWrapper";

const Calculator: React.FC = () => {
  const { supportedCodes } = useCodes();

  return (
    <>{supportedCodes.length === 1 ? <InitialForm /> : <TableWrapper />}</>
  );
};

export default Calculator;
