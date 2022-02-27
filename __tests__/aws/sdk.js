const getBalance = require("../../getBalance");
const SDK = require("aws-sdk");

jest.mock("aws-sdk", () => {
  const mPromise = {
    promise: jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({ Payload: '{"balance": 99999.99}' });
      });
    }),
  };
  const mLambda = {
    invoke: jest.fn(() => mPromise),
  };
  return { Lambda: jest.fn(() => mLambda) };
});

describe("getBalance", () => {
  beforeEach(() => {});

  it("should call Lambda and invoke", async () => {
    // arrange
    const lambda_name = "MyLambaInvocation";
    const invocationType = "RequestResponse";
    const logType = "None";
    const session = { session: "session123" };
    const apiVersion = "2015-03-31";

    const desiredResult = { balance: 99999.99 };

    // act
    const LambdaMock = SDK.Lambda;
    const mLambda = new LambdaMock();

    mLambda.invoke.mockImplementationOnce((params) => {
      return {
        promise: jest.fn(() => {
          return new Promise((resolve, reject) => {
            resolve({ Payload: '{"balance": 99999.99}' });
          });
        }),
      };
    });

    const actual = await getBalance(lambda_name, session, SDK);

    expect(actual).toEqual(desiredResult);
    expect(LambdaMock).toBeCalledWith({
      apiVersion: apiVersion,
    });

    expect(mLambda.invoke).toBeCalledWith({
      FunctionName: lambda_name,
      InvocationType: invocationType,
      LogType: logType,
      Payload: JSON.stringify(session),
    });
  });
});
