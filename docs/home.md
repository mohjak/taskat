# Taskat

## Project Goals and Objectives

**Goal:**
To create a comprehensive task management system that allows users to manage tasks efficiently.

**Objectives:**

1. Enable users to create, read, update, and delete tasks.
2. Provide a user-friendly interface to manage tasks.
3. Ensure data integrity and security.
4. Support multi-user functionality with role-based access control.

## Comparative Study

### Existing Systems Analyzed

1. **Trello**

   - **Strengths:** User-friendly, flexible, integrates with multiple tools.
   - **Weaknesses:** Limited free features, can be complex for new users.

2. **Asana**

   - **Strengths:** Robust project management features, collaboration tools.
   - **Weaknesses:** Expensive for premium features, steep learning curve.

3. **Microsoft To Do**
   - **Strengths:** Simple interface, integrates with Microsoft products.
   - **Weaknesses:** Limited features, basic for advanced project management.

### Evaluation

Our system will combine the strengths of these tools while addressing their weaknesses by offering a balanced set of features suitable for both personal and team use, with a focus on simplicity and efficiency.

## ERD (Entity-Relationship Diagram)

### Entities

1. **User**

   - `id` (Primary Key)
   - `name`
   - `email`
   - `password`
   - `role`

2. **Task**
   - `id` (Primary Key)
   - `title`
   - `description`
   - `dueDate`
   - `status`
   - `userId` (Foreign Key)

@startuml
entity User {
+id: ObjectId <<PK>>
--
name: String
email: String
password: String
role: String
}

entity Task {
+id: ObjectId <<PK>>
--
name: String
description: String
dueDate: Date
status: String
userId: ObjectId <<FK>>
}

User ||--o{ Task : "has"
@enduml

![ERD](erd.png)

### Relationships

- **User-Task:** One-to-Many (One user can have many tasks)

## RTM (Requirements Traceability Matrix)

| Requirement ID | Description                                | Functional | Non-Functional | Status      |
| -------------- | ------------------------------------------ | ---------- | -------------- | ----------- |
| R1             | User authentication and authorization      | Yes        | No             | In Progress |
| R2             | Task creation, reading, updating, deleting | Yes        | No             | Implemented |
| R3             | User-friendly interface                    | No         | Yes            | Implemented |
| R4             | Data integrity and security                | No         | Yes            | In Progress |

## Simplified RTM

| Requirement ID | Description                                | Functional | Status      |
| -------------- | ------------------------------------------ | ---------- | ----------- |
| R1             | User authentication and authorization      | Yes        | Implemented |
| R2             | Task creation, reading, updating, deleting | Yes        | Implemented |

## MVP Requirements

1. Task CRUD Operations
2. Basic User Interface
3. Basic Data Validation

## Project Timeline

| Milestone             | Start Date | End Date   | Status      |
| --------------------- | ---------- | ---------- | ----------- |
| Requirement Analysis  | 03/03/2024 | 11/03/2024 | Completed   |
| System Design         | 11/03/2024 | 16/03/2024 | Completed   |
| Development - Phase 1 | 17/04/2024 | 29/04/2024 | Completed   |
| Testing - Phase 1     | 29/04/2024 | 05/05/2024 | Completed   |
| Development - Phase 2 | 05/05/2024 | 18/05/2024 | Not Started |
| Testing - Phase 2     | 18/05/2024 | 20/05/2024 | Not Started |
| Deployment            | 20/05/2024 | 23/05/2024 | Not Started |

## UI Design

### Wireframes

- **Task Dashboard**
- **Task Creation/Editing Page**

### Tools Used

- React for frontend implementation

### Sample Wireframe

![Task Screen](task-screen.png)

#### User Registration and Login

```javascript
// Express.js Backend
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../models/user");

// Register Route
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
```

#### Task CRUD Operations

```javascript
// Task Model
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: false },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
```

## Integration Plan

1. **Frontend and Backend Integration:**
   - Use Axios for API calls from React frontend to Express backend.
   - Secure API endpoints with JWT authentication.
2. **Database Integration:**
   - Use Mongoose for MongoDB operations.
   - Ensure data consistency and integrity with schema validations.

## Testing Strategy

### Unit Testing

- Tools: Jest, Mocha
- Scope: Individual functions and modules

### Integration Testing

- Tools: Supertest (for API endpoints)
- Scope: Interaction between modules

### End-to-End Testing

- Tools: Cypress, Selenium
- Scope: Full user flows and interface tests

### Sample Test Case

```javascript
// Example Jest Test Case
const request = require("supertest");
const app = require("../app"); // Your Express app

describe("Task API", () => {
  it("should create a new task", async () => {
    const res = await request(app).post("/tasks").send({
      name: "Test Task",
      description: "This is a test task",
      dueDate: "2024-06-01",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
  });
});
```

## Deployment Steps

### Local Deployment

1. **Start MongoDB**: Ensure MongoDB is running locally.

   ```bash
   mongod
   ```

2. **Backend Setup**:

   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Frontend Setup**:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Production Deployment

1. **Set Up Environment**:
   - Configure environment variables in `.env` file for production.
2. **Build Frontend**:

   ```bash
   npm run build
   ```

3. **Deploy Backend and Frontend**:
   - Use hosting services like Heroku, Vercel, or AWS.
   - Ensure proper environment configurations and security settings.
