type ResponseError = {
  result: "error";
  "error-type": "invalid-key" | "inactive-account" | "quota-reached";
};

const ErrorCodeText: Record<ResponseError["error-type"], string> = {
  "inactive-account": "Inactive account 🤷‍♂️",
  "invalid-key": "Invalid Key 🙃",
  "quota-reached": "Quota is reached 🤪",
};

export default {
  fetch: async <T>(url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      let errorJson: ResponseError;
      try {
        errorJson = await response.json();
      } catch (err) {
        throw new Error(response.statusText);
      }

      throw new Error(ErrorCodeText[errorJson["error-type"]]);
    }

    return (await response.json()) as T;
  },
};
