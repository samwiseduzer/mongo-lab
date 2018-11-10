import { ValidationError, proliferateThrownError } from "node-lambda-toolkit";

import Comment from "../models/comment";
import { validate } from "../util/mongo";
import mongoose from "mongoose";

export const addComment = payload => {
  return new Promise(async (resolve, reject) => {
    try {
      const newComment = new Comment(Object.assign({}, payload));
      const validation = validate(newComment);

      if (!validation.isValid) {
        reject(new ValidationError(validation.errors));
      } else {
        const savedComment = await newComment.save({ new: true });
        resolve(savedComment);
      }
    } catch (err) {
      reject(proliferateThrownError(err, "Failed to create new Comment"));
    }
  });
};

export const deleteComments = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // const results = await Comment.remove({});
      const results = await mongoose.connection.dropCollection("comments");
      resolve({ message: "success", results });
    } catch (err) {
      reject(proliferateThrownError(err, "Failed to remove comment"));
    }
  });
};

export const listComments = (
  criteria = {},
  { orderBy = "createdAt", populate = [], select = ["_id"] } = {
    orderBy: "createdAt",
    populate: [],
    select: ["_id"]
  }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comments = await Comment.find(criteria)
        .sort(orderBy)
        .populate(...populate)
        .exec();
      resolve(comments || []);
    } catch (err) {
      reject(proliferateThrownError(err, "Failed to get comments"));
    }
  });
};
