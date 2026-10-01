# School Backend API

Backend API service built with Node.js, Express, TypeScript, and MongoDB.

- **Frontend Live URL**: [https://salimadtric.netlify.app/](https://salimadtric.netlify.app/)

---

## 1. Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- npm or yarn

### Setup Steps

1. **Clone & Navigate to the Project**
   ```bash
   cd src
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Configure the variables in `.env`:
   ```env
   PORT=5000
   BASE_URL=http://localhost:5000
   MONGO_URI=mongodb://localhost:27017/task-backend
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=1d
   WEBHOOK_URL=https://your-crm-webhook-url.com/endpoint
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Run the Application**
   - **Development Mode** (with auto-reload):
     ```bash
     npm run dev
     ```
   - **Production Build & Run**:
     ```bash
     npm run build
     npm start
     ```

> **Note on Database Seeding**: On initial server startup, the default admin account is automatically seeded into MongoDB if it does not already exist.

---

## 2. Admin

### Default Credentials
- **Email**: `admin@gmail.com`
- **Password**: `Admin@123`

### Authentication
All routes under `/admin/*` (except `/admin/login`) are protected and require a Bearer token in the `Authorization` header:
```http
Authorization: Bearer <your_jwt_token>
```

---

### Admin Endpoints

#### Authentication
- **`POST /admin/login`**
  - **Body** (`application/json`):
    ```json
    {
      "email": "admin@gmail.com",
      "password": "Admin@123"
    }
    ```
  - **Response** (`200 OK`):
    ```json
    {
      "message": "Login successful",
      "token": "eyJhbGciOi...",
      "admin": {
        "id": "65b...",
        "email": "admin@gmail.com"
      }
    }
    ```

#### Dashboard Overview
- **`GET /admin/dashboard-stats`**
  - Fetches aggregated counts for enquiries (total, new, contacted, closed) and events (total, published, draft).

#### Events & News Management
- **`POST /admin/create-events`**
  - **Content-Type**: `multipart/form-data`
  - **Fields**:
    - `coverImage` (*File, required*): Image file (JPEG, PNG, WEBP, GIF — max 5MB)
    - `title` (*string, required*): Event/News title
    - `slug` (*string, required, unique*): URL-friendly slug
    - `category` (*string, required*): `"event"` | `"news"` | `"achievement"`
    - `publishedStatus` (*boolean or string `"true"`/`"false"`, optional, default: `false`*)
    - `date` (*ISO date string, required*)
    - `shortDescription` (*string, optional*)
    - `longDescription` (*string, optional*)

- **`GET /admin/get-events`**
  - **Query Parameters**:
    - `category`: `"all"` | `"event"` | `"news"` | `"achievement"` (default: `"all"`)
    - `status`: `"all"` | `"published"` | `"draft"` (default: `"all"`)
    - `search`: Search query string matching `title` or `slug`
    - `page`: Page number (default: `1`)
    - `limit`: Items per page (default: `10`, max: `100`)

- **`GET /admin/get-event/:slug`**
  - Fetch a single event by its slug.

- **`PUT /admin/edit-event/:id`**
  - **Content-Type**: `multipart/form-data` or `application/json`
  - Allows partial update of any event field. If a new `coverImage` is uploaded, the previous file is automatically deleted.

- **`DELETE /admin/delete-event/:id`**
  - Deletes the event record and deletes its associated image from the file system.

#### Enquiries Management
- **`GET /admin/get-enquiries`**
  - **Query Parameters**:
    - `search`: Search query matching parent/student name, class, mobile, or email
    - `status`: `"all"` | `"new"` | `"contacted"` | `"closed"` (default: `"all"`)
    - `crmStatus`: `"all"` | `"pending"` | `"sent"` | `"failed"` (default: `"all"`)
    - `page`: Page number (default: `1`)
    - `limit`: Items per page (default: `10`, max: `100`)

- **`PATCH /admin/update-enquiry-status/:id`**
  - **Body** (`application/json`):
    ```json
    {
      "status": "contacted"
    }
    ```
    *Allowed statuses*: `"new"`, `"contacted"`, `"closed"`.

- **`DELETE /admin/delete-enquiry/:id`**
  - Deletes an enquiry record by ID.

---

## 3. Web (Public)

These endpoints are publicly accessible without authentication.

### Events & News

- **`GET /get-events`**
  - Returns published events and news sorted by date descending.
  - **Query Parameters**:
    - `category`: `"all"` | `"event"` | `"news"` | `"achievement"` (default: `"all"`)
    - `search`: Search by title or slug
    - `page`: Page number (default: `1`)
    - `limit`: Items per page (default: `10`, max: `100`)

- **`GET /get-event/:slug`**
  - Returns single published event details matching the provided slug.

### Admission Enquiry

- **`POST /create-enquiry`**
  - **Rate Limit**: Maximum 5 enquiries per minute per IP address.
  - **Duplicate Check**: Automatically blocks submissions if an enquiry with the same mobile number and class was submitted within the last 24 hours (`409 Conflict`).
  - **CRM Integration**: Dispatches enquiry details to the external CRM webhook with a 5-second timeout. The enquiry is saved in the database regardless of webhook delivery status.
  - **Body** (`application/json`):
    ```json
    {
      "parentName": "John Doe",
      "studentName": "Alex Doe",
      "classApplyingFor": "Grade 5",
      "mobile": "+919876543210",
      "email": "john.doe@example.com",
      "message": "Looking for admission details for academic year 2026-27."
    }
    ```
  - **Validation Rules**:
    - `parentName`: Required string (1-100 characters).
    - `studentName`: Required string (1-100 characters).
    - `classApplyingFor`: Required string (1-50 characters).
    - `mobile`: Required valid 10-digit Indian mobile number (e.g. `9876543210`, `+919876543210`, or `919876543210`).
    - `email`: Optional, must be a valid email address.
    - `message`: Optional string (max 1000 characters).
  - **Response** (`201 Created`):
    ```json
    {
      "message": "Enquiry submitted successfully",
      "enquiryId": "65b..."
    }
    ```
