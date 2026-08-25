# CampusFix

CampusFix is a campus complaint management system built with React. It allows students to raise complaints and track their status, while administrators can manage complaints, update their status, add remarks, and monitor complaint statistics.

## Features

### Student Features

- Student signup and login
- Student dashboard
- Raise a new complaint
- Select complaint category
- Select complaint priority
- Add complaint location and description
- Upload an image name with the complaint
- View all personal complaints
- Search complaints
- Filter complaints by status
- View detailed complaint information
- Track complaint status
- Receive notifications when complaints are submitted or updated
- View admin remarks

### Admin Features

- Admin signup and login
- Only one admin account allowed
- Admin dashboard
- View all student complaints
- View complaint details
- Update complaint status
- Add admin remarks
- Notify students when complaint status changes
- View recent complaints
- View complaint statistics
- Category-wise complaint analytics
- Monthly complaint analytics

## Complaint Status Flow

The complaint follows this basic flow:

Student raises complaint
↓
Complaint is saved
↓
Admin receives the complaint
↓
Admin reviews the complaint
↓
Admin updates the status
↓
Student receives notification
↓
Student can track the updated status and admin remarks

## Technologies Used

- React.js
- JavaScript
- HTML
- CSS
- React Router
- React Icons
- React Toastify
- Recharts
- LocalStorage

## Project Structure

```text
src/
│
├── assets/
├── components/
│   ├── Navbar
│   ├── Sidebar
│   ├── Topbar
│   └── ...
├── pages/
│   ├── Signup
│   ├── Login
│   ├── Student
│   ├── Admin
│   └── ...
├── App.jsx
├── main.jsx