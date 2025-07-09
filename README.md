# IEDC GEC PKD - Official Website

## 📌 Project Overview

Official website for the Innovation and Entrepreneurship Development Cell (IEDC) at Government Engineering College Palakkad. This platform showcases our events, team, and achievements while providing an admin interface for content management.

## ✨ Key Features

- **Responsive Gallery**: Interactive event gallery with category filters
- **Team Showcase**: Display of current IEDC team members
- **Event Management**: Admin panel for managing events and gallery
- **Modern UI**: Clean, accessible interface built with modern web technologies

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with Shadcn UI components
- **State Management**: React Context API
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Deployment**: Vercel
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later) or yarn
- Firebase project with Firestore database

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/AfiqIqbal/iedcskp.git
   cd iedcskp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Environment Setup**
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration:
     ```
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
     ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📝 Admin Features

### Managing Events
- Add, edit, or remove events
- Upload multiple images per event
- Categorize events (Workshop, Hackathon, Seminar, etc.)

### Team Management
- Update team member information
- Add/remove team members
- Set team member roles and positions

## 🚀 Deployment

The website is configured for automatic deployment to Vercel on push to the `master` branch.

### Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
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