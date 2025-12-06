# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] Created MongoDB Atlas account
- [ ] Created a free cluster (M0 tier)
- [ ] Created database user with username and password
- [ ] Added IP whitelist: `0.0.0.0/0` (Network Access)
- [ ] Got connection string from "Connect" button
- [ ] Replaced `<password>` in connection string
- [ ] Added `/devportfolio?retryWrites=true&w=majority` to connection string

**Your connection string should look like:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devportfolio?retryWrites=true&w=majority
```

### 2. Local Testing
- [ ] Created `.env.local` file with MongoDB Atlas URI
- [ ] Tested connection locally: `npm run dev`
- [ ] Verified site works at http://localhost:3000
- [ ] Ran production build: `npm run build`
- [ ] Build completed without errors

### 3. Git & GitHub
- [ ] Initialized git repository: `git init`
- [ ] Added all files: `git add .`
- [ ] Made initial commit: `git commit -m "Initial commit"`
- [ ] Created GitHub repository
- [ ] Pushed to GitHub: `git push -u origin main`

### 4. Vercel Deployment
- [ ] Signed up/logged in to Vercel
- [ ] Imported GitHub repository
- [ ] Added environment variables in Vercel:
  - [ ] `MONGODB_URI` (your full connection string)
  - [ ] `NEXTAUTH_URL` (https://your-app.vercel.app)
  - [ ] `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
  - [ ] `NODE_ENV` (set to `production`)
- [ ] Clicked "Deploy"
- [ ] Deployment succeeded

### 5. Post-Deployment
- [ ] Visited deployed URL
- [ ] Verified homepage loads
- [ ] Tested navigation to all pages
- [ ] Checked browser console for errors
- [ ] Updated `NEXTAUTH_URL` with actual Vercel URL (if needed)
- [ ] Triggered redeploy if URL was updated

## 🔧 Environment Variables Reference

### For Local Development (.env.local)
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devportfolio?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret
NODE_ENV=development
```

### For Vercel (Project Settings → Environment Variables)
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devportfolio?retryWrites=true&w=majority
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-generated-secret
NODE_ENV=production
```

## 🆘 Common Issues

### Issue: Build fails on Vercel
**Solution:** 
- Check build logs for specific errors
- Ensure all environment variables are set
- Verify `npm run build` works locally

### Issue: Can't connect to MongoDB
**Solution:**
- Verify connection string format
- Check MongoDB Atlas Network Access whitelist
- Confirm database user credentials

### Issue: Page loads but API fails
**Solution:**
- Check Vercel function logs
- Verify `MONGODB_URI` includes `/devportfolio` database name
- Ensure connection string has `?retryWrites=true&w=majority`

## 📝 Quick Commands

```bash
# Generate NEXTAUTH_SECRET (Mac/Linux)
openssl rand -base64 32

# Generate NEXTAUTH_SECRET (Windows PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Test build locally
npm run build

# Start development server
npm run dev

# Git commands
git add .
git commit -m "Your message"
git push
```

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Site loads at your Vercel URL
- ✅ All pages are accessible
- ✅ No console errors
- ✅ API endpoints respond (test with browser DevTools Network tab)
- ✅ MongoDB Atlas shows connections in Metrics tab

## 📚 Resources

- [MongoDB Atlas Tutorial](https://www.mongodb.com/docs/atlas/getting-started/)
- [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**Need help?** Check `DEPLOYMENT.md` for detailed step-by-step instructions.
