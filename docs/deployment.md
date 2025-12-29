# Deployment Guide

The Student Study Tool can be deployed easily to modern cloud platforms.

## Deploying to Vercel (Recommended)

Since the project is built with Next.js, Vercel is the easiest and most optimized deployment option.

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Import your project into Vercel.
3. Configure the environment variables in the Vercel dashboard (see [Getting Started](getting-started.md#environment-variables)).
4. Click **Deploy**.

## Deploying to Render

If you prefer using Render:

1. Create a new **Web Service** on Render.
2. Connect your repository.
3. Select **Next.js** as the environment.
4. Build Command: `npm run build`
5. Start Command: `npm run start`
6. Add your environment variables in the **Environment** tab.

## Database Considerations

- Ensure your MongoDB URI is accessible from your deployment environment.
- For production, use **MongoDB Atlas** for a managed, scalable database.
- Remember to whitelist the IP addresses of your deployment platform in the MongoDB Atlas security settings.

## Liveblocks Configuration

- Make sure to add your production `LIVEBLOCKS_SECRET_KEY` to your deployment environment variables.
- Configure any required webhooks in the Liveblocks dashboard if your application relies on them.
