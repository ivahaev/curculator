import React from "react";
import { useLogin } from "../../hooks/useLogin";

const KeyPrompt: React.FC = () => {
  const { key, setKey, fetching } = useLogin();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKey(e.target.value);

  return (
    <div className="d-flex flex-column">
      <label htmlFor="api=key">
        Enter <a href="https://exchangerate-api.com/">exchangerate-api.com</a>{" "}
        API Key here:
      </label>
      <input
        id="api-key"
        className="p-t flex-grow-1"
        disabled={fetching}
        value={key}
        onChange={handleChange}
      />
    </div>
  );
};

export default KeyPrompt;
