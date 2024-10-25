
# Blog App with React & Appwrite

Welcome to the **Blog App** project! This is a full-featured blogging platform built with modern technologies like **React** for the frontend and **Appwrite** for the backend. The application allows users to create, edit, and manage blog posts, along with handling user authentication and rich text editing.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Serverless Backend**: Powered by Appwrite for user authentication, database management, and file storage.
- **Rich Text Editor**: Integrated **TinyMCE** for creating and editing blog posts with a user-friendly rich text editor.
- **State Management**: Efficient global state management using **Redux Toolkit**.
- **Form Handling**: Form validation and management using **React Hook Form**.
- **Responsive Design**: Mobile-first, responsive layout ensuring an optimal experience across devices.
- **Scalable and Maintainable**: Clean and modular code architecture.

---

## Technologies

This project leverages the following technologies and tools:

- **React**: A JavaScript library for building user interfaces.
- **Appwrite**: An open-source serverless backend platform for managing authentication, databases, and file storage.
- **Redux Toolkit**: Simplified state management for predictable state and actions.
- **React Hook Form**: Provides flexible form validation and submission handling.
- **TinyMCE**: A rich text editor for creating and formatting blog posts.
- **Tailwind CSS**: A utility-first CSS framework for quickly styling the components.
- **Node.js**: Runtime environment for development.
- **Appwrite SDK**: For connecting to Appwrite's backend services.

---

## Getting Started

To get a local copy of the project up and running, follow these simple steps:

### Prerequisites

You’ll need the following tools to run the project:

- Node.js (v14 or higher)
- NPM (or Yarn)
- Appwrite backend instance

### Installation

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/your-username/blog-app.git
   cd blog-app
   ```

2. **Install dependencies**:  
   ```bash
   npm install
   ```

3. **Configure Appwrite**:  
   Create a `.env` file in the root directory and add your Appwrite project details:

   ```bash
   VITE_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
   VITE_APPWRITE_PROJECT_ID=your-project-id
   VITE_APPWRITE_DATABASE_ID=your-database-id
   VITE_APPWRITE_BUCKET_ID=your-bucket-id
   VITE_TINY_MCE_ID=your-tiny-mce-id
   ```

4. **Run the development server**:  
   ```bash
   npm run dev
   ```

   This will start the development server on [http://localhost:5173](http://localhost:3000).

### Appwrite Setup

Make sure to set up Appwrite for user authentication and database operations. Check out the [Appwrite Documentation](https://appwrite.io/docs) for more information on creating projects, collections, and handling authentication.

---

## Usage

- **Creating Posts**: Logged-in users can create new blog posts using the rich text editor.
- **Editing Posts**: Users can edit their blog posts using the TinyMCE editor.
- **Managing State**: Redux Toolkit is used to manage the global state, including authentication status, blog posts, and more.
- **Form Validation**: React Hook Form ensures smooth and efficient form handling with validation for creating/editing posts.

---

## Project Structure

Here’s an overview of the project structure:

```
├── public
│   └── index.html
├── src
│   ├── assets          # Images, icons, etc.
│   ├── components      # Reusable components (Navbar,      Footer, etc.)
│   ├── conf      # Bussiness logic for Environment variables
│   ├── pages           # Pages (Home, Blog, Login, etc.)
│   ├── store           # Redux Toolkit slices and store setup
│   ├── appwrite        # Appwrite service for API calls
│   ├── app.css          # CSS/Tailwind classes
│   ├── App.jsx          # Main App component
│   ├── main.jsx        # Entry point of the application
└── README.md
```

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:  
   ```bash
   git commit -m 'Add feature-name'
   ```
4. Push to the branch:  
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---
<!-- 
## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

--- -->

