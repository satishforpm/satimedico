PHOTOKIRA - deploy steps
1. Upload ALL files in this folder to a host root (Netlify / Vercel / Cloudflare Pages / GitHub Pages). HTTPS required for PWA.
2. Open index.html and replace every YOUR-DOMAIN.com with your real domain (needed for Facebook image preview).
3. Facebook: test and refresh at https://developers.facebook.com/tools/debug/
4. Supabase: Auth > URL Configuration > add your domain to Site URL and Redirect URLs.
5. Supabase: Auth > Email Templates: use {{ .Token }} (6 digits). Run admin-setup.sql after the admin has signed up.
