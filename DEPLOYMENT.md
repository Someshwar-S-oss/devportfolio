# Vercel Deployment Guide

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/devportfolio)

## Prerequisites

- MongoDB Atlas account (free tier available)
- GitHub account
- Vercel account (sign up with GitHub)

## Step-by-Step Deployment

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 tier)
3. Create database user with password
4. Whitelist all IPs: `0.0.0.0/0` (Network Access)
5. Get connection string from "Connect" → "Connect your application"
6. Replace `<password>` and add database name: `/devportfolio`

**Final format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devportfolio?retryWrites=true&w=majority
```

### 2. Prepare Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio website"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/devportfolio.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

1. **Visit Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Build Settings** (Auto-detected)
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables**
   
   Click "Environment Variables" and add:

   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/devportfolio?retryWrites=true&w=majority
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
   NODE_ENV=production
   ```

   **Generate NEXTAUTH_SECRET:**
   ```bash
   # Mac/Linux
   openssl rand -base64 32

   # Windows PowerShell
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Click on deployment URL to view live site

### 4. Update NEXTAUTH_URL

After first deployment:
1. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Go to Project Settings → Environment Variables
3. Update `NEXTAUTH_URL` with your actual URL
4. Redeploy from Deployments tab

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to use custom domain

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

## Monitoring

- **Vercel Dashboard**: View deployments and logs
- **MongoDB Atlas**: Monitor database usage and performance
- **Analytics**: Enable Vercel Analytics in project settings

## Cost

- **Vercel**: Free tier (Hobby plan) - sufficient for personal sites
- **MongoDB Atlas**: Free tier (M0) - 512MB storage
- **Total**: $0/month for hobby projects

## Tips

1. **Test locally first**: Run `npm run build` before pushing
2. **Check logs**: Use Vercel dashboard for deployment logs
3. **Database backup**: Enable automatic backups in MongoDB Atlas
4. **Security**: Never commit `.env.local` to Git
5. **Performance**: Enable caching in MongoDB Atlas

## Troubleshooting

### Deployment fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### Can't connect to MongoDB
- Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Verify connection string format is correct
- Check database user credentials

### 500 Internal Server Error
- Check function logs in Vercel
- Verify MongoDB connection string
- Ensure database and collections exist

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Support](https://www.mongodb.com/cloud/atlas/support)
