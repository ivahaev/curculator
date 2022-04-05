import React from "react";
import { useRates } from "../../hooks/useRates";
import { useLogin } from "../../hooks/useLogin";

const GetCurrenciesButton: React.FC = () => {
  const { getSupportedCodes } = useRates();
  const { fetching } = useLogin();
  const handleClick = () => {
    getSupportedCodes();
  };

  return (
    <button onClick={handleClick} disabled={fetching}>
      Let's Go!
    </button>
  );
};

export default GetCurrenciesButton;
