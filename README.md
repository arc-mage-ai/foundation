# FeedHope Foundation — Static Site

Small static site for Arc Aleph Foundation. Shared header/footer are included client-side and require an HTTP server to work correctly (browsers block `fetch()` when opening pages via `file://`).

## Prerequisites
- Node.js & npm (optional, for `npx http-server`)
- Python 3 (optional, for `python3 -m http.server`)

## Start a local server (recommended)

Using `npx http-server` (serves on port 8080 by default):

```bash
cd /home/buck/foundation
npx http-server -p 8080
```

Using Python's built-in server (serves on port 8000 by default):

```bash
cd /home/buck/foundation
python3 -m http.server 8000
```

Open your browser at `http://localhost:8080/index.html` (or the port you chose). The header and footer are injected by `scripts/include-components.js` and will appear when served over HTTP.

## Files added/changed
- `components/header.html` — shared header fragment
- `components/footer.html` — shared footer fragment
- `scripts/include-components.js` — client-side include loader (fetches fragments and inserts them)
- `index.html`, `transparency.html` — updated to use the includes

## Quick troubleshooting
- If header/footer do not appear, confirm you opened the site via `http://` (not `file:///`).
- If port is already in use, pick another port (e.g. `-p 9000`).
- To stop a server started with `npx http-server` press `Ctrl+C` in the terminal where it's running, or kill the process by PID.

## Development tips
- For live reload while editing, consider `npx live-server` or the VS Code Live Server extension.
