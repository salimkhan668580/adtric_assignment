# The Manthan School --- Web & Admin Portal

A full-stack school management web application built with **Next.js (App
Router)**, **TypeScript**, **Tailwind CSS**, **Node.js**, **Express**,
and **MongoDB**.

The project consists of:

-   **Public Web Portal** --- school information, news/events,
    achievements, and admission enquiries.
-   **Admin Portal** --- authentication, dashboard, news/events
    management, and admission enquiry management.
-   **REST API Backend** --- Express/TypeScript API with MongoDB, JWT
    authentication, validation, rate limiting, and CRM webhook
    integration.

## Live URLs

-   **Frontend:** https://salimadtric.netlify.app/
-   **Backend API:** https://adtric-assignment.onrender.com

------------------------------------------------------------------------

# 1. Project Structure

The application is divided into two major parts:

``` text
adtric_assignment/
├── frontend/        # Next.js Web & Admin Portal
└── backend/         # Express REST API
```

> Adjust the folder names if the frontend and backend are maintained in
> separate repositories.

------------------------------------------------------------------------

# 2. Tech Stack

## Frontend

-   Next.js --- App Router
-   TypeScript
-   Tailwind CSS
-   React
-   Axios
-   Zod
-   Form validation
-   Cookie-based authentication/session handling

## Backend

-   Node.js
-   Express.js
-   TypeScript
-   MongoDB
-   Mongoose
-   JWT authentication
-   CORS
-   Rate limiting
-   Webhook/CRM integration
-   File upload handling

------------------------------------------------------------------------

# 3. Frontend Installation

## Prerequisites

-   **Node.js:** v18.17.0 or higher
-   npm, yarn, or pnpm

## Setup

### 1. Clone the repository

``` bash
git clone <repository-url>
cd adtric_task
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the frontend root:

``` env
NEXT_PUBLIC_API_URL=https://adtric-assignment.onrender.com
```

For local backend development:

``` env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run the development server

``` bash
npm run dev
```

Open:

``` text
http://localhost:3000
```

### 5. Build for production

``` bash
npm run build
npm start
```

------------------------------------------------------------------------

# 4. Backend Installation

## Prerequisites

-   **Node.js:** v18 or higher recommended
-   MongoDB local instance or MongoDB Atlas
-   npm or yarn

## Setup

### 1. Navigate to the backend

``` bash
cd src
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend root by copying `.env.example`:

``` bash
cp .env.example .env
```

Configure the required variables:

``` env
PORT=5000
BASE_URL=http://localhost:5000
MONGO_URI=mongodb://localhost:27017/task-backend
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
WEBHOOK_URL=https://your-crm-webhook-url.com/endpoint
CORS_ORIGIN=http://localhost:3000
```

For the deployed frontend, update `CORS_ORIGIN` to the production
frontend URL:

``` env
CORS_ORIGIN=https://salimadtric.netlify.app
```

### 4. Run the backend

Development:

``` bash
npm run dev
```

Production:

``` bash
npm run build
npm start
```

> **Database seeding:** On initial server startup, the default admin
> account is automatically created in MongoDB if it does not already
> exist.

------------------------------------------------------------------------

# 5. Admin Portal

The admin portal is available under:

``` text
/admin
```

It provides administrative control over school communications, content,
events, news, and prospective student enquiries.

## Authentication & Session Security

-   Credential-based admin login.
-   Login endpoint: `POST /admin/login`
-   JWT-based authentication.
-   Authentication token stored in an HTTP cookie named `auth_token`.
-   Protected admin routes with route-guard redirects.
-   Logout confirmation before clearing the active session.

## Default Admin Credentials

> These credentials are intended for development/testing. Change or
> remove default credentials before production use.

``` text
Email: admin@gmail.com
Password: Admin@123
```

------------------------------------------------------------------------

# 6. Admin Dashboard

Route:

``` text
/admin
```

Features:

-   Centralized dashboard overview.
-   Total enquiry statistics.
-   New, contacted, and closed enquiry counts.
-   Total events/news counts.
-   Published and draft content counts.
-   Quick navigation to enquiries and news/events management.

------------------------------------------------------------------------

# 7. Admin News & Events Management

Route:

``` text
/admin/news-events
```

Features:

-   View all news, events, and achievements.
-   Category filtering:
    -   All
    -   News
    -   Events
    -   Achievements
-   Keyword search.
-   Pagination.
-   Active/inactive or published/draft status management.
-   Create new content.
-   Edit existing content.
-   Image upload with preview.
-   Replace existing images.
-   Delete content with confirmation.
-   Zod-based form validation.

## Create News/Event

Route:

``` text
/admin/news-events/add
```

Supports:

-   Title
-   Slug
-   Category
-   Event/publication date
-   Short description
-   Long description/content
-   Published status
-   Cover image

## Edit News/Event

Route:

``` text
/admin/news-events/[id]
```

Supports:

-   Updating existing content.
-   Updating event/news details.
-   Replacing an existing image.
-   Retaining the existing image when no replacement is provided.

------------------------------------------------------------------------

# 8. Admin Admission Enquiries

Route:

``` text
/admin/enquiries
```

Features:

-   View all admission enquiries.
-   Search enquiries.
-   Filter enquiries by status.
-   Pagination.
-   View:
    -   Student name
    -   Parent/guardian name
    -   Email
    -   Phone number
    -   Grade/class applied for
    -   Message
    -   Submission date
-   Delete enquiries with confirmation dialogs.

------------------------------------------------------------------------

# 9. Public Web Portal

The public-facing website provides school information and allows
prospective parents to submit admission enquiries.

## Home Page

Route:

``` text
/web
```

Features:

-   School branding and hero section.
-   Mission statement.
-   "Enquire Now" call-to-action.
-   About section.
-   Academics and educational information.
-   Campus/facilities information.
-   Featured announcements.
-   Recent news and upcoming events.
-   Admission enquiry form.
-   Responsive navigation and footer.

## Admission Enquiry Form

The enquiry form collects:

-   Parent name
-   Student name
-   Class/grade
-   Mobile number
-   Email
-   Message

The frontend provides:

-   Client-side validation.
-   Error messages.
-   Toast notifications.
-   Submission feedback.

------------------------------------------------------------------------

# 10. Public News & Events

## Listing

Route:

``` text
/web/news-events
```

Features:

-   News and event listing.
-   Category filters.
-   Search.
-   Pagination.
-   Responsive cards.
-   Publication/event dates.
-   Category badges.
-   Image thumbnails.
-   Content excerpts.

## Detail Page

Route:

``` text
/web/news-events/[slug]
```

Features:

-   Full article/event details.
-   Header image.
-   Published date.
-   Category.
-   Full description.
-   Related news/events.
-   Back navigation.

------------------------------------------------------------------------

# 11. Backend API

Base URL:

``` text
https://adtric-assignment.onrender.com
```

For local development:

``` text
http://localhost:5000
```

------------------------------------------------------------------------

# 12. API Authentication

All protected routes under `/admin/*`, except the login endpoint,
require a JWT Bearer token.

``` http
Authorization: Bearer <your_jwt_token>
```

------------------------------------------------------------------------

# 13. Admin API Endpoints

## Authentication

### Login

``` http
POST /admin/login
```

Request:

``` json
{
  "email": "admin@gmail.com",
  "password": "Admin@123"
}
```

Response:

``` json
{
  "message": "Login successful",
  "token": "eyJhbGciOi...",
  "admin": {
    "id": "65b...",
    "email": "admin@gmail.com"
  }
}
```

------------------------------------------------------------------------

## Dashboard

### Get Dashboard Statistics

``` http
GET /admin/dashboard-stats
```

Returns aggregated statistics for:

-   Total enquiries
-   New enquiries
-   Contacted enquiries
-   Closed enquiries
-   Total events/news
-   Published content
-   Draft content

------------------------------------------------------------------------

# 14. Admin Events & News API

## Create Event/News

``` http
POST /admin/create-events
```

Content-Type:

``` text
multipart/form-data
```

Fields:

  Field                Type             Required   Description
  -------------------- ---------------- ---------- -----------------------------------
  `coverImage`         File             Yes        JPEG, PNG, WEBP, or GIF; max 5 MB
  `title`              String           Yes        Event/news title
  `slug`               String           Yes        Unique URL-friendly slug
  `category`           String           Yes        `event`, `news`, or `achievement`
  `publishedStatus`    Boolean/String   No         Defaults to `false`
  `date`               ISO Date         Yes        Event/publication date
  `shortDescription`   String           No         Short description
  `longDescription`    String           No         Full content

------------------------------------------------------------------------

## Get Events

``` http
GET /admin/get-events
```

Query parameters:

  Parameter    Description                             Default
  ------------ --------------------------------------- ---------
  `category`   `all`, `event`, `news`, `achievement`   `all`
  `status`     `all`, `published`, `draft`             `all`
  `search`     Search by title or slug                 ---
  `page`       Page number                             `1`
  `limit`      Items per page, maximum `100`           `10`

------------------------------------------------------------------------

## Get Event by Slug

``` http
GET /admin/get-event/:slug
```

Returns a single event/news record using its slug.

------------------------------------------------------------------------

## Update Event

``` http
PUT /admin/edit-event/:id
```

Supported content types:

``` text
multipart/form-data
application/json
```

Supports partial updates of event/news fields.

If a new cover image is uploaded, the previous image is automatically
deleted.

------------------------------------------------------------------------

## Delete Event

``` http
DELETE /admin/delete-event/:id
```

Deletes:

-   Event/news database record.
-   Associated image file.

------------------------------------------------------------------------

# 15. Admin Enquiry API

## Get Enquiries

``` http
GET /admin/get-enquiries
```

Query parameters:

  Parameter     Description                                           Default
  ------------- ----------------------------------------------------- ---------
  `search`      Search parent/student name, class, mobile, or email   ---
  `status`      `all`, `new`, `contacted`, `closed`                   `all`
  `crmStatus`   `all`, `pending`, `sent`, `failed`                    `all`
  `page`        Page number                                           `1`
  `limit`       Items per page, maximum `100`                         `10`

------------------------------------------------------------------------

## Update Enquiry Status

``` http
PATCH /admin/update-enquiry-status/:id
```

Request:

``` json
{
  "status": "contacted"
}
```

Allowed statuses:

``` text
new
contacted
closed
```

------------------------------------------------------------------------

## Delete Enquiry

``` http
DELETE /admin/delete-enquiry/:id
```

Deletes an enquiry by ID.

------------------------------------------------------------------------

# 16. Public API

These endpoints are publicly accessible and do not require
authentication.

## Get Published Events & News

``` http
GET /get-events
```

Returns published events/news sorted by date descending.

Query parameters:

  Parameter    Description                             Default
  ------------ --------------------------------------- ---------
  `category`   `all`, `event`, `news`, `achievement`   `all`
  `search`     Search by title or slug                 ---
  `page`       Page number                             `1`
  `limit`      Items per page, maximum `100`           `10`

------------------------------------------------------------------------

## Get Published Event by Slug

``` http
GET /get-event/:slug
```

Returns a single published event/news record matching the provided slug.

------------------------------------------------------------------------

# 17. Admission Enquiry API

## Create Enquiry

``` http
POST /create-enquiry
```

Content-Type:

``` text
application/json
```

### Rate Limiting

Maximum:

``` text
5 enquiries per minute per IP address
```

### Duplicate Protection

An enquiry is rejected with `409 Conflict` if an enquiry with the same
mobile number and class was submitted within the previous 24 hours.

### CRM Integration

After an enquiry is created, its details are dispatched to the
configured external CRM webhook.

-   Webhook timeout: 5 seconds.
-   The enquiry is saved in the database regardless of webhook delivery
    status.
-   CRM delivery status can be tracked through the enquiry's CRM status.

### Request Body

``` json
{
  "parentName": "John Doe",
  "studentName": "Alex Doe",
  "classApplyingFor": "Grade 5",
  "mobile": "+919876543210",
  "email": "john.doe@example.com",
  "message": "Looking for admission details for academic year 2026-27."
}
```

### Validation Rules

  Field                Rules
  -------------------- -------------------------------------
  `parentName`         Required, string, 1--100 characters
  `studentName`        Required, string, 1--100 characters
  `classApplyingFor`   Required, string, 1--50 characters
  `mobile`             Required valid Indian mobile number
  `email`              Optional, valid email format
  `message`            Optional, maximum 1000 characters

Supported Indian mobile formats include:

``` text
9876543210
+919876543210
919876543210
```

### Success Response

HTTP status:

``` text
201 Created
```

``` json
{
  "message": "Enquiry submitted successfully",
  "enquiryId": "65b..."
}
```

------------------------------------------------------------------------

# 18. Security & Validation

The application implements several security and validation mechanisms:

-   JWT-based authentication for protected admin APIs.
-   Protected admin frontend routes.
-   HTTP cookie-based authentication/session handling.
-   Request validation.
-   Zod form validation on the frontend.
-   Rate limiting on public enquiry submissions.
-   Duplicate enquiry prevention.
-   File type and file size validation.
-   CORS configuration.
-   CRM webhook timeout handling.
-   Confirmation dialogs for destructive admin actions.

------------------------------------------------------------------------

# 19. File Uploads

Event/news cover images support:

``` text
JPEG
PNG
WEBP
GIF
```

Maximum file size:

``` text
5 MB
```

When an existing event image is replaced, the previous image is removed
according to the backend file-storage implementation.

------------------------------------------------------------------------

# 20. Development Commands

## Frontend

``` bash
npm run dev
npm run build
npm start
```

## Backend

``` bash
npm run dev
npm run build
npm start
```

------------------------------------------------------------------------

# 21. Production Deployment

The current deployment uses:

-   **Frontend:** Netlify
-   **Backend:** Render
-   **Database:** MongoDB / MongoDB Atlas

Production URLs:

``` text
Frontend:
https://salimadtric.netlify.app/

Backend:
https://adtric-assignment.onrender.com
```

Before deploying, make sure the frontend API URL points to the
production backend:

``` env
NEXT_PUBLIC_API_URL=https://adtric-assignment.onrender.com
```

And configure the backend CORS origin for the deployed frontend:

``` env
CORS_ORIGIN=https://salimadtric.netlify.app
```

Also ensure production secrets such as `JWT_SECRET`, `MONGO_URI`, and
`WEBHOOK_URL` are configured securely in the deployment platform rather
than committed to Git.

------------------------------------------------------------------------

# 22. Notes

-   The default admin credentials are included for development/testing
    purposes.
-   Do not commit `.env` files or production secrets to the repository.
-   Use `.env.example` to document required environment variables.
-   MongoDB must be accessible from the backend deployment environment.
-   The backend must allow requests from the frontend production origin
    through its CORS configuration.
