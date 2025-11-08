# Anime Explorer

An application to search for anime and view details, built with React, Next.js, Redux, and TypeScript.

This project was built as a coding challenge. It utilizes the [Jikan API](https://docs.api.jikan.moe/) for anime data.

## Live Demo

[A live URL will be provided upon deployment.]

## Running the Project Locally

To run this project, you need `npm` installed.

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:4000](http://localhost:4000) in your browser.

## Core Features

- **Anime Search:** Search for anime using keywords.
- **Instant Search:** Results appear as you type, with debouncing (250ms) to optimize API calls.
- **Request Cancellation:** In-flight API requests are cancelled if a new search is typed, preventing race conditions.
- **Pagination:** Navigate through search results using server-side pagination.
- **Detailed View:** Click on any anime to see a detailed information page.
- **State Management:** Application state is managed using Redux Toolkit.

## Bonus Implementation

This project includes several bonus features to enhance the user experience and technical robustness:

- **Creative UI:** A clean, modern, and visually appealing UI designed with a consistent color palette and typography, built using shadcn/ui.
- **Skeleton Loaders:** Skeleton screens are displayed while search results are loading, providing a better loading experience than a simple spinner.
- **Empty & No Results State:** The UI provides clear messaging when there are no search results or before a search has been initiated.
- **Mobile Responsiveness:** The application is fully responsive and provides a seamless experience on both desktop and mobile devices.
- **Error Handling:** The app gracefully handles API errors (e.g., network failures, server issues) by displaying user-friendly toast notifications.