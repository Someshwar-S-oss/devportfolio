# Admin Dashboard Guide

## Accessing the Admin Panel

Simply navigate to: **http://localhost:3000/admin** (or https://your-domain.vercel.app/admin in production)

No login required - access is only by knowing the URL.

## Features

### 📝 Blog Post Management

**Create Post:**
1. Fill in Title (auto-generates slug or customize)
2. Add Slug (URL-friendly identifier)
3. Write Excerpt (short summary)
4. Write Content in Markdown format
5. Add Tags (comma-separated)
6. Check "Published" to make it live
7. Click "Create Post"

**Edit Post:**
- Click "Edit" on any post
- Modify fields
- Click "Update Post"

**Delete Post:**
- Click "Delete" on any post
- Confirm deletion

**Markdown Support:**
- Headings: `# H1`, `## H2`, `### H3`
- Bold: `**text**`
- Italic: `*text*`
- Code: `` `inline` `` or ` ```block``` `
- Lists: `- item` or `1. item`
- Links: `[text](url)`

### 💼 Project Management

**Create Project:**
1. Enter Title and Slug
2. Add Description
3. List Technologies (comma-separated)
4. Add GitHub URL (optional)
5. Add Live Demo URL (optional)
6. Add Image URL (optional)
7. Check "Featured" for homepage display
8. Set Order (lower numbers appear first)
9. Click "Create Project"

**Edit Project:**
- Click "Edit" on any project
- Modify fields
- Click "Update Project"

**Delete Project:**
- Click "Delete" on any project
- Confirm deletion

## Image URLs

For images, use:
- **Imgur**: Upload to imgur.com, copy direct link
- **Cloudinary**: Free CDN, great for portfolios
- **GitHub**: Store in repo and use raw URL
- **Unsplash**: Free stock photos with direct URLs

Example: `https://images.unsplash.com/photo-xxxxx`

## Tips

1. **Slugs must be unique** - used in URLs like `/blog/my-post-slug`
2. **Slugs are lowercase** with hyphens (e.g., "my-first-post")
3. **Draft posts** won't appear on public pages (uncheck Published)
4. **Featured projects** appear on homepage
5. **Order matters** - lower numbers appear first
6. **Tags improve discoverability** - use relevant, consistent tags

## Security Note

✅ **Password Protection Enabled**

**Setup:**
1. Open `.env.local` file
2. Set `ADMIN_PASSWORD=your-secure-password`
3. Restart dev server
4. Password is required on first visit
5. Session persists until browser close

**For production (Vercel):**
1. Add `ADMIN_PASSWORD` environment variable in Vercel
2. Use a strong, unique password
3. Never commit `.env.local` to Git
4. Change password if compromised

**Features:**
- Password prompt on first access
- Session storage (browser-only)
- Logout button (top-right)
- No cookies or server sessions

## Keyboard Shortcuts

- **Tab** - Navigate between fields
- **Ctrl/Cmd + Enter** - Submit form (in some browsers)
- **Esc** - Cancel edit mode

## Troubleshooting

**Error: "Slug already exists"**
- Choose a different slug or edit the existing post

**Changes not appearing:**
- Check if post is marked as "Published"
- Refresh the public page

**Image not loading:**
- Verify URL is direct link to image
- Check image host allows hotlinking
- Test URL in new browser tab

**Can't delete post:**
- Ensure MongoDB connection is active
- Check browser console for errors

---

**Access URL:** http://localhost:3000/admin
