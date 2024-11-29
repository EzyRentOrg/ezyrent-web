# EzyRent Web

Welcome to the **EzyRent Web** repository! This project is the web version of EzyRent, developed using **Next.js**, **TailwindCSS**, and **TypeScript** for a modern, responsive, and scalable application. The repository follows a structured branching model with `main`, `develop`, and `staging` branches for effective development and deployment.

---

## Branch Overview

### 1. **Main**
- The production-ready branch.
- **Direct pushes are not allowed.** All changes must be merged via Pull Requests (PRs) from `staging`.

### 2. **Develop**
- The branch for active development and feature implementation.
- Developers should create feature or bugfix branches from `develop` and merge them back after testing.

### 3. **Staging**
- A pre-production branch used for integration testing and QA.
- Changes from `develop` are merged here for further testing before deployment to production.

---

## Getting Started

### Prerequisites

- **Node.js** (latest LTS version recommended)
- A package manager: `npm`
- A code editor, preferably **VS Code**
- Ensure `npm` is installed for managing dependencies.

---

### Steps to Set Up the Project Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ezyrent-web.git
   cd ezyrent-web
   ```

2. **Select the Appropriate Branch**:
   - For active development:
     ```bash
     git checkout develop
     ```
   - For testing in a staging environment:
     ```bash
     git checkout staging
     ```
   - For production-ready code:
     ```bash
     git checkout main
     ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:
   - Create an `.env.local` file in the root directory.
   - Populate it with necessary keys such as API endpoints and secrets. Refer to `.env.example` for guidance.

5. **Run the Development Server**:
   - Start the server:
     ```bash
     npm run dev
     ```
   - Access the application at `http://localhost:3000` (or the port specified in your `.env.local` file).

---

## Workflow Guidelines

### Feature Development

1. **Create a New Branch**:
   - Branch off from `develop` for your feature or bug fix:
     ```bash
     git checkout develop
     git pull
     git checkout -b feature/your-feature-name
     ```

2. **Develop and Test**:
   - Implement your changes.
   - Run the development server to verify the application:
     ```bash
     npm run dev
     ```
   - Test your feature thoroughly.

3. **Push Changes**:
   ```bash
   git add .
   git commit -m "Add: Description of your changes"
   git push origin feature/your-feature-name
   ```

4. **Submit a Pull Request**:
   - Open a PR to merge your branch into `develop`.
   - Include a detailed description and testing instructions.

---

### Testing and Deployment

1. **Merge to Staging**:
   - After all features and fixes are tested in `develop`, create a PR to merge `develop` into `staging`.
   - Perform broader testing in the staging environment.

2. **Merge to Main**:
   - Once QA is complete and all features are approved in `staging`, create a PR to merge `staging` into `main`.
   - Deploy the `main` branch to production.

---

## Key Commands

### Start the Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Lint and Format Code
```bash
npm run lint
```

---

## Contribution Guidelines

- Follow branch naming conventions: `feature/`, `bugfix/`, `hotfix/`.
- Always pull the latest changes before starting work:
  ```bash
  git pull origin develop
  ```
- Write clear and descriptive commit messages.
- Test your code locally before submitting a PR.

---

## Contact

For issues or inquiries:
- Email: support@ezyrent.com
- Slack: [EzyRent Dev Team](ezyrentteam.slack.com)

Happy coding! 🚀
