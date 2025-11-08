This project was developed with assistance from AI tools as allowed in the project guidelines. The prompts listed below summarize how AI was used during development.

# AI-Assisted Development Log

This file documents how AI tools were used to assist in the development of the Anime Explorer project, as per the project requirements. The prompts are generalized to reflect the problem-solving process.

---

### 1. Initial Project Setup & Conversion from Next.js to Vite

**Context:** The initial version of the project was based on Next.js, but the project requirements specified a Single Page Application (SPA) using Vite and `react-router-dom`. I needed to refactor the entire project structure.

**Prompts Used:**

- "How do I convert a Next.js 14 App Router project into a standard React SPA using Vite? List the key steps."
- "Show me a standard `vite.config.ts` file for a React and TypeScript project that includes path aliases."
- "Provide a basic `index.html` file for a Vite React app."
- "How do I set up `react-router-dom` for a two-page app (a main search page and a dynamic detail page) in a `main.tsx` file?"
- "The Vite dev server needs to run on port 4000. How do I configure that in `vite.config.ts`?"

---

### 2. State Management and API Integration

**Context:** I needed to set up Redux Toolkit for state management and handle API calls to the Jikan API, including debouncing and request cancellation.

**Prompts Used:**

- "Generate TypeScript interfaces based on this JSON response from the Jikan API."
- "Create a Redux Toolkit slice (`createSlice`) for managing anime search results. The state should include `animes`, `pagination`, `status` ('idle', 'loading', 'succeeded', 'failed'), `error`, `query`, and `currentPage`."
- "Show me how to use `createAsyncThunk` to fetch data from the Jikan API. It needs to handle success, pending, and rejected states."
- "How do I implement a 250ms debounce for a search input in a React component using `useEffect` and `setTimeout`?"
- "How can I cancel a pending `fetch` request initiated by a Redux thunk when the user types a new search query? Show me how to use an `AbortController` and pass the signal to the thunk."

---

### 3. Component Creation and UI Styling

**Context:** Building the user interface with shadcn/ui components and ensuring it was responsive and visually appealing.

**Prompts Used:**

- "Give me an example of a responsive grid layout using Tailwind CSS for a list of cards."
- "How do I create a skeleton loader component that mimics the layout of my `AnimeCard` component?"
- "Show me how to display a 'No Results' or 'Empty State' message in the center of the page when the anime list is empty."
- "I'm using `react-router-dom`. How do I navigate to a detail page when a card is clicked, passing the anime ID in the URL?"
- "What's the best way to handle API errors in the UI? I want to show a toast notification when a fetch fails."

---

### 4. Debugging and Configuration Issues

**Context:** After converting to Vite, the development server failed to start due to environment-specific command-line flags.

**Prompts Used:**

- "My Vite server is failing with the error `CACError: Unknown option '--hostname'`. The dev script is `vite --port 9002 --hostname 0.0.0.0`. How do I fix this?"
- "The `--hostname` flag is being passed automatically by the environment and I can't remove it. Is there a way to make Vite ignore unknown flags or another way to work around this?"
- "Could I create a wrapper script in Node.js to intercept the command-line arguments, replace `--hostname` with `--host`, and then execute the Vite command with the corrected arguments?"
- "Write a simple Node.js module (`.mjs`) that parses `process.argv`, finds and replaces '--hostname' with '--host', and then uses `execa` or `child_process` to run Vite with the new arguments."


No code was copied directly from AI responses without review. All final implementation decisions were made by me.
