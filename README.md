# Brainly 🧠 - A Collaborative Learning Platform


> ⚠️ This project is currently under development. Some features mentioned here are planned and not yet fully implemented.
> 
Brainly is a platform designed to foster collaborative learning and knowledge sharing. It allows users to create, share, and consume educational content in a structured and engaging environment. Whether you're a student, educator, or lifelong learner, Brainly provides the tools you need to connect with others and expand your understanding of the world.

## 🚀 Features (Currently Implemented)
* **Protected Routes:** Ensures that only authenticated users can access certain parts of the application.
* **Content Creation:** Users can add educational content.

## 🔮 Roadmap / Upcoming Features
* **User Authentication:** Signup, signin, and logout functionality.
* **Content Sharing:** Share content with others via unique links.
* **Profile Management:** Users can manage and personalize their profiles.
* **Persistent Authentication:** User sessions persisted across browser sessions.


🛠️ **Tech Stack**

*   **Frontend:**
    *   React: A JavaScript library for building user interfaces.
    *   React Router DOM: For handling client-side routing.
    *   Zustand: A small, fast, and scalable bearbones state-management solution.
    *   Axios: For making HTTP requests to the backend API.
    *   CSS: Styling for the user interface.
*   **Backend:**
    *   Node.js: A JavaScript runtime environment.
    *   Express: A web application framework for Node.js.
    *   Mongoose: An ODM (Object-Document Mapper) for MongoDB.
    *   dotenv: For managing environment variables.
    *   cookie-parser: For parsing cookies.
    *   cors: For enabling Cross-Origin Resource Sharing.
*   **Database:**
    *   MongoDB: A NoSQL database for storing application data.
*   **Other:**
    *   Git: Version control system.
    *   npm/Yarn: Package manager.

📦 **Getting Started / Setup Instructions**

**Prerequisites**

*   Node.js (v16 or higher)
*   npm or Yarn
*   MongoDB installed and running

**Installation**

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd Brainly
    ```

2.  **Install dependencies for the backend:**

    ```bash
    cd brainly
    npm install  # or yarn install
    ```

3.  **Install dependencies for the frontend:**

    ```bash
    cd client/frontend
    npm install # or yarn install
    ```

4.  **Configure environment variables:**

    *   Create a `.env` file in the `brainly` directory.
    *   Add the following environment variables:

        ```
        MONGO_URI=<your_mongodb_connection_string>
        PORT=5000 # or any other port
        ```

    *   Create a `client/frontend/src/components/config/config.ts` file and add the backend URL:

        ```typescript
        export const BACKEND_URL = 'http://localhost:5000/api/v1'; // Replace with your backend URL
        ```

**Running Locally**

1.  **Start the backend server:**

    ```bash
    cd brainly
    npm run dev # or yarn dev
    ```

2.  **Start the frontend development server:**

    ```bash
    cd client/frontend
    npm run dev # or yarn dev
    ```

    The frontend application will be accessible at `http://localhost:5173` (or the port specified by Vite).

💻 **Project Usage**

1.  **Signup:** Navigate to the signup page to create a new account.
2.  **Signin:** Use your credentials to log in to the application.
3.  **Explore Content:** Browse the available content and engage with the learning materials.
4.  **Create Content:** Add your own educational content to share with the community.
5.  **Share Content:** Generate shareable links to distribute content easily.
6.  **Manage Profile:** Update your profile information and personalize your learning experience.

📂 **Project Structure**

```
Brainly/
├── brainly/               # Backend directory
│   ├── src/
│   │   ├── config/          # Configuration files (database connection)
│   │   ├── controllers/     # Route handlers/Controllers
│   │   ├── middlewares/     # Custom middlewares
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── index.ts         # Main entry point for the backend
│   │   └── ...
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── client/                # Frontend directory
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/   # React components
│   │   │   │   ├── Auth/      # Authentication components
│   │   │   │   ├── config/    # Configuration
│   │   │   │   ├── ...
│   │   │   ├── store/         # Zustand stores
│   │   │   ├── App.tsx        # Main application component
│   │   │   ├── main.tsx       # Entry point for the frontend
│   │   │   ├── index.css      # Global styles
│   │   │   └── ...
│   │   ├── public/          # Static assets
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
├── .gitignore
├── README.md
└── ...
```

