
# Za Vecheria (За Вечеря)

"Za Vecheria"("За Вечеря") is an innovative web platform that helps you discover delicious recipes tailored to your unique tastes. By answering a few quick questions, you'll receive personalized recipe suggestions curated just for you.



## Dataset

The platform features a curated collection of over 1,400 recipes, assembled through a custom data pipeline. All recipes were programmatically scraped using Python, then meticulously sanitized and enhanced to ensure quality and uniqueness.

To further distinguish the platform, each recipe is paired with a custom image generated locally using an AI model. While the dataset is robust and diverse, ongoing improvements are made to maintain and elevate its quality.
## Features

- __Personalized Recipe Recommendations:__ Get recipe ideas that match your preferences, ingredients, and dietary requirements.
- __Interactive Onboarding:__ Answer a short series of questions to help the platform understand your tastes.
- __Modern User Experience:__ Built with Next.js and React for a fast, responsive, and visually appealing interface.
- __Localized for Bulgarian Users:__  The platform includes full Bulgarian language support.
- __Recipe Reporting System:__ Users can directly report if they spot a mistake on a recipe page,without the need to authenticate.

Whether you're looking for inspiration for tonight's dinner or want to explore new dishes, "Za Vecheria" ("За Вечеря") makes it easy and fun to find the perfect recipe.



## Recipe caching

Published recipe totals and unfiltered main listings revalidate after 60
seconds, recipe details after 5 minutes, and category listings, category data,
and difficulty levels after one hour. Free-text searches and other filter combinations are not persisted in
the server cache. Normal cache revalidation can briefly serve the previous data
while refreshing, including page bounds after publishing or deleting recipes.

Keep listing validation outside global `loading.tsx` or Suspense fallbacks:
flushing a fallback before validation would turn an out-of-range page into a
streamed HTTP 200 instead of a 404. The questionnaire keeps its scoped loader.
Primary navigation links show the existing loader in the browser while a route
is pending, without starting a server loading fallback before validation.

## Tech Stack

**Client:** React, NextJS, TailwindCSS, TypeScript, React Query

**Server:** Node, Next.js, Strapi 5

**Database:** Redis, PostgreSQL

**Dataset:** Python, Beautiful Soup



## Project Structure

- `src/app/` — Main application pages and routing.

- `src/components/` — Reusable UI components (recipe cards, modals, buttons, etc.).

- `src/services/` — Data access services (Strapi API calls, business logic).

- `src/app/api/` — Next.js API route handlers (HTTP endpoints for client-side fetch calls).

- `src/hooks/` — Custom React hooks.

- `src/lib/` — Utilities, helpers, and client configurations.

- `public/` — Static assets and images.

## Future Plans

- __User Accounts:__ Save favorite recipes and preferences.

- __Recipe Sharing:__ Allow users to submit and share their own recipes.

- __Traditional Main Page:__ Main page, where users will be able to filter,search and see all the recipes.

- __User Profile Page:__ Dashboard where users will be able to edit their profiles and send their recipes.

- __Localization:__ Add English support and translations.

- __Expand the Dataset:__ Finding and adding more recipes.


