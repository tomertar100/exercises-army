import express from "express";

export const errorHandler: express.ErrorHandler = (err, req, res, next) => {
  res.json(err.message);
  console.error(err);
};
