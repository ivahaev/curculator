import React from "react";
import { useCodes } from "../../hooks/useCodes";
import { useRates } from "../../hooks/useRates";

const Amount: React.FC = () => {
  const { baseAmount, setAmount } = useRates();
  const { currentCode } = useCodes();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(Number(e.target.value));

  return (
    <span style={{ position: "relative" }}>
      <input
        type="number"
        value={baseAmount}
        disabled={!currentCode}
        onChange={handleChange}
      />
      <span
        style={{ position: "absolute", right: 20, top: 6, userSelect: "none" }}
      >
        {currentCode}
      </span>
    </span>
  );
};

export default Amount;
