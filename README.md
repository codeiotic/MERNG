# MERNG STACK PROJECT

**MERNG Stack**

| Character | Full Name |
| --------- | --------- |
| M         | `MongoDB` |
| E         | `Express` |
| R         | `React`   |
| N         | `NodeJS`  |
| G         | `GraphQL` |

---

## This Project was created with MERNG STACK

---

#### This Project uses `React` in the frontend, `MongoDB` in the backend and `GraphQL` for fetching the data.

---

> To be specific, this project uses `Apollo Server` and `Apollo Client` for all the Queries and Mutations.

---

#### For the UI, it uses `Semantic-UI` which creates an awesome User Interface.

---

## The Project Description -

---

#### This Project, is similar to Instagram or Reddit. You can post messages here, share it, like it, and comment on it.

#### It has a full Registration and Log In Setup and Server Side Validation.

#### If you spot some bugs, or just want to share some improvements, please create an issue and I will respond as soon as I can 🙂.

---

## Pull Request -

#### If you cloned this repository and want to get started, here's the guide for you.

> First cd into the project directory.

```powershell
    cd MERNG
```

> Then firstly download the `node_modules` with:

```powershell
    npm install
    -----------
    OR
    -----------
    yarn
```

> Then run this command to start the server

```powershell
    npm run dev
    -----------
    OR
    -----------
    yarn run dev
```

> The Apollo Server will start at `http://localhost:5000`

---

**NOTE:**
**You will have to create a `config.js` file containing your `MONGODB` key and an `SECRET_KEY` for password hashing.**

---

> After the server is up and running, cd into the `client` directory

```powershell
    cd client
```

> Then start the development server with:

```powershell
    npm start
    ---------
    OR
    ---------
    yarn start
```

> With that, you should be good to go!

---

## Folder Structure of the Project -

---

| Folder Name | Description                             |
| ----------- | --------------------------------------- |
| **client**  | Contains the `front end` of the project |
| **graphql** | Contains the `typeDefs` and `resolvers` |
| **models**  | Contains the `User` and `Post models`   |
| **util**    | Contains some handy functions           |
