# IEDC Website

## Project Overview

This is the official website for IEDC (Institution's Innovation Council). The website showcases events, team members, and winners of various competitions organized by IEDC.

## Features

- **Events Section**: Display upcoming and past events
- **Team Section**: Showcase the IEDC team members
- **Winners Section**: Highlight winners of various competitions
- **Admin Dashboard**: Manage events, winners, and messages

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Shadcn UI
- **Backend**: Firebase Firestore
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Firebase project with Firestore database

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd animated-unnamed-arrival-main
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Managing Winners

The website includes a feature to showcase competition winners. Here's how to manage winners:

### Adding Winners

1. Log in to the admin dashboard
2. Navigate to the "Winners" tab
3. Click "Add Winners"
4. Select the event from the dropdown
5. Add winner details (position, name, team, prize)
6. Click "Save"

### Editing Winners

1. Find the winner entry in the Winners list
2. Click the edit (pencil) icon
3. Make your changes
4. Click "Update"

### Deleting Winners

1. Find the winner entry in the Winners list
2. Click the delete (trash) icon
3. Confirm the deletion

## Deployment

The website is configured to deploy to Vercel automatically on push to the main branch.

To deploy manually:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## Firestore Rules

Firestore security rules are defined in `firestore.rules`. The rules allow:
- Public read access to events and winners
- Admin-only write access to all collections

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/dbd34f2e-31c7-4b23-9534-a79750a0cddf) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

Upload your poster to Google Drive
Get a shareable link:
Right-click the file → Share → Anyone with the link
Copy the sharing link
Convert the sharing link to a direct image URL:
For files in "My Drive":
CopyInsert
https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
Replace YOUR_FILE_ID with the ID from your sharing link (the long string of characters between /d/ and /view)
Use the converted link in your event form