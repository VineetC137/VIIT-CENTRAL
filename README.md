# VIT Buddy AI

An AI-powered chatbot assistant for Vishwakarma Institute of Technology (VIT Pune) that provides information about admissions, programs, fees, and more.

## Project Setup

### Local Development Setup

To run this project locally, you need Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd vit-buddy-ai

# Step 3: Install the necessary dependencies
npm install

# Step 4: Set up environment variables
# Copy the example env file and update with your API key
cp .env.example .env

# Step 5: Update the .env file with your Google Generative AI API key
# VITE_GOOGLE_API_KEY=your_api_key_here

# Step 6: Start the development server
npm run dev
```

### Environment Variables

This project requires a Google Generative AI API key to function properly. You need to:

1. Create a `.env` file in the root directory (copy from `.env.example`)
2. Add your Google Generative AI API key: `VITE_GOOGLE_API_KEY=your_api_key_here`

**Note:** Never commit your API keys to version control. The `.env` file is already added to `.gitignore`.

### Other Ways to Edit

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Remember to set up your environment variables in Codespaces as well.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project using various platforms:

- **Vercel**: Import your GitHub repository and deploy
- **Netlify**: Connect your repository for continuous deployment
- **GitHub Pages**: Use GitHub Actions to build and deploy

Make sure to set up your environment variables on your chosen hosting platform.
