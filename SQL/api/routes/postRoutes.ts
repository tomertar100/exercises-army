import express from "express";
import { getAllPosts, getPost, createPost } from "../actions/postsActions";

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const data = await getAllPosts();
  res.json(data);
});

postRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await getPost(id);
  res.json(post);
});

postRouter.post("/", async (req, res) => {
  const user_id = req.body.user_id;
  const content = req.body.content;
  await createPost(user_id, content);
  res.json("post created");
});
export default postRouter;
