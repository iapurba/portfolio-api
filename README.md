# Portfolio REST API

This is a RESTful API built with Nest.js, MongoDB, and TypeScript for managing portfolio-related data. The API provides CRUD (Create, Read, Update, Delete) operations for various resources including profiles, resumes, projects, contacts, and authentication.

## Features

- **Profile Service**: Manages user profiles including details like name, email, bio, etc.
  - Endpoints:
    - GET /profiles/:id: Retrieve a specific profile by ID
    - POST /profiles: Create a new profile
    - PUT /profiles/:id: Update an existing profile
    - DELETE /profiles/:id: Delete a profile

- **Resume Service**: Manages user resumes including details like education, experience, skills, etc.
  - Endpoints:
    - GET /profiles/:profileId/resumes: Retrieve a specific resume by ID
    - POST /profiles/:profileId/resumes: Create a new resume
    - PUT /profiles/:profileId/resumes: Update an existing resume
    - DELETE /profiles/:profileId/resumes: Delete a resume

- **Project Service**: Manages user projects including details like title, description, technologies used, etc.
  - Endpoints:
    - GET /profiles/:profileId/projects: Retrieve all projects
    - GET /profiles/:profileId/projects/:projectId: Retrieve a specific project by ID
    - POST /profiles/:profileId/projects: Create one or multiple new projects
    - PUT /profiles/:profileId/projects/:projectId: Update an existing project
    - DELETE /profiles/:profileId/projects/:projectId: Delete a project

- **Contact Service**: Manages user contacts including details like name, email, message, etc.
  - Endpoints:
    - POST /contacts: Create a new contact message

- **Authentication Service**: Manages user authentication including registration, login, and logout.
  - Endpoints:
    - POST /auth/signup: Register a new user
    - POST /auth/login: Authenticate user and generate access token

## Getting Started

To get started with the Portfolio REST API, follow these steps:

### 1. Clone the repository:

```bash
git clone <repository-url>
```

### 2. Install dependencies:

```bash
$ cd portfolio-api

$ yarn install
```

### 3. Set up environment variables:
- Create a `.env` file based on the provided `.env.example`.
- Modify the variables to match your environment setup.

Example `.env.development` file:

```javascript
# MONGO DB CONNECTION STRINGS
MONGO_DB_CONNECTION_STRING=your-mongodb-connection-string

# SECRET KEY
JWT_SECRET=your-secret-key

# CONTACT EMAIL & APP PASSWORD
NO_REPLY_EMAIL_ADDRESS=your-email-address
NO_REPLY_EMAIL_PASSWORD=your-email-password

# DEFAULT
NO_REPLY_EMAIL_ADDRESS_2=another-email-address
NO_REPLY_EMAIL_PASSWORD_2=another-email-password
```

### 4. Start the server:

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

**Comment:** This command starts the server, making the API accessible at `http://localhost:3001`.

### 5. The API will be accessible at `http://localhost:3001`.

## Authentication

- JWT (JSON Web Tokens) are used for authentication.
- To access protected endpoints, include the JWT token in the Authorization header of the request.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Apurba Panja](https://www.linkedin.com/in/iapurba/)

## License

Nest is [MIT licensed](LICENSE).
