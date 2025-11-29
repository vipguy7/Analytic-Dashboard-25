# Deployment Guide

This app is deployed to Vercel. You can also deploy to other platforms like Netlify, GitHub Pages, or your own server.

## Deploy to Vercel (Recommended - Free)

### Option 1: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# For production deployment
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your GitHub repository (or upload folder)
5. Vercel will auto-detect Vite and configure build settings
6. Click "Deploy"

Your app will be live at: `https://your-project-name.vercel.app`

---

## Deploy to Netlify (Alternative)

### Option 1: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build the app
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Option 2: Netlify Drop
1. Build the app: `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder

---

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

---

## Deploy to Your Own Server

1. Build the app:
```bash
npm run build
```

2. Upload the `dist` folder to your server

3. Configure your web server (Apache/Nginx) to serve the files

### Nginx Configuration Example:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Environment Variables (for Production)

If you implement real API connections, set these environment variables in your deployment platform:

### Vercel:
- Go to Project Settings → Environment Variables
- Add variables like `VITE_GA_PROPERTY_ID`, `VITE_YOUTUBE_API_KEY`, etc.

### Netlify:
- Go to Site Settings → Environment Variables
- Add your variables

**Note:** Vite exposes env variables with `VITE_` prefix to the client. Use `import.meta.env.VITE_VARIABLE_NAME` in your code.

---

## Custom Domain

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify:
1. Go to Domain Settings → Custom Domains
2. Add domain and follow DNS setup

---

## Current Deployment Status

✅ Build configured and ready
✅ Production build tested locally
🔄 Ready for deployment to Vercel/Netlify

**Deployment URL:** Will be generated after deployment

