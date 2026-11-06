# hewadilruk.github.io

Personal portfolio of Dilruk Malinga. A static site (HTML, CSS, vanilla JavaScript) for GitHub Pages. No build step.

## Structure

```text
index.html
css/style.css
js/main.js        rendering logic
js/ideas.js       your ideas (edit this)
js/projects.js    your projects (edit this)
assets/profile.png
```

## Add an idea

Open `js/ideas.js` and add an object to the `ideas` array:

```javascript
{
  id: 2,                        // unique; higher wins when dates are equal
  title: "My new idea",
  date: "2026-11-20",           // YYYY-MM-DD
  description: "One or two sentences.",
  link: ""                      // optional full URL
}
```

The site shows only the three newest ideas. When you add a fourth, the oldest one disappears from the page but stays in the file.

## Add or edit a project

Open `js/projects.js` and add an object to the `projects` array (see the field list at the top of that file). Remove `placeholder: true` for real projects. To add a project image, put a file in `assets/` and set `image` and `imageAlt`.

## Update contact links

In `index.html`, search for `TODO` and replace the LinkedIn URL and the email address (both the `href` and the visible text).

## Deploy to GitHub Pages

1. On GitHub, create a **public** repository named exactly `hewadilruk.github.io` under the `hewadilruk` account.
2. Upload every file from this folder (keeping the `css`, `js`, and `assets` folders), or push with git:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/hewadilruk/hewadilruk.github.io.git
   git push -u origin main
   ```
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait a minute or two, then visit https://hewadilruk.github.io.
6. After that, every commit to `main` updates the site.
