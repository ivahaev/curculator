import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
import fetcher from "../fetcher";

describe("fetcher", () => {
  it("calls fetch with provided URL", () => {
    const url = "some/url";
    const mockFN = jest.fn().mockResolvedValue("{}");
    fetchMock.mockResponse(mockFN);

    fetcher.fetch(url);

    expect(mockFN).toHaveBeenCalledWith(expect.objectContaining({ url }));
  });

  it("returns parsed response when response code is OK", async () => {
    fetchMock.mockResponse('{"result":"success"}');

    const result = await fetcher.fetch("some/url");

    expect(result).toEqual({ result: "success" });
  });

  it.each`
    errorCode             | errorText
    ${"inactive-account"} | ${"Inactive account 🤷‍♂️"}
    ${"invalid-key"}      | ${"Invalid Key 🙃"}
    ${"quota-reached"}    | ${"Quota is reached 🤪"}
  `(
    "throws error '$errorText' when error code is '$errorCode'",
    async ({ errorCode, errorText }) => {
      fetchMock.mockResponse(`{"result":"error","error-type":"${errorCode}"}`, {
        status: 400,
      });

      await expect(async () => fetcher.fetch("some/url")).rejects.toThrow(
        new Error(errorText)
      );
    }
  );

  it("throws an response.statusText when error is not 200 and content-type is not json", async () => {
    fetchMock.mockResponse(`Just text`, {
      status: 400,
      statusText: "Some error",
    });

    await expect(async () => fetcher.fetch("some/url")).rejects.toThrow(
      new Error("Some error")
    );
  });

  it("throws an error when fetch is failed", async () => {
    const err = new Error("fetch error");
    fetchMock.mockReject(err);

    await expect(async () => fetcher.fetch("some/url")).rejects.toThrow(err);
  });
});
