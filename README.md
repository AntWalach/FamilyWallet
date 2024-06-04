# Family Wallet

Family Wallet is a MERN (MongoDB, Express.js, React.js, Node.js) application designed to help families manage their finances effectively.

## Backend

The backend of the application is responsible for handling data storage, authentication, and serving API endpoints to the frontend. Here's the directory structure of the backend:

- **`controllers`**: Contains controller functions that define the application's behavior.
- **`db`**: Includes database connection and schema definitions.
- **`helpers`**: Contains helper functions used throughout the application.
- **`middleware`**: Houses middleware functions for handling requests before they reach the route handlers.
- **`models`**: Defines Mongoose models for interacting with the MongoDB database.
- **`routes`**: Contains route definitions for different API endpoints.
- **`tests`**: Includes both integration and unit tests for testing the application.

## Frontend

The frontend of the application is responsible for providing a user interface for interacting with the application. Here's the directory structure of the frontend:


- **`public`**: Contains static assets and the main `index.html` file.
- **`src`**: Houses the source code of the frontend application.
- **`src/components`**: Contains reusable React components.
- **`src/pages`**: Defines different pages of the application.
- **`src/styles`**: Includes CSS or styled-components files for styling the components.
- **`src/utils`**: Houses utility functions used throughout the application.

## Environment Variables

Create a `.env` file in the root directory of the backend with the following variables:

- **`PORT`**: Specifies the port number on which the backend server will run. Set it to `5000`.
  
- **`CLIENT_URL`**: Defines the URL of the frontend client. This is typically used for CORS (Cross-Origin Resource Sharing) configuration. Set it to `http://localhost:5173`.

- **`MONGO_URL`**: Specifies the connection URL for the MongoDB database. Include the username, password, host, and other connection parameters.

- **`JWT_SECRET`**: Secret key used for JWT (JSON Web Token) generation and verification. Keep it secure and do not expose it publicly.

- **`EMAIL_HOST`**: Specifies the SMTP server host for sending emails.

- **`USER_EMAIL`**: Email address of the user. Set it to your desired email address.

- **`EMAIL_PASS`**: Password for authenticating with the SMTP email server specified in `EMAIL_HOST`. Keep it secure and do not expose it publicly.

- **`NODE_ENV`**: Specifies the environment mode in which the application is running. Set it to `development`.


Example `.env` file:
```dotenv
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URL=mongodb+srv://username:password@cluster.example.com/?retryWrites=true&w=majority
JWT_SECRET=mySecretKey
EMAIL_HOST=smtp.example.com
USER_EMAIL=user@example.com
EMAIL_PASS=myEmailPassword
NODE_ENV=development
```
## Running the Application

To run the Family Wallet application, follow these steps:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies   
   ```bash
   npm install
   ```
3. Start the backend server
   ```bash
   npm start
   ```
4. Open another terminal window and navigate to the frontend directory
   ```bash
   cd frontend/familywallet
   ```
5. Install frontend dependencies
   ```bash
   npm install
   ```
   
6. Start the frontend development server
   ```bash
   npm run dev
   ```
7. Access the application in your web browser at the specified URL.












