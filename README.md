## **Description**

---

The project for managing you tasks. You can create a task and checklist for it. Created basic `JWT` auth flow with access token. Used `PostgreSQL` as data storage. Client writed on `React` library and used `Ant-Design` library for UI component and `styled-components` for additional styling. Used `Redux` as state manager and `React-Query` for API.

## **Prerequisites**

---

- node >= 18.0
- docker

## **Run application**

---

1. Change your credential in the `.env` file. Also you can use default but it`s not secure.

2. Setup your `docker` image by `docker-compose` file, running next command:

   ```properties
   npm run services:start
   ```

3. Run the migration command:

   ```properties
   npm run migration
   ```

4. Install your packages for BE part and for FE part open the `src/client` folder:

   ```properties
   npm i
   ```

5. In the root folder run next command for starting application:

   ```properties
   npm run serve
   ```

6. Now you can open `http://localhost:{YOUR_PORT}` to see the result.
