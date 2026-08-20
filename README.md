# Multiverse Explorer

A lightweight Rick and Morty character explorer built with Next.js and React Query. The app lets users browse characters, search by name, apply filters, and open a detailed character page with character information and related episode references.

## Overview

This project is designed as a simple front-end data browser for the public Rick and Morty API. The focus is on fast iteration, straightforward routing, responsive UI behavior, and a clean separation between UI, hooks, and service logic.

Users can:

* Browse Rick and Morty characters.
* Search characters by name.
* Apply filters such as status, gender, and species.
* Navigate through paginated results.
* Share filtered and searched views through the URL.
* Open a dedicated character details page.
* View detailed character information.
* View the episodes associated with each character.

## Tech Stack

* Next.js 16
* React 19
* TypeScript
* TanStack React Query
* Axios
* Tailwind CSS

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a local environment file

On Windows:

```bash
copy NUL .env.local
```

Then add:

```env
NEXT_PUBLIC_API_URL=https://rickandmortyapi.com/api
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Architecture Decisions

### 1. App Router over Pages Router

This project uses the Next.js App Router under `src/app`.

The main routes include:

* `/` — character listing
* `/characters/[id]` — character details

The App Router makes it easier to keep route-specific concerns close to the UI and provides a clean structure for dynamic routes such as `characters/[id]`.

### 2. Data Fetching Through a Service Layer + React Query

The app avoids scattering API logic throughout components. Instead, data access is centralized through:

* `src/api/api.ts`
* `src/services/character.service.ts`
* `src/hooks/useCharacters.ts`

React Query is used to manage loading, caching, refetching, and asynchronous request states.

This keeps UI components focused on rendering and user interaction while API-related logic remains separated and reusable.

### 3. URL-Driven Search and Filters

Search and filter state is stored in URL query parameters rather than only in local component state.

For example, a filtered or searched page can be represented by a URL such as:

```text
/?name=rick&status=alive&gender=male&page=1
```

This makes the current view directly shareable. A user can copy the URL and send it to someone else, and the recipient can open the same filtered and searched character list.

Using URL parameters also provides better browser navigation behavior because the selected filters and search state are preserved when refreshing the page or navigating with the browser's back and forward buttons.

The URL therefore acts as the source of truth for the character listing state, while the UI reads and updates those parameters as the user interacts with the filters and search field.

### 4. Debounced Search

The character search input uses debouncing to avoid sending an API request for every keystroke.

Instead of immediately updating the API query whenever the user types, the application waits for a short period after the user stops typing before updating the search parameter and triggering a new request.

For example:

```text
User types:
r → ri → ric → rick
             ↓
       wait for debounce
             ↓
      update URL/query
             ↓
       fetch characters
```

This reduces unnecessary API requests, improves the overall user experience, and prevents excessive network activity when entering longer search terms.

The debounce is particularly useful because the search value is connected to the URL and React Query, meaning every query change can potentially trigger a new data fetch.

### 5. Character Details and Episode References

The character details page fetches the selected character using its ID and displays the character's information.

The character response from the Rick and Morty API contains an `episode` array with URLs referencing the episodes in which that character appears.

The application uses these episode references to fetch the related episode data and display the episodes on the character details page.

The flow is:

1. Fetch the character by ID.
2. Read the `episode` array from the character response.
3. Extract the episode URLs.
4. Fetch the corresponding episode data.
5. Display the resulting episodes as part of the character details view.

This allows the details page to provide a richer view of the character while keeping the initial character request focused on the character resource.

### 6. Minimal Styling and Component Structure

The project keeps the UI intentionally lightweight and component-based.

The structure provides clear separation between:

* API configuration
* Service functions
* React Query hooks
* Reusable UI components
* Pages and routes
* Type definitions

This keeps the codebase easy to navigate without introducing unnecessary abstractions.

## Routing Choice

The app uses the Next.js App Router because:

* It follows the modern Next.js routing pattern.
* It supports dynamic routes such as `/characters/[id]`.
* It keeps route-specific UI and logic organized.
* It provides a clean file-based routing structure.
* It works well with URL-driven search and filter state.
* It is a good fit for a small-to-medium application where routing and page composition should remain simple and declarative.

## Trade-offs and Time Constraints

Given the available development time, the implementation intentionally stays pragmatic rather than introducing unnecessary abstractions.

* No custom global state library was introduced because React Query handles the application's main asynchronous data flow.
* The app communicates directly with the public Rick and Morty API instead of introducing a separate backend layer.
* Search and filters are URL-driven so that application state remains shareable without requiring additional global state.
* Search input is debounced to reduce unnecessary API requests while the user is typing.
* Episode data is resolved from the episode references provided by the character API response.
* Error and loading handling are intentionally simple and focused on providing a clear user experience.
* Unit tests were not included due to the limited development time. The available time was prioritized around implementing and validating the core user flows, with automated testing being a natural next step for improving reliability and maintainability.
* No authentication, server actions, or complex server-side architecture was introduced because the application is focused on browsing a public dataset.

These decisions keep the project fast to develop, easy to reason about, and appropriately scoped without over-engineering the solution.

## Project Structure

```text
src/
├── api/
├── app/
│   ├── characters/
│   │   └── [id]/
│   └── ...
├── components/
├── hooks/
├── providers/
├── services/
└── types/
```

## Notes

* The application uses the public Rick and Morty API.
* Character responses contain an `episode` array with references to episodes associated with that character.
* Episode references are used to fetch and display the corresponding episode information.
* Search requests are debounced to avoid unnecessary API calls while typing.
* Search and filter values are stored in URL query parameters, making the resulting views directly shareable.
* The external API may occasionally rate limit requests or return transient errors.
* The required environment variable must be configured before running the application locally.
* The project is intentionally optimized for clarity and maintainability rather than enterprise-scale architecture.

## Future Improvements

Potential follow-ups if the project grows:

* More advanced filter validation and UX.
* Improved loading, empty, and error states.
* A dedicated episode service with richer episode details.
* Add unit and integration test coverage for hooks, services, components, and route behavior.
* Improved caching and server-side data fetching.
* More detailed episode navigation.
* Additional character and episode interactions.
