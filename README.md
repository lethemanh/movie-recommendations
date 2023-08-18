## Getting Started

First, copy `.env.example` to `.env`.
Then run the development server:

```bash
npm run dev
# or
yarn dev
```

## Technologies & libraries

- Nextjs
- Typescript
- MUI
- Tailwind

## APIs:

The Movie Recommendations app uses API of TMDB.

## Pages:

### Register:

Due to limit of TMDB API, you have to create a new account on https://www.themoviedb.org/signup.

### Login:

- Path: http://localhost:3000/login
- Due to limit of TMDB API, user have to login via https://www.themoviedb.org/login.

### Home:

- Path: http://localhost:3000/
- This page shows the popular movies, upcoming movies and their average rating.

### Search:

- Path: http://locahost:3000/search
- This page implements searching movie names and filtering by genre.

### Movie Detail

- Path: http://localhost:3000/movies/[slug]
- This page shows movie detail and users can rate the movie.

### Rated List

- Path: http://localhost:3000/rated-list
- This page shows the user's rated list and the rating of each movie.

### For you

- Path: http://localhost:3000/for-you
- This page shows the recommended movies for the user based on the preference setting (favorite genres, favorite casts, favorite companies) and the minimum rating in the rated list that the user was rated.

### Preference

- Path: http://localhost:3000/preference
- User can set the preference setting with favorite genres, favorite casts, favorite companies. With these settings the app will recommend suitable movies for user.
