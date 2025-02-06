# blog-web-app

## Team Contributions
- **Ross (33%)**: Responsible for User Authentication, including enabling user registration and login, implementing password hashing for secure storage, and applying CSRF protection and input sanitization to prevent security issues. (See [routes/authRoute.js](routes/authRoute.js) and [models/User.js](models/User.js).)
- **Guillaume (33%)**: Responsible for Blog Post Management by restricting editing and deletion to post authors, implementing blog post creation, editing, and deletion. Also implemented CI/CD pipeline. (See [routes/blogPostRoute.js](routes/blogPostRoute.js) and [frontend/src/pages/BlogPosts.jsx](frontend/src/pages/BlogPosts.jsx).)
- **Asa (33%)**: Responsible for User Profiles by enabling users to create, edit, delete, and view their profile details. Standardizing theming across the frontend. Also Implemented CSRF protection of user profile routes. (See [frontend/src/pages/UserProfile.jsx](frontend/src/pages/UserProfile.jsx) and [routes/userProfilesRoute.js](routes/userProfilesRoute.js).)

## Setup Instructions
1. **Clone the repository.**
2. **Install Dependencies:**
   - Root: Run `npm install` using the [package.json](package.json) in the root directory.
   - Frontend: Navigate to the `frontend` folder and run `npm install` ([frontend/package.json](frontend/package.json)).
3. **Running the Application:**
   - **Development Server:** Run `npm run dev` (for backend use `nodemon server.js` as defined in [package.json](package.json)).
   - **To start frontend:** CD into the frontend folder and then Run `npm run dev`.
4. **Testing:**
   - Execute tests by running `npm test`. This runs both frontend and backend tests as configured in [jest.config.js](jest.config.js).

## Features

**User Authentication:**  
- Enabled via registration and login flows with JWT-based sessions.  
- Implemented in [routes/authRoute.js](../routes/authRoute.js) for handling user registration and login.  
- Password hashing and user validation are managed in [models/User.js](../models/User.js), ensuring secure credential storage.

**Access Control:**  
- Editing and deleting blog posts are restricted to their respective authors.  
- Implemented in [routes/blogPostRoute.js](../routes/blogPostRoute.js), which verifies the user's identity before allowing modifications.  
- The frontend ([frontend/src/pages/BlogPosts.jsx](../frontend/src/pages/BlogPosts.jsx)) enforces UI restrictions by showing editing options only to the post author.

**User Profiles:**  
- Users can create, edit, delete, and view their profile details.  
- Profile management operations are handled in [routes/userProfilesRoute.js](../routes/userProfilesRoute.js) and integrated with frontend pages such as [frontend/src/pages/UserProfile.jsx](../frontend/src/pages/UserProfile.jsx) and [frontend/src/pages/CreateProfile.jsx](../frontend/src/pages/CreateProfile.jsx).  
- Security is enhanced with CSRF protection and input sanitization throughout the profile management workflow.

**Blog Post Management:**  
- Blog posts can be created, updated, deleted, and fetched effectively.  
- Implemented in [routes/blogPostRoute.js](../routes/blogPostRoute.js) and rendered in the frontend via [frontend/src/pages/BlogPosts.jsx](../frontend/src/pages/BlogPosts.jsx).  

**Security Enhancements**  
- **Password Hashing:** Store passwords securely using bcrypt.  
  Implemented in [models/User.js](../models/User.js).  
- **CSRF Protection:** Implemented using the csurf middleware in Express.  
  Evidence available in [server.js](../server.js).  
- **Input Sanitization:** Validate and sanitize user inputs to prevent SQL injection and XSS attacks.  
  Implemented consistently across the application. See [frontend/src/pages/CreateProfile.jsx](../frontend/src/pages/CreateProfile.jsx) and [routes/authRoute.js](../routes/authRoute.js).


**Challenges and Solutions:**  
- **CSRF Integration:**  
  - *Challenge:* Implementing CSRF protection using middleware.  
  - *Solution:* Utilized the csurf middleware in Express with proper cookie parsing, and exposed a CSRF token endpoint in [server.js](../server.js) to integrate seamlessly with frontend requests.  
  
- **Input Validation and Sanitization:**  
  - *Challenge:* Preventing XSS and SQL injection attacks.  
  - *Solution:* Leveraged express-validator in backend routes (e.g., [routes/authRoute.js](../routes/authRoute.js)) and integrated DOMPurify in frontend components (e.g., [frontend/src/pages/CreateProfile.jsx](../frontend/src/pages/CreateProfile.jsx)) for consistent input sanitization.  
  
- **Database Setup and Connectivity:**  
  - *Challenge:* Establishing a reliable connection to the MongoDB database and handling connection errors.  
  - *Solution:* Configured the database connection in [server.js](../server.js) with error handling and logging mechanisms, ensuring robust connection pooling and reconnection strategies.  
  
- **CI/CD Integration:**  
  - *Challenge:* Automating tests, linting, and deployments in a consistent manner across environments.  
  - *Solution:* Implemented GitHub Actions workflows in [.github/workflows/ci.yml](../.github/workflows/ci.yml) to automate these processes, ensuring that every commit triggers a suite of tests and code quality checks.  
  
- **Dependency and Environment Management:**  
  - *Challenge:* Maintaining consistent dependency versions and environment configurations across development and production.  
  - *Solution:* Leveraged a centralized [package.json](../package.json) and environment configuration files (e.g., [.env](../.env.example)) to manage dependencies and configuration variables.  

- **Refactoring and Code Quality:**  
  - *Challenge:* Continuously refactoring code while ensuring no regressions.  
  - *Solution:* Adopted best practices enforced by ESLint (see [frontend/eslint.config.js](../frontend/eslint.config.js)) and maintained a rigorous code review process documented in commit histories and pull requests.

## Evidence:

### 1. Feature Implementation Evidence
- **Implementation References:**  
  - User authentication flows: [routes/authRoute.js](../routes/authRoute.js), [models/User.js](../models/User.js)  
  - Blog posts management: [routes/blogPostRoute.js](../routes/blogPostRoute.js), [frontend/src/pages/BlogPosts.jsx](../frontend/src/pages/BlogPosts.jsx)  
  - User profile management: [frontend/src/pages/UserProfile.jsx](../frontend/src/pages/UserProfile.jsx), [routes/userProfilesRoute.js](../routes/userProfilesRoute.js)


### 2. Testing Evidence
-  Unit and integration tests cover key functionalities using Jest and Testing Library. Testing approaches include TDD and handling edge cases.
- **Implementation References:**  
  - Backend tests: [tests/**/*.test.js](../tests/)  
  - Frontend tests: Files matching `*.test.js` or `*.test.jsx` as configured in [jest.config.js](../jest.config.js)


  ### 3. Security Enhancements Evidence
- Security is ensured through password hashing, CSRF protection, and input sanitization.
- **Implementation References:**  
  - Password hashing: [models/User.js](../models/User.js)  
  - CSRF protection: Implemented in [server.js](../server.js) and used in routes (e.g., [routes/authRoute.js](../routes/authRoute.js), [routes/userProfilesRoute.js](../routes/userProfilesRoute.js))  
  - Input validation/sanitization: [routes/authRoute.js](../routes/authRoute.js), [frontend/src/pages/CreateProfile.jsx](../frontend/src/pages/CreateProfile.jsx)


  ### 4. Code Quality and Refactoring Evidence
The codebase is modularized following best practices and adheres to ESLint standards. Refactoring improved readability and maintainability.
- **Implementation References:**  
  - Modular components: [frontend/src/components/](../frontend/src/components/)  
  - Linting configuration: [frontend/eslint.config.js](../frontend/eslint.config.js) and adherence observed in commit logs.


### 5. CI/CD and Git Practices Evidence
- **Description:** CI/CD workflows are configured via GitHub Actions to automate tests and code quality checks. Git practices demonstrate collaboration via branching and pull requests.
- **Implementation References:**  
  - CI/CD configuration: [/.github/workflows/ci.yml](../.github/workflows/ci.yml)  
  - Git commit history and branching strategy: Refer to repository commit logs and pull request discussions.
