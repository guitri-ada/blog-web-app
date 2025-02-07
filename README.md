# blog-web-app

## Outline
1. [Team Contributions](#team-contributions)
2. [Setup Instructions](#setup-instructions)
3. [Features](#features)
4. [Challenges and Solutions](#challenges-and-solutions)
5. [Evidence](#evidence)
   - [Feature Implementation Evidence](#1-feature-implementation-evidence)
   - [Testing Evidence](#2-testing-evidence)
   - [Security Enhancements Evidence](#3-security-enhancements-evidence)
   - [Code Quality and Refactoring Evidence](#4-code-quality-and-refactoring-evidence)
   - [CI/CD and Git Practices Evidence](#5-cicd-and-git-practices-evidence)

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
- Implemented in [routes/authRoute.js](routes/authRoute.js) for handling user registration and login.  
- Password hashing and user validation are managed in [models/User.js](models/User.js), ensuring secure credential storage.

**Access Control:**  
- Editing and deleting blog posts are restricted to their respective authors.  
- Implemented in [routes/blogPostRoute.js](routes/blogPostRoute.js), which verifies the user's identity before allowing modifications.  
- The frontend ([frontend/src/pages/BlogPosts.jsx](frontend/src/pages/BlogPosts.jsx)) enforces UI restrictions by showing editing options only to the post author.

**User Profiles:**  
- Users can create, edit, delete, and view their profile details.  
- Profile management operations are handled in [routes/userProfilesRoute.js](routes/userProfilesRoute.js) and integrated with frontend pages such as [frontend/src/pages/UserProfile.jsx](frontend/src/pages/UserProfile.jsx) and [frontend/src/pages/CreateProfile.jsx](frontend/src/pages/CreateProfile.jsx).  
- Security is enhanced with CSRF protection and input sanitization throughout the profile management workflow.

**Blog Post Management:**  
- Blog posts can be created, updated, deleted, and fetched effectively.  
- Implemented in [routes/blogPostRoute.js](routes/blogPostRoute.js) and rendered in the frontend via [frontend/src/pages/BlogPosts.jsx](frontend/src/pages/BlogPosts.jsx).  

**Security Enhancements**  
- **Password Hashing:** Store passwords securely using bcrypt.  
  Implemented in [models/User.js](models/User.js).  
- **CSRF Protection:** Implemented using the csurf middleware in Express.  
  Evidence available in [server.js](server.js).  
- **Input Sanitization:** Validate and sanitize user inputs to prevent SQL injection and XSS attacks.  
  Implemented consistently across the application. See [frontend/src/pages/CreateProfile.jsx](frontend/src/pages/CreateProfile.jsx) and [routes/authRoute.js](routes/authRoute.js).


## Challenges and Solutions:

- **CSRF Integration:**  
  - *Challenge:* Implementing CSRF protection using middleware.  
  - *Solution:* Utilized the csurf middleware in Express with proper cookie parsing, and exposed a CSRF token endpoint in [server.js](server.js) to integrate seamlessly with frontend requests.  
  
- **Input Validation and Sanitization:**  
  - *Challenge:* Preventing XSS and SQL injection attacks.  
  - *Solution:* Leveraged express-validator in backend routes (e.g., [routes/authRoute.js](routes/authRoute.js)) and integrated DOMPurify in frontend components (e.g., [frontend/src/pages/CreateProfile.jsx](frontend/src/pages/CreateProfile.jsx)) for consistent input sanitization.  
  
- **Database Setup and Connectivity:**  
  - *Challenge:* Establishing a reliable connection to the MongoDB database and handling connection errors.  
  - *Solution:* Configured the database connection in [server.js](server.js) with error handling and logging mechanisms, ensuring robust connection pooling and reconnection strategies.  
  
- **CI/CD Integration:**  
  - *Challenge:* Automating tests, linting, and deployments in a consistent manner across environments.  
  - *Solution:* Implemented GitHub Actions workflows in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) to automate these processes, ensuring that every commit triggers a suite of tests and code quality checks.  
  
- **Dependency and Environment Management:**  
  - *Challenge:* Maintaining consistent dependency versions and environment configurations across development and production.  
  - *Solution:* Leveraged a centralized [package.json](package.json) and environment configuration files (e.g, .env) to manage dependencies and configuration variables.  

- **Refactoring and Code Quality:**  
  - *Challenge:* Continuously refactoring code while ensuring no regressions.  
  - *Solution:* Adopted best practices enforced by ESLint (see [frontend/eslint.config.js](frontend/eslint.config.js)) and maintained a rigorous code review process documented in commit histories and pull requests.

## Evidence:

### 1. Feature Implementation Evidence

- **Implementation References:**  
  - **User Authentication Flows:** 
    - **Login and Registration:** Implemented in [routes/authRoute.js](routes/authRoute.js) for handling user registration and login. The backend uses bcrypt for password hashing and JWT for session management, ensuring secure credential storage. The frontend components for login and registration are [LoginForm.jsx](../frontend/src/components/LoginForm.jsx) and [RegisterForm.jsx](../frontend/src/components/RegisterForm.jsx), which handle user input and form submission. User inputs are sanitized thoroughly, and invalid input (e.g invalid credentials) is gracefully handled with user-friendly feedback.
    - **Context Management:** The authentication state is managed using React Context in [AuthContext.jsx](../frontend/src/contexts/AuthContext.jsx), providing a global state for user authentication status and profile information.
    - **Protected Routes:** Routes that require authentication are protected using a custom component [ProtectedRoute.jsx](../frontend/src/components/ProtectedRoute.jsx), which checks the user's authentication status before rendering the protected component.

  - **Security Enhancements:**
    - **Password Hashing:** Passwords are securely stored using bcrypt, implemented in [models/User.js](../models/User.js).
    - **CSRF Protection:** Implemented using the csurf middleware in Express, with evidence available in [server.js](../server.js). CSRF tokens are included in requests to protect against cross-site request forgery attacks.
    - **Input Sanitization:** User inputs are validated and sanitized to prevent SQL injection and XSS attacks. This is consistently implemented across the application, as seen in [authRoute.js](../routes/authRoute.js) and [CreateProfile.jsx](../frontend/src/pages/CreateProfile.jsx).

  - **Authorization:**
    - **JWT-Based Sessions:** User sessions are managed using JWT, ensuring secure and stateless authentication. The tokens are generated and verified in [authRoute.js](../routes/authRoute.js).
    - **Role-Based Access Control:** Certain actions, such as editing or deleting blog posts, are restricted to authorized users. This is enforced in the backend routes and reflected in the frontend UI.

  - **Blog Posts Management:**
    - **CRUD Operations:** Implemented in [routes/blogPostRoute.js](../routes/blogPostRoute.js) for creating, reading, updating, and deleting blog posts. The frontend components [BlogPostCard.jsx](../frontend/src/components/BlogPostCard.jsx) and [BlogPostList.jsx](../frontend/src/components/BlogPostList.jsx) handle the display and interaction with blog posts.
    - **Hooks and State Management:** Custom hooks like [useBlogPosts.jsx](../frontend/src/hooks/useBlogPosts.jsx) are used to fetch and manage the state of blog posts, ensuring a clean and modular approach to state management.
    - **Access Control:** Editing and deleting blog posts are restricted to their respective authors, enforced in the backend routes and reflected in the frontend UI.

  - **User Profile Management:**
    - **Profile Operations:** Users can create, edit, delete, and view their profile details. These operations are handled in [routes/userProfilesRoute.js](../routes/userProfilesRoute.js) and integrated with frontend pages such as [UserProfile.jsx](../frontend/src/pages/UserProfile.jsx) and [CreateProfile.jsx](../frontend/src/pages/CreateProfile.jsx).
    - **Form Handling and Validation:** The frontend components use form handling and validation techniques to ensure data integrity. For example, [CreateProfile.jsx](../frontend/src/pages/CreateProfile.jsx) uses DOMPurify to sanitize user inputs before sending them to the backend.


- **Screenshots:**
  - Below are screenshots of the application features:

  Registration Page
  ![Registration Page](frontend/src/images/registrationPage.jpg)
  Login Page
  ![Login Page](frontend/src/images/login.jpg)
  Blog Posts Page
  ![Blog Posts Management](frontend/src/images/blogpostsPage.jpg)
  User Profile Page
  ![User Profile Management](frontend/src/images/profilePage.jpg)

  The features are fully demonstrated in our walkthrough video.

### 2. Testing Evidence
- Unit and integration tests cover key functionalities using Jest and Testing Library. Testing approaches include TDD and handling edge cases.
- **Testing Approach:**
  - **Unit Tests:** Focus on individual components and functions to ensure they work as expected in isolation. Examples include [`frontend/src/components/BlogPostCard.test.jsx`](../frontend/src/components/BlogPostCard.test.jsx) and [`tests/user.test.js`](../tests/user.test.js).
  - **Integration Tests:** Verify that different parts of the application work together correctly. Examples include [`tests/authRoute.test.js`](../tests/authRoute.test.js) and [`tests/routes/userProfilesRoute.test.js`](../tests/routes/userProfilesRoute.test.js).
  - **Test-Driven Development (TDD):** Applied by writing tests before implementing the corresponding functionality. This approach was used extensively in developing user authentication and profile management features.
  - **Behavior-Driven Development (BDD):** Utilized to ensure that the application behaves as expected from the user's perspective. This is reflected in tests for user interactions, such as form submissions and navigation, found in files like [`frontend/src/components/LoginForm.test.jsx`](../frontend/src/components/LoginForm.test.jsx) and [`frontend/src/components/RegisterForm.test.jsx`](../frontend/src/components/RegisterForm.test.jsx).

- **Implementation References:**  
  - Backend tests: [`tests/authenticate.test.js`](tests/authenticate.test.js), [`tests/authRoute.test.js`](tests/authRoute.test.js), [`tests/routes/userProfilesRoute.test.js`](tests/routes/userProfilesRoute.test.js), [`tests/server.test.js`](tests/server.test.js), [`tests/user.test.js`](tests/user.test.js)
  - Frontend tests: [`frontend/src/components/BlogPostCard.test.jsx`](frontend/src/components/BlogPostCard.test.jsx), [`frontend/src/components/ConfirmDeleteDialog.test.jsx`](frontend/src/components/ConfirmDeleteDialog.test.jsx), [`frontend/src/components/CreateProfileDialog.test.jsx`](frontend/src/components/CreateProfileDialog.test.jsx), [`frontend/src/components/LoginForm.test.jsx`](frontend/src/components/LoginForm.test.jsx), [`frontend/src/components/ProfileDialogs.test.jsx`](frontend/src/components/ProfileDialogs.test.jsx), [`frontend/src/components/ProfileDisplay.test.jsx`](frontend/src/components/ProfileDisplay.test.jsx), [`frontend/src/components/ProfileForm.test.jsx`](frontend/src/components/ProfileForm.test.jsx), [`frontend/src/components/ProtectedRoute.test.jsx`](frontend/src/components/ProtectedRoute.test.jsx), [`frontend/src/components/RegisterForm.test.jsx`](frontend/src/components/RegisterForm.test.jsx), [`frontend/src/pages/CreateProfile.test.jsx`](frontend/src/pages/CreateProfile.test.jsx), [`frontend/src/pages/HomePage.test.jsx`](frontend/src/pages/HomePage.test.jsx), [`frontend/src/pages/UserProfile.test.jsx`](frontend/src/pages/UserProfile.test.jsx), [`frontend/src/pages/BlogPosts.test.jsx`](frontend/src/pages/BlogPosts.test.jsx)

- **Edge Cases and Error Conditions:**
  - Tests were designed to cover various edge cases and error conditions, such as invalid input, missing fields, and network errors. Examples include:
    - [`frontend/src/components/NewBlogPostForm.test.jsx`](../frontend/src/components/NewBlogPostForm.test.jsx) which tests form validation and error handling.
    - [`tests/authRoute.test.js`](../tests/authRoute.test.js) which includes tests for invalid login attempts and user registration errors.
   
- **Testing insights:**
  - From having comprehensive (above 80%) test coverage and taking a TDD approach, we found a number of bugs in our code which were causing our tests to fail and were able to rectify them accordingly. This was crucial in maintaining the expected and flawless functionality of our application.

- **Screenshot of Test Coverage:**
  - Below is a screenshot of our overall test coverage.
  - **Overall test line coverage: 82.9%** - which is within the distinction grade band criteria
  ![Coverage Report](frontend/src/images/testCoverage.jpg)


### 3. Security Enhancements Evidence
- Security is ensured through various measures including password hashing, CSRF protection, and input sanitization.
- **Description:**
  - **Password Hashing:** Passwords are securely stored using bcrypt, which hashes passwords before storing them in the database. This ensures that even if the database is compromised, the passwords remain secure. The implementation can be found in [models/User.js](models/User.js).
  - **CSRF Protection:** Cross-Site Request Forgery (CSRF) protection is implemented using the csurf middleware in Express. This middleware generates CSRF tokens that are included in requests to protect against CSRF attacks. The CSRF protection is configured in [server.js](server.js) and used in various routes such as [routes/authRoute.js](routes/authRoute.js), [routes/userProfilesRoute.js](routes/userProfilesRoute.js), and [routes/blogPostRoute.js](routes/blogPostRoute.js).
  - **Input Sanitization:** User inputs are validated and sanitized to prevent SQL injection and XSS attacks. This is consistently implemented across the application using express-validator in backend routes and DOMPurify in frontend components. Examples include [routes/authRoute.js](routes/authRoute.js), [frontend/src/pages/CreateProfile.jsx](frontend/src/pages/CreateProfile.jsx), and [frontend/src/components/NewBlogPostForm.jsx](frontend/src/components/NewBlogPostForm.jsx).
  - **JWT-Based Sessions:** User sessions are managed using JSON Web Tokens (JWT), ensuring secure and stateless authentication. The tokens are generated and verified in [routes/authRoute.js](routes/authRoute.js).
  - **Role-Based Access Control:** Certain actions, such as editing or deleting blog posts, are restricted to authorized users. This is enforced in the backend routes and reflected in the frontend UI.

- **Security Risk Mitigation**

| Security Risk                         | Mitigation Strategy                                            |
|---------------------------------------|----------------------------------------------------------      |
| **Database breach**                   | Password hashing using **bcrypt** to secure credentials.       |
| **Cross-Site Request Forgery (CSRF)** | Implemented **CSRF protection** via middleware using csurf.    |
| **SQL Injection**                     | Input validation and **sanitization** using express-validator. |
| **XSS (Cross-Site Scripting)**        | Used **DOMPurify** to sanitize user inputs before rendering. |
| **Unauthorized Access**               | **Role-based access control (RBAC)** implemented in routes. |
| **Sensitive Data Exposure**           | Used **environment variables (.env)** to store secrets securely. |



- **Implementation References:**  
  - Password hashing: [models/User.js](models/User.js)  
  - CSRF protection: Implemented in [server.js](server.js) and used in routes (e.g., [routes/authRoute.js](routes/authRoute.js), [routes/userProfilesRoute.js](routes/userProfilesRoute.js), [routes/blogPostRoute.js](routes/blogPostRoute.js))  
  - Input validation/sanitization: [routes/authRoute.js](routes/authRoute.js), [frontend/src/pages/CreateProfile.jsx](frontend/src/pages/CreateProfile.jsx), [frontend/src/pages/UserProfile.jsx](frontend/src/pages/UserProfile.jsx), [frontend/src/pages/BlogPostForm.jsx](frontend/src/pages/BlogPostForm.jsx), [frontend/src/components/NewBlogPostForm.jsx](frontend/src/components/NewBlogPostForm.jsx)

### 4. Code Quality and Refactoring Evidence
The codebase is modularized following best practices and adheres to ESLint standards. Refactoring improved readability and maintainability.
- **Description:**
  - **Modularization:** The codebase is organized into modular components, hooks, pages, and contexts to ensure a clean and maintainable structure. This modular approach allows for easier testing, debugging, and future enhancements. Examples include:
    - **Components:** Reusable UI components are located in the [frontend/src/components/](frontend/src/components/) directory. Examples include [BlogPostCard.jsx](frontend/src/components/BlogPostCard.jsx) and [NewBlogPostForm.jsx](frontend/src/components/NewBlogPostForm.jsx).
    - **Hooks:** Custom hooks for managing state and side effects are located in the [frontend/src/hooks/](frontend/src/hooks/) directory. Examples include [useBlogPosts.jsx](frontend/src/hooks/useBlogPosts.jsx) and [useAuth.jsx](frontend/src/hooks/useAuth.jsx).
    - **Pages:** Page components that represent different views of the application are located in the [frontend/src/pages/](frontend/src/pages/) directory. Examples include [BlogPosts.jsx](frontend/src/pages/BlogPosts.jsx) and [UserProfile.jsx](frontend/src/pages/UserProfile.jsx).
    - **Contexts:** Context providers for managing global state are located in the [frontend/src/contexts/](frontend/src/contexts/) directory. Examples include [AuthContext.jsx](frontend/src/contexts/AuthContext.jsx) and [ThemeContext.jsx](frontend/src/contexts/ThemeContext.jsx).

  - **Linting and Code Quality:** The project uses ESLint to enforce coding standards and maintain code quality. The linting configuration files are located in both the frontend and backend directories:
    - **Frontend:** The ESLint configuration for the frontend is defined in [frontend/eslint.config.js](frontend/eslint.config.js).
    - **Backend:** The ESLint configuration for the backend is defined in [eslint.config.cjs](eslint.config.cjs).
    - **Commit Logs:** Adherence to linting standards and code quality is observed in the commit logs, where code reviews and automated linting checks ensure that the codebase remains clean and maintainable.

  - **Refactoring:** Continuous refactoring efforts have been made to improve code readability, maintainability, and performance. This includes:
    - **Code Reviews:** A rigorous code review process is documented in commit histories and pull requests. Each pull request undergoes thorough review to ensure adherence to best practices and coding standards.
    - **Best Practices:** Adoption of best practices such as DRY (Don't Repeat Yourself) and modular design patterns. This ensures that the codebase is easy to understand, extend, and maintain.
    - **Documentation:** Comprehensive documentation of code, including inline comments and README updates, to provide clear guidance on the functionality and usage of different components and modules.
    - **Before/After:** Before refactoring many files were "loose" in our root folder and not modularized. Our backend tests were also loosely unmodularized in a "tests" folder, which have now been modularized into their respective packages.

- **Implementation References:**  
  - Modular components: [frontend/src/components/](frontend/src/components/), [frontend/src/hooks/](frontend/src/hooks/), [frontend/src/pages/](frontend/src/pages/), [frontend/src/contexts/](frontend/src/contexts/)
  - Linting configuration: [frontend/eslint.config.js](frontend/eslint.config.js), [eslint.config.cjs](eslint.config.cjs) and adherence observed in commit logs.

### 5. CI/CD and Git Practices Evidence
- **Description:** CI/CD workflows are configured via GitHub Actions to automate tests and code quality checks. Git practices demonstrate collaboration via branching and pull requests.
  - **CI/CD Configuration:** The CI/CD pipeline is set up using GitHub Actions to ensure continuous integration and continuous deployment. This includes:
    - **Automated Testing:** Every commit triggers a suite of tests to ensure that new changes do not break existing functionality. The configuration for this can be found in [/.github/workflows/ci.yml](.github/workflows/ci.yml).
    - **Linting and Code Quality Checks:** Automated linting checks are performed to enforce coding standards and maintain code quality. This is also configured in [/.github/workflows/ci.yml](.github/workflows/ci.yml).
   
  - **Git Practices:** The project follows best practices for version control and collaboration using Git. This includes:
    - **Branching Strategy:** A clear branching strategy is followed to manage feature development, bug fixes, and releases. The main branches include `main` for production-ready code, and feature branches for individual features or bug fixes.
    - **Pull Requests:** All changes are made through pull requests, which are reviewed by team members before being merged. This ensures that code quality is maintained and that multiple perspectives are considered. 
    - **Commit History:** The commit history provides a detailed log of changes made to the codebase, including the rationale behind each change. This helps in tracking the evolution of the project and understanding the context of each change.

  - **Code Reviews:** A rigorous code review process is in place to ensure that all changes are thoroughly reviewed before being merged. This process includes:
    - **Automated Checks:** Automated checks for tests, linting, and code quality are run on every pull request.
    - **Peer Reviews:** Team members review each pull request, providing feedback and suggestions for improvement. This collaborative approach helps in maintaining high code quality and catching potential issues early.
   
- **Impact of CI/CD pipeline:**
  - Through having indutry-standard CI pipeline steps automatically run after each push/pull-request, we were able to identify countless design-flaws, bad practices and bugs that were causing our pieline steps to fail. This allowed us to refactor our code to ensure best-practices and industry standards are met, ensuring no bugs are able to be pushed to our repo.
  - Every pull request triggers automated tests and linting checks, ensuring only high-quality code is merged. This reduces production bugs and enforces code consistency.

- **CI Flow Diagram upon push:**

 ![image](https://github.com/user-attachments/assets/ddabf30c-975c-4ac6-8f7a-888b2c6e6a5c)

 
- **Git Workflow Table:**

| Best Practice          | Implementation Details |
|------------------------|-------------------------------------------------------------|
| **Feature Branching**  | New features are developed in separate branches (e.g., `feature/auth`). |
| **Commit Messages**    | Descriptive commit messages following conventional commits (e.g., `fix: resolve login issue`). |
| **Pull Request Reviews** | Code is reviewed via pull requests before merging into `main`. |
| **GitHub Actions**     | Automates **testing, linting, and deployment** for every PR. |
| **Branch Protection**  | Main branch is protected—requires **approval** before merging. |


- **Implementation References:**  
  - CI/CD configuration: [/.github/workflows/ci.yml](.github/workflows/ci.yml)
  - Git commit history and branching strategy: Refer to repository commit logs and pull request descriptions. Evidence of branching strategy can be seen in the branches and closed pull request sections of the repository.
