## Deployment
[Link](https://wfh-tracking-system.vercel.app/)

## Getting Started

```bash
# Step 1: Place .env, .env.local, and .env.production files in the root directory if the code has been cloned from GitHub. 
# These files are available in the root directory of the submitted source code.

# Step 2: Install dependencies
npm i

# Step 3: Start development server
npm run dev
```

## Log in

All pages, except the home page, require employees to log in for access.

```bash
# Username
Enter your Staff ID (e.g. 130002)

# Password
password
```

## Unit Tests
Unit tests are performed using Jest and are located in the `__tests__` folder within the root directory.

## End-to-end Tests
End-to-end tests are performed using Cypress and are located in the `cypress` folder within the root directory.

## CI/CD Pipeline
The CI/CD pipeline checks if both unit tests and end-to-end tests pass before deploying to production on Vercel. The CI/CD pipeline script is located in the `.github/workflows/combined-CI.yml` file.
