
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



## Tech Stack

**Client:** React, NextJS, TailwindCSS, TypeScript, React Query

**Server:** Node, Next.js, Strapi 5

**Database:** Redis, PostgreSQL

**Dataset:** Python, Beautiful Soup



## Project Structure

- `src/app/` — Main application pages and routing.

- `src/components/` — Reusable UI components (recipe cards, modals, buttons, etc.).

- `src/api/` — Client-side API services.

- `src/app/api/` — Serverless API endpoints for questions and reports

- `public/` — Static assets and images.

- `src/hooks` — Custom hooks

- `src/lib` — Utilities and helper functions  

## Future Plans

- __User Accounts:__ Save favorite recipes and preferences.

- __Recipe Sharing:__ Allow users to submit and share their own recipes.

- __Traditional Main Page:__ Main page, where users will be able to filter,search and see all the recipes.

- __User Profile Page:__ Dashboard where users will be able to edit their profiles and send their recipes.

- __Localization:__ Add English support and translations.

- __Expand the Dataset:__ Finding and adding more recipes.


