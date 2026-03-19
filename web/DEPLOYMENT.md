# Frontend Deployment Guide - Vercel/Netlify

## Step 1: Build the Frontend

```bash
cd web
npm run build
```

This creates a production build in the `build/` folder.

## Option A: Deploy to Vercel (Recommended)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
cd web
vercel --prod
```

### 4. Set Environment Variables in Vercel Console
Go to Settings → Environment Variables and add:
```
REACT_APP_API_URL=https://your-backend-api.com/api
```

### 5. Configure Custom Domain
In Vercel dashboard → Settings → Domains

---

## Option B: Deploy to Netlify

### 1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

### 2. Login and Deploy
```bash
cd web
netlify deploy --prod
```

### 3. Add Environment Variables
In Netlify Dashboard → Site Settings → Build & deploy → Environment

---

## Option C: Deploy to GitHub Pages

### 1. Add to package.json:
```json
"homepage": "https://yourusername.github.io/petsite"
```

### 2. Install gh-pages
```bash
npm install --save-dev gh-pages
```

### 3. Add deployment scripts to package.json:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

### 4. Deploy
```bash
npm run deploy
```

---

## Frontend URL After Deployment

| Platform | URL Format |
|----------|-----------|
| Vercel | https://petsite-app.vercel.app |
| Netlify | https://petsite-app.netlify.app |
| GitHub Pages | https://yourusername.github.io/petsite |

---

## Backend API Configuration

Once backend is deployed, update the API URL:

1. In Vercel/Netlify environment variables:
   ```
   REACT_APP_API_URL=https://api.petsite.com
   ```

2. Redeploy frontend to use new API URL

---

## Monitoring & Logs

### Vercel
- Dashboard: vercel.com/dashboard
- Real-time logs available

### Netlify
- Dashboard: netlify.com/sites
- Build logs and function logs

---

## Performance Tips

- Enable caching in Vercel/Netlify settings
- Use CDN for static assets
- Optimize images before deployment
- Enable GZIP compression

---

## Troubleshooting

**Build fails**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node --version`

**API calls fail**
- Verify REACT_APP_API_URL is set
- Check CORS settings on backend
- Verify backend is running

**Blank page**
- Check browser console for errors
- Verify React build completed
- Check import paths are correct

