# Developer Portfolio & Blog

A modern, full-stack portfolio and blog website built with Next.js 14, MongoDB, and a dark minimalistic theme inspired by The Verge.

## Features

- ✨ **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- 🎨 **Dark Theme**: Sleek, minimalistic design inspired by The Verge
- 📝 **Blog System**: Full CRUD functionality for blog posts with MongoDB
- 💼 **Portfolio Showcase**: Display projects with details and links
- 🔍 **SEO Optimized**: Built-in metadata and SEO best practices
- 📱 **Fully Responsive**: Mobile-first design approach
- 🚀 **API Routes**: RESTful API endpoints for content management

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js (ready for implementation)
- **Deployment**: Optimized for Vercel

## Project Structure

```
devportfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── blog/              # Blog listing and posts
│   │   ├── contact/           # Contact page
│   │   ├── projects/          # Projects showcase
│   │   ├── api/               # API routes
│   │   │   ├── blog/         # Blog CRUD endpoints
│   │   │   └── projects/     # Projects endpoints
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Footer component
│   │   └── Icons.tsx          # SVG icon components
│   ├── lib/                   # Utility libraries
│   │   └── mongodb.ts         # MongoDB connection
│   └── models/                # MongoDB models
│       ├── BlogPost.ts        # Blog post schema
│       └── Project.ts         # Project schema
├── public/                    # Static assets
├── .env.local.example        # Environment variables template
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud instance like MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd devportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Update with your MongoDB Atlas credentials:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devportfolio?retryWrites=true&w=majority
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   NODE_ENV=development
   ```
   
   **Get MongoDB Atlas URI:**
   - Login to [MongoDB Atlas](https://cloud.mongodb.com)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string and replace `<password>` with your database user password

4. **Start MongoDB** (if using local instance)
   ```bash
   mongod
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Blog Posts

- `GET /api/blog` - Get all published blog posts
- `GET /api/blog?tag=tagname` - Filter posts by tag
- `GET /api/blog/[slug]` - Get single blog post
- `POST /api/blog` - Create new blog post
- `PUT /api/blog/[slug]` - Update blog post
- `DELETE /api/blog/[slug]` - Delete blog post

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects?featured=true` - Get featured projects only
- `POST /api/projects` - Create new project

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  background: "#0a0a0a",
  foreground: "#ededed",
  primary: "#f5f5f5",
  secondary: "#6b6b6b",
  accent: "#ff006e",  // Change this for your accent color
  border: "#1a1a1a",
}
```

### Content

1. **About Page**: Edit `src/app/about/page.tsx`
2. **Projects**: Update `src/app/projects/page.tsx` or add via API
3. **Contact**: Modify `src/app/contact/page.tsx`
4. **Blog**: Add posts via API endpoints

## Deployment

### Vercel with MongoDB Atlas (Recommended)

#### 1. Set Up MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Go to **Database Access** and create a database user
4. Go to **Network Access** and add `0.0.0.0/0` to allow connections from anywhere (for Vercel)
5. Click **Connect** > **Connect your application**
6. Copy the connection string (format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
7. Replace `<password>` with your database user password
8. Add `/devportfolio?retryWrites=true&w=majority` after `.net/`

Your final connection string should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devportfolio?retryWrites=true&w=majority
```

#### 2. Deploy to Vercel

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/devportfolio.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Environment Variables**
   
   In Vercel project settings, add these environment variables:
   
   | Name | Value | Example |
   |------|-------|---------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/devportfolio?retryWrites=true&w=majority` |
   | `NEXTAUTH_URL` | Your Vercel deployment URL | `https://your-app.vercel.app` |
   | `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` | `generated-secret-string` |
   | `NODE_ENV` | `production` | `production` |

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live site!

#### 3. Automatic Deployments

After initial setup, Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

### Local Development with MongoDB Atlas

Update your `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devportfolio?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret
NODE_ENV=development
```

### Other Platforms

Build the production version:
```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## MongoDB Setup

### MongoDB Atlas (Recommended for Production)

1. **Create Free Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier (512MB storage)

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select your preferred region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and strong password
   - Set privileges to "Atlas Admin" or "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
   - Note: For production, restrict to specific IPs if possible

5. **Get Connection String**
   - Go back to "Database" view
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" driver version 4.1 or later
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `devportfolio`

### Local MongoDB (Optional)

For local development without internet:
- Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
- Use connection string: `mongodb://localhost:27017/devportfolio`

## Features to Implement

- [ ] Admin dashboard for content management
- [ ] Authentication system
- [ ] Comments system for blog posts
- [ ] Search functionality
- [ ] Newsletter subscription
- [ ] Analytics integration
- [ ] RSS feed
- [ ] Sitemap generation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own portfolio.

## Troubleshooting

### MongoDB Connection Issues

**Error: MongooseServerSelectionError**
- Check your MongoDB Atlas connection string is correct
- Verify database user password (no special characters need URL encoding)
- Ensure Network Access allows connections from 0.0.0.0/0
- Check if cluster is active (not paused)

**Error: Authentication Failed**
- Verify database username and password are correct
- Check user has proper permissions in Database Access
- Regenerate password if special characters cause issues

### Vercel Deployment Issues

**Build Fails**
- Check all environment variables are set in Vercel
- Ensure `MONGODB_URI` includes the database name
- Verify TypeScript compilation passes locally: `npm run build`

**Runtime Errors**
- Check Vercel function logs for detailed errors
- Verify MongoDB Atlas whitelist includes 0.0.0.0/0
- Ensure `NODE_ENV` is set to `production`

### Generate NEXTAUTH_SECRET

```bash
# On Mac/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

## Support

For issues or questions, please open an issue on GitHub.

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Built with ❤️ using Next.js and MongoDB
