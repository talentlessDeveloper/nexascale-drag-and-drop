# React Drag and Drop Project

This project is inspired by Ryan Florence's implementation of drag and drop using remix-router. However, this version uses just React for the drag and drop functionality.

## Getting Started

To run the application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.

```
git clone <repository_url>
cd <project_directory>
```

3. Install dependencies.

```
npm install
```

4. Start the application.

```
npm start
```

This command will concurrently run the server and the development environment. The base URL is configured in the proxy of Vite for servers.

## Project Structure

- `src/`: Contains the source code for the React application.
  - `components/`: Contains reusable React components.
  - `context/`: Contains context for light and dark mode.
  - `routes/`: Contains pages routes and layout using `createBrowserRouter` from react-router.
  - `lib/`: Contains `utils.ts` where the utility function resides.
- `db.json`: Contains the JSON server setup for mocking the backend.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- React Router: A library for declarative routing in React applications.
- json-server: A full fake REST API for rapid prototyping.
- Vite: A fast build tool that provides a more efficient development server and build pipeline for JavaScript projects.

## Features

- Drag and drop functionality inspired by Ryan Florence's implementation using remix-router.
- Navigation using React Router.
- Data handling using loaders and fetchers.
- Backend mocking using json-server.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the [MIT License](LICENSE).
