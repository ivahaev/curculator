import { makeApp } from ".";
import { mockAPI } from "./api/mockers";

const waitForData = (
  app: ReturnType<typeof makeApp>,
  selector: () => boolean
) => {
  let resolve: () => void;
  const promise = new Promise<void>((res) => (resolve = res));
  let started = false;
  app.subscribe(() => {
    if (selector() === true) started = true;
    if (started && selector() === false) resolve();
  });
  return promise;
};

it("updates api key", async () => {
  const key = "my api key";
  const app = makeApp(mockAPI());

  app.setAPIKey(key);

  expect(app.getAPIKey()).toBe(key);
});

describe("when api key exists", () => {
  const prepareApp = () => {
    const apiResult = {
      year: 2022,
      month: 4,
      day: 10,
      base: "USD",
      rates: [
        { code: "AED", rate: 3.67 },
        { code: "AFN", rate: 88.5 },
      ],
    };
    const codes = [
      { code: "AED", label: "UAE Dirham" },
      { code: "AFN", label: "Afghan Afghani" },
    ];
    const apiMock = mockAPI({
      getLatestRates: jest.fn().mockResolvedValue(apiResult),
      getSupportedCodes: jest.fn().mockResolvedValue(codes),
    });
    const app = makeApp(apiMock);
    const apiKey = "my api key";

    app.setAPIKey(apiKey);

    return { apiMock, app, apiKey, apiResult, codes };
  };

  it("loads supported codes via api", async () => {
    const { app, apiMock, apiKey } = prepareApp();
    const expected = { AED: "UAE Dirham", AFN: "Afghan Afghani" };
    const expectant = waitForData(app, () => app.getSupportedCodes().fetching);

    app.loadSupportedCodes();
    await expectant;

    expect(apiMock.getSupportedCodes).toHaveBeenCalledWith(apiKey);
    expect(app.getSupportedCodes().data).toEqual(expected);
  });

  describe("when current code is selected", () => {
    it("updates current code", async () => {
      const { app } = prepareApp();
      const code = "USD";

      app.setCurrentCode(code);

      expect(app.getRates().currentCode).toBe(code);
    });

    it("loads latest rates via api", async () => {
      const { app, apiResult, apiMock, apiKey } = prepareApp();
      const code = "USD";
      const expectant = waitForData(app, () => app.getRates().fetching);

      app.setCurrentCode(code);
      await expectant;

      expect(apiMock.getLatestRates).toHaveBeenCalledWith(apiKey, code);
      expect(app.getRates().data).toEqual(apiResult);
    });

    it("recalculates rates when new rates is loaded", async () => {
      const { app, apiResult, apiMock, apiKey } = prepareApp();
      const code = "USD";
      const expectant = waitForData(app, () => app.getRates().fetching);

      app.setCurrentCode(code);
      await expectant;

      expect(app.getCalculatedRates()).toEqual(apiResult.rates);
    });
  });
});

describe("when rates is loaded", () => {
  const prepareApp = async () => {
    const apiResult = {
      year: 2022,
      month: 4,
      day: 10,
      base: "USD",
      rates: [
        { code: "AED", rate: 3.67 },
        { code: "AFN", rate: 88.5 },
      ],
    };
    const apiMock = mockAPI({
      getLatestRates: jest.fn().mockResolvedValue(apiResult),
    });
    const app = makeApp(apiMock);
    const code = "USD";
    const expectant = waitForData(app, () => app.getRates().fetching);

    app.setCurrentCode(code);
    await expectant;
    return { app };
  };

  it("calculates new rates for saved amount of base code", async () => {
    const { app } = await prepareApp();
    const amount = 10;

    app.setBaseAmount(amount);

    expect(app.getRates().baseAmount).toBe(amount);
    expect(app.getCalculatedRates()).toEqual([
      { code: "AED", rate: 36.7 },
      { code: "AFN", rate: 885 },
    ]);
  });
});
