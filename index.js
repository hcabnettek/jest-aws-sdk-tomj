const AWS = require("aws-sdk");
const getBalance = require("./getBalance");

var client = new sdk.Lambda({ apiVersion: "2015-03-31" });

const balance = await getBalance("foo", "bar", client);

console.log(balance);
