# Puzzle Game

An interactive puzzle game where you need to form sentences while uncovering an image as you progress through the levels.

## Features

- Drag-and-drop words to form sentences (@dnd-kit)
- Hints: audio, background image, translation
- Saving progress in LocalStorage (redux-persist)
- Login validation (react-hook-form + yup)
- Multiple levels and rounds
- Displaying the rating at the end of the game

## Running the Project

1. Install dependencies:

   ```bash
   npm install
2. Run in development mode:

    ```bash
    npm run dev
3. Build the project:

    ```bash
    npm run build
4. Lint the code:

    ```bash
    npm run lint

## Technologies Used
### Frontend
- React (with React Router)
- TypeScript
- SCSS (for styling)
### State Management
- Redux Toolkit, reselect (for state management)
- Redux-persist (for saving state in LocalStorage)
### Form Handling & Validation
- react-hook-form, yup (for form handling and validation)
### Build & Linting
- Vite (for building and development)
- ESLint, Prettier (for code quality checks)