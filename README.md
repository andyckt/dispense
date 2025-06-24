# Halftone Waves App

A Next.js application showcasing AI-powered tablet counting for pharmacists.

## Features

- Upload images of medicine tablets
- Take photos directly with mobile device camera
- Instant tablet counting using AI vision
- Modern, responsive UI built with Next.js and Tailwind CSS

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Create a `.env.local` file in the root directory:
   ```
   # xAI API Key for tablet counting
   XAI_API_KEY=your_api_key_here
   ```

## Getting an xAI API Key

1. Sign up for an account at [x.ai](https://x.ai)
2. Navigate to the API section in your account dashboard
3. Generate a new API key
4. Copy the key and paste it into your `.env.local` file

## Running the Application

Start the application with:

```
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open your browser and go to:
```
http://localhost:3000
```

## How It Works

The tablet counting feature uses the xAI Grok vision model to analyze images and count the number of tablets present. The process works as follows:

1. User uploads an image or takes a photo
2. The image is sent to the xAI API via our secure backend
3. The AI model analyzes the image and counts the tablets
4. Results are displayed to the user

## Security Notes

- Never commit your API key to version control
- For production deployment, use proper environment variable management
- Implement user authentication for production use 