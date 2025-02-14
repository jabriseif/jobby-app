# Jobby App

## Introduction

The **Jobby App** is a modern web application designed to streamline job searching, application tracking, and employer interactions. It provides an intuitive user experience with powerful features to enhance the job-seeking process.

---

## What the App Can Do

- **Home Page**:
  - Shows a list of job postings with titles, company names, and locations.
  - Lets you search for jobs by title or company.
  - Lets you filter jobs based on category, location, and salary.

- **Job Details Page**:
  - Shows more details about a job, like salary, company profile, and job description.
  - Lets you apply for a job directly.

- **User Authentication**:
  - Secure login and registration system.
  - Uses authentication tokens to keep users logged in.

- **Application Tracking**:
  - Saves applied jobs and monitors their status.

- **Bookmarks**:
  - Allows users to save jobs for later.

- **Theme Switcher**:
  - Lets you pick light or dark mode.

- **Handles Errors**:
  - Shows error messages if the API doesn't work and lets you retry.

---

## How the Project is Organized

```
jobby-app/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── Header/
│   │   ├── JobCard/
│   │   ├── SearchBar/
│   │   ├── Filters/
│   ├── pages/
│   │   ├── Home/
│   │   ├── JobDetails/
│   │   ├── Login/
│   │   ├── Register/
│   ├── context/       # Global state management
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   ├── styles/        # Global styles and themes
│   ├── App.js         # Main app component
│   ├── index.js       # Entry point
├── package.json       # Dependencies and scripts
├── README.md          # Project documentation
```

---

## How to Install

1. Copy the project:
   ```sh
   git clone https://github.com/your-username/jobby-app.git
   ```

2. Go to the project folder:
   ```sh
   cd jobby-app
   ```

3. Install everything the app needs:
   ```sh
   npm install
   ```

4. Run the app:
   ```sh
   npm start
   ```

---

## How to Use

1. **Home Page**:
   - Type in the search bar to find a job.
   - Use filters to narrow down job listings.
   - Click "View Details" to see more about a job.

2. **Job Details Page**:
   - Check all the info about the job.
   - Click "Apply Now" to apply for the job.

3. **Authentication**:
   - Register and log in to save jobs and track applications.

4. **Theme Switcher**:
   - Click the button to change between light and dark mode.

---

## Important Files and Folders

### `App.js`
- The main file that sets up the pages and routes.
- Manages authentication and global state.

### `UsersContext.js`
- Manages user authentication and saved jobs.

### `Header`
- Contains the navigation bar, search bar, and theme switcher.

### `HomePage`
- Shows job listings and includes search and filtering.

### `JobDetails`
- Displays full info about a job and an apply button.

---

## API Information

The app gets job listings from:
```
https://api.example.com/jobs
```
- **Method**: GET
- **What You Get**: A list of job postings with details like `id`, `title`, `company`, `location`, `salary`, and `description`.

---

## Tools Used

- **React**: For building the app.
- **react-router-dom**: For moving between pages.
- **react-icons**: For adding icons.
- **styled-components**: For styling components.
- **JS-Cookie**: For managing authentication tokens.

---

## Plans for the Future

- Add job recommendations based on user preferences.
- Improve UI for mobile devices.
- Implement a chat system for job seekers and recruiters.

---



