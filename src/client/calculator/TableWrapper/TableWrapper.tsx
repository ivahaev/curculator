import React from "react";
import Amount from "../Amount/Amount";
import CodeSelector from "../CodeSelector/CodeSelector";
import Rates from "../Rates/Rates";

const TableWrapper: React.FC = () => {
  return (
    <div className="d-flex flex-column align-center flex-grow-1">
      <div className="d-flex justify-between p-t p-b width640">
        <CodeSelector />
        <Amount />
      </div>
      <div className="d-flex flex-column flex-grow-0 overflow-y-scroll width640">
        <Rates />
      </div>
    </div>
  );
};

export default TableWrapper;
