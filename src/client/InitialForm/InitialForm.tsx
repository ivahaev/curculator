import React from "react";
import GetCurrenciesButton from "./GetCurrenciesButton/GetCurrenciesButton";
import KeyPrompt from "./KeyPrompt/KeyPrompt";
import LoginError from "./LoginError/LoginError";

const InitialForm: React.FC = () => {
  return (
    <div className="d-flex justify-center align-center flex-grow-1">
      <div className="d-flex flex-column">
        <KeyPrompt />
        <LoginError />
        <div className="p-t">
          <GetCurrenciesButton />
        </div>
      </div>
    </div>
  );
};

export default InitialForm;
