import "source-map-support/register";

import { scaffold } from "node-lambda-toolkit";

import connectToDB from "../util/connectToDB";
import { addComment } from "../helpers/comment";

const bootstrap = scaffold({
  errMsg: "ERROR ADDING COMMENT:",
  connectToDB
});

module.exports.handler = (...input) => {
  bootstrap(input, async req => {
    const comment = await addComment(req.body);
    return comment;
  });
};
