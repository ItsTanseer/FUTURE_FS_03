# Amazon Prime Video Clone

This project is a front-end clone of the Amazon Prime Video website, built using Next.js and Tailwind CSS. It aims to replicate the look and feel of the popular streaming platform with a modern and responsive user interface.

## Features

*   **Movie and TV Show Listings:** Displays a grid of movies and TV shows fetched from the OMDb API.
*   **Search Functionality:** Allows users to search for movies and TV shows using the OMDb API.
*   **Movie Details Modal:** Clicking on a movie card opens a modal displaying detailed information about the movie, including:
    *   Movie Poster
    *   Title
    *   Rating (displayed with stars)
    *   Cast
    *   Reviews (if available from the API)
*   **Hover Animations:** Interactive hover effects on movie cards for a more engaging user experience.
*   **Responsive Design:** Built with Tailwind CSS to ensure the layout adapts to different screen sizes.

## Technologies Used

*   **Next.js:** React framework for server-side rendering and static site generation.
*   **Tailwind CSS:** Utility-first CSS framework for rapid styling.
*   **React:** JavaScript library for building user interfaces.
*   **OMDb API:** External API used to fetch movie and TV show data.

## Getting Started

**Prerequisites:**

*   Node.js installed on your machine.
*   An API key from the OMDb API (you can get one [here](http://www.omdbapi.com/apikey.aspx)).

**Installation:**

1.  Clone the repository:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
