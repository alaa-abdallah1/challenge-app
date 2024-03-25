# Task Challenge

This project is a back-office user-management system developed with React and TypeScript. It integrates with the mocked REST API _[Reqres](https://reqres.in/)_ to provide user management functionalities.

## Live Demo

[View the live demo ↗.](https://challenge-app.onrender.com)


## Features

- **User Authentication:** Allows users to register and sign in.
- **User Management Dashboard:** Admin can list, update, create, and delete users.
- **Theme Customization:** Supports dark and light themes, with persistence of the selection.
- **Testing:** Includes automated tests to ensure application functionality.

## Tools

- **React**
- **Tailwind**
- **Typescript**
- **Javascript**
- **React-dom**
- **React-dom-router**
- **Cypress**
- **Docker**

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/alaa-abdallah1/challenge-app.git
cd challenge-app
```

2. Install the dependencies:

```bash
yarn
```

## Usage

To run the application in development mode:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building

To build the application for production:

```bash
yarn build
```

## Testing

Run the following command to execute the tests:

```bash
yarn cypress:run
```

## Deployment

The project is set up to be containerized with Docker. To build and run the Docker container:

```bash

# Build your Docker image

sudo docker build -t challenge-app .

# Run your Docker container

sudo docker run -d -p 8080:80 challenge-app
```

## Contributing

Contributions are welcome. Please open an issue or submit a pull request with your changes.

## Final Remarks

This project is part of a technical challenge and follows a professional workflow with clean, readable, and performant code. It is designed to meet the requirements as set out in the provided documentation.
