import React from "react";
import { useCodes } from "../../hooks/useCodes";
import { useRates } from "../../hooks/useRates";

const CodeSelector: React.FC = () => {
  const { supportedCodes, setBaseCode, currentCode } = useCodes();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setBaseCode(e.target.value);

  return (
    <select className="width320" value={currentCode} onChange={handleChange}>
      {supportedCodes.map((code) => (
        <option key={code.code} value={code.code} disabled={code.disabled}>
          {code.label}
        </option>
      ))}
    </select>
  );
};

export default CodeSelector;
