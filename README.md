# Taskat

Taskat is a task management system built with Node.js using Express for the backend and Next.js for the frontend. This guide will help you get the application up and running on a Windows environment.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- Node.js: [Download & Install Node.js](https://nodejs.org/en/download/)
- MongoDB: [Download & Install MongoDB](https://www.mongodb.com/try/download/community), and ensure it is running on your machine.

## Installation

Follow these steps to set up and run your project locally.

### Clone the repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/mohjak/taskat.git
cd taskat
```

### Install dependencies

Navigate to the project directory and install the required dependencies:

```bash
# Install backend dependencies
npm install

# Navigate to the frontend directory
cd frontend

# Install frontend dependencies
npm install
```

## Configuring the Application

Create a `.env` file in the root of your backend directory to store configuration settings such as your database connection string.

```plaintext
# .env file configuration
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/taskat
```

Ensure MongoDB is running before you start the application.

Createa `.env` file in the `frontend` directory to store configuration settings such as your server api url.

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Running the Application

To run the application, you need to start both the backend and the frontend servers.

### Start the backend server

Open a command prompt in the `taskat` directory:

```bash
node server.js
```

You should see a message indicating that the server is running on port 3001 and connected to MongoDB.

### Start the frontend server

Open another command prompt in the `taskat/frontend` directory:

```bash
npm run dev
```

This will start the Next.js development server on `http://localhost:3000`.

## Using the Application

To use the application, open a web browser and navigate to `http://localhost:3000`. Here, you'll find the task management interface.

### Creating a New Task

To create a new task:

1. Navigate to `http://localhost:3000`
2. Enter the task details in the input fields provided on the main page.
3. Click the "Create Task" button to submit the form.
4. The new task will be added to the MongoDB database, and you should see it listed on the page.

### Updating an Existing Task

To update an existing task:

1. Navigate to `http://localhost:3000`.
2. Find the task you wish to update in the task list displayed on the page.
3. Click the "Edit" button next to the task you want to modify.
4. The task's details will populate the input fields at the top of the page, allowing you to make changes.
5. Adjust the task's name, description, or due date as needed.
6. Click the "Update Task" button to submit the changes.
7. The task details will be updated in the MongoDB database, and you will see the updated information reflected in the task list on the page.
8. If you decide not to proceed with the changes, you can click the "Cancel Edit" button to revert the form to its initial state for creating tasks.

### Deleting an Existing Task

To delete an existing task:

1. Navigate to `http://localhost:3000`.
2. Locate the task you want to remove in the task list displayed on the page.
3. Click the "Delete" button next to the task you want to delete.
4. A confirmation prompt will appear to ensure you want to delete the task. Confirm the deletion.
5. The task will be removed from the MongoDB database, and it will no longer appear in the task list on the page.

### Viewing Tasks

To view all existing tasks:

1. Navigate to `http://localhost:3000`.
2. Upon loading the page, a list of all tasks stored in the MongoDB database will be displayed.
3. Each task entry shows the task name, description, and due date, along with "Edit" and "Delete" buttons for further actions.
