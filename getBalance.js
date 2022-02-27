async function getBalance(lambda_name, session, aws_client) {
  var lambda_client = new aws_client.Lambda({ apiVersion: "2015-03-31" });

  var result = await lambda_client
    .invoke({
      FunctionName: lambda_name,
      InvocationType: "RequestResponse",
      LogType: "None",
      Payload: JSON.stringify(session),
    })
    .promise();

  try {
    return JSON.parse(result.Payload);
  } catch (e) {
    return {};
  }
}

module.exports = getBalance;
