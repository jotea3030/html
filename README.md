```markdown
# BirdsongGame — minimal static site for Azure Static Web Apps

Overview
- Minimal static site (index.html, local_bird_data.js, main.js) that expects audio files in ./audio/.
- Optional download script bird_song_game/download_audio.sh to fetch MP3s (used in CI).

Local test
1. Create branch: git checkout -b birdsonggame/start-fresh
2. Save files from this PR into the branch (index.html, local_bird_data.js, main.js, bird_song_game/download_audio.sh, .github/workflows/azure-static-web-apps.yml)
3. Make script executable and optionally fetch audio:
   chmod +x bird_song_game/download_audio.sh
   ./bird_song_game/download_audio.sh
4. Serve locally:
   python3 -m http.server 8000
   Open http://localhost:8000/index.html

Azure deployment (Static Web Apps)
1. Push branch to GitHub:
   git add . && git commit -m "Add BirdsongGame minimal site" && git push origin birdsonggame/start-fresh
2. Create a Static Web App in Azure portal and connect to this branch.
3. When Azure creates the deployment workflow it will provide a secret AZURE_STATIC_WEB_APPS_API_TOKEN — ensure it's set in repo secrets.
4. The included workflow will run the download script on the Actions runner and then deploy the site, including audio files.

Notes
- If any audio fails to download in CI, download the missing file manually and place it under bird_song_game/audio/ before committing.
- Avoid remote cross-origin audio URLs (the whole point here is same-origin audio). Prefer committing the audio into your hosting origin or store them on your Azure storage account and point local_bird_data.js to those URLs (with CORS allowed).
```
