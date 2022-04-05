import React from "react";
import { useLogin } from "../../hooks/useLogin";

const LoginError: React.FC = () => {
  const { error } = useLogin();
  if (!error) return null;

  return <div className="p-t error">{error}</div>;
};

export default LoginError;
