# Blog list

In the exercises for this part we will be building a blog list application, that allows users to save information about interesting blogs they have stumbled across on the internet. For each listed blog we will save the author, title, url, and amount of upvote from users of the application.

## Start

1. install dependencies

   ```shell
   npm install
   ```

2. create a `.env` file at the root of the project, then define the environment variables, it looks like this:

   ```
   MONGODB_URI=mongodb+srv://<yourusername>:<yourpassword>@cluster0.bxljdds.mongodb.net/App?retryWrites=true&w=majority
   TEST_MONGODB_URI=mongodb+srv://<yourusername>:<yourpassword>@cluster0.bxljdds.mongodb.net/testApp?retryWrites=true&w=majority
   PORT=3001
   SECRET=secret-key
   ```

3. run all tests

   ```shell
   npm run test
   ```

4. start the app in dev environment

   ```shell
   npm run dev
   ```

When the console output "connected to MongoDB", it indicates that the database is successfully connected. Then you can do the following operations:

1. create a new user(POST) or list all users(GET) at the endpoint `http://localhost:3001/api/users`

   ```json
   // POST
   {
     "username": "root",
     "name": "root",
     "password": "root"
   }
   ```

2. log in using username and password(POST) at the endpoint `http://localhost:3001/api/login`, it will return a jwt token

   ```json
   // POST
   {
     "username": "root",
     "password": "root"
   }
   ```

3. create a new blog(POST) and list all blogs(GET) at the endpoint `http://localhost:3001/api/blogs`, **these operation requires the jwt token to be set in the Authorization header**

   ```json
   // POST
   {
     "title": "title",
     "author": "author",
     "url": "url",
     "likes": 0
   }
   ```

4. update a blog(PUT) or delete a blog(DELETE) at the endpoint `http://localhost:3001/api/blogs/<blog_id>`, **these operation requires the jwt token to be set in the Authorization header**

   ```json
   // PUT
   {
     "title": "new title",
     "author": "new author",
     "url": "new url",
     "likes": 0
   }
   ```

   