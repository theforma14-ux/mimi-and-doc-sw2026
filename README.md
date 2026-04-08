# Mimi & Doc Southwest 2026

## How to replace your app without debugging

### Best method
1. Download the zip.
2. Unzip it on your computer.
3. Open your GitHub repo.
4. Upload the **contents inside the unzipped folder** into the root of your repo.
   - You should see files like `package.json`, `vite.config.js`, and the `src` folder at the top level.
   - Do **not** upload one parent folder that contains those files.
5. Let GitHub replace existing files.
6. Commit.
7. Wait for Vercel to redeploy.

## How to confirm the new version is live
On the home screen header, you should now see:

**SPRING REFRESH • APR 2026**

If you do **not** see that label, the old app is still deploying.

## Most important folders/files that must be replaced
- `src/`
- `public/`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `index.html`

## Cleanest fallback method
If GitHub upload feels messy:
1. Delete the old `src` folder in the repo.
2. Upload the new `src` folder from this package.
3. Replace `package.json`, `package-lock.json`, `vite.config.js`, and `index.html`.
4. Commit.

