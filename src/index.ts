import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";
import { User } from "./entity/User";
import express, { Request, Response } from 'express'


const app = express();
app.use(express.json());

// C
app.post('/user', async (req: Request, res: Response) => {
    const {name, email} = req.body;
    try {
       const user = User.create({name, email}) 
       await user.save()
       return res.status(201).json(user)
    } catch (err) {
       return res.status(500).json(err) 
    }
})

app.get('/users', async (_: Request, res: Response) => {
    try {
       const users = await User.find();

       return res.json(users)
    } catch (err) {
       return res.status(500).json(err) 
    }
})


createConnection()
  .then(async (connection) => {
      const port = 4000
      app.listen(port, () => console.log(`server is running on port ${port}`))
    // console.log("Inserting a new user into the database...");
    // const photo = new Photo();
    // photo.desc = "Jordan";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(photo);
    // console.log("Saved a new user with id: " + photo.id);

    // console.log("Loading users from the database...");
    // const photos = await connection.manager.find(Photo);
    // console.log({photos});
    
    // // console.log("Loaded users: ", photos);

    // console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch((error) => console.log(error));
