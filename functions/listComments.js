import "source-map-support/register";

import { scaffold } from "node-lambda-toolkit";

import connectToDB from "../util/connectToDB";
import { listComments } from "../helpers/comment";

const bootstrap = scaffold({
  errMsg: "ERROR LISTING COMMENTS:",
  connectToDB
});

module.exports.handler = (...input) => {
  bootstrap(input, async req => {
    const criteria = {};
    if (req.query.user) criteria.user = req.query.user;
    const comments = await listComments(criteria);
    return comments;
  });
};
