import express, { response } from "express";
import { storageArray } from "../storage";
import { isIndexInArray, checkCorrectType } from "../logics/logics";
import jwt from "jsonwebtoken";
import { authenticateToken, isAdmin, secret } from "../logics/middleware";

const arrayRouter = express.Router();

//array Routing
arrayRouter
  .route("/")
  .get((req, res) => {
    res.json({
      array: storageArray,
    });
  })
  .post(isAdmin, (req, res) => {
    const value: string | number = req.body.value;
    if (checkCorrectType(value)) {
      storageArray.push(value);
      res.status(201).json({
        array: storageArray,
      });
    } else {
      res.status(400).json({
        value: "invalid value entered",
      });
    }
  })
  .delete(isAdmin, (req, res) => {
    storageArray.pop();
    res.json({
      array: storageArray,
    });
  });

arrayRouter.all("/", (req, res) => {
  res.status(405).json({
    method: "invalid method used",
  });
});

arrayRouter
  .route("/:index")
  .get((req, res) => {
    if (req.params.index) {
      const arrayIndex: number = isIndexInArray(
        Number(req.params.index),
        storageArray
      );

      if (arrayIndex !== -1) {
        const itemInIndex = storageArray[arrayIndex];
        res.json({
          itemInIndex: itemInIndex,
        });
      } else {
        res.status(400).json({
          index: "invalid index",
        });
      }
    }
  })

  .put(isAdmin, (req, res) => {
    const value: string | number = req.body.value;
    if (typeof req.params.index === "number") {
      const arrayIndex = isIndexInArray(Number(req.params.index), storageArray);
      if (arrayIndex !== -1 && checkCorrectType(value)) {
        storageArray[arrayIndex] = value;
        res.json({
          array: storageArray,
        });
      } else {
        if (typeof arrayIndex === "number") {
          res.status(400).json({
            index: "invalid index",
          });
        }
      }
    }
  })
  .delete(isAdmin, (req, res) => {
    if (req.params.index) {
      const arrayIndex = isIndexInArray(Number(req.params.index), storageArray);
      if (arrayIndex !== -1) {
        storageArray.splice(arrayIndex, 1);
        res.json({
          array: storageArray,
        });
      } else {
        res.status(400).json({
          index: "invalid index",
        });
      }
    }
  });

arrayRouter.all("/:index", (req, res) => {
  res.status(405).json({
    method: "invalid method used",
  });
});

arrayRouter.all("/", (req, res) => {
  res.status(404).json({
    route: "invalid route",
  });
});

export default arrayRouter;
