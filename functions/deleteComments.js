import "source-map-support/register";

import { scaffold } from "node-lambda-toolkit";

import connectToDB from "../util/connectToDB";
import { deleteComments } from "../helpers/comment";

const bootstrap = scaffold({
  errMsg: "ERROR DELETING COMMENTS:",
  connectToDB
});

module.exports.handler = (...input) => {
  bootstrap(input, async () => {
    const ids = await deleteComments();
    return ids;
  });
};
