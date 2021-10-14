import express from "express";
import {
  getAllComments,
  getComment,
  createComment,
} from "../actions/commentsActions";

const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res) => {
  const data = await getAllComments();
  res.json(data);
});

commentsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const comment = await getComment(id);
  res.json(comment);
});

commentsRouter.post("/", async (req, res) => {
  const user_id = req.params.user_id;
  const post_id = req.params.post_id;
  const content = req.params.content;
  await createComment(user_id, post_id, content);

  res.json("comment Created");
});

export default commentsRouter;
