import { Post } from "./entity/Posts";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// C
app.post("/user", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = User.create({ name, email });
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/users", async (_: Request, res: Response) => {
  try {
    const users = await User.find({ relations: ["posts"] });

    return res.json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.put("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const { name, email } = req.body;
  try {
    const user = await User.findOneOrFail({ uuid });
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong");
  }
});

app.delete("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOneOrFail({ uuid });
    await user.remove();
    return res.json({ message: "User has been removed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong");
  }
});

app.get("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOneOrFail({ uuid });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong");
  }
});

// POSTS
app.post("/post", async (req: Request, res: Response) => {
  const { title, body, userUuid } = req.body;
  try {
    const user = await User.findOneOrFail({ uuid: userUuid });
    const post = new Post({ title, body, user });
    await post.save();
    return res.status(201).json(post);
  } catch (err) {
    console.log(1, err);
    return res.status(500).json(err);
  }
});

app.get("/posts", async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ relations: ["user"] });
    return res.status(201).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

createConnection()
  .then(async connection => {
    const port = 4000;
    app.listen(port, () => console.log(`server is running on port ${port}`));
  })
  .catch(error => console.log(error));
