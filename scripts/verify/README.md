Offline verification harness used while authoring — NOT part of the app. It bundles the gallery with esbuild (stubbing
next/*, lucide, etc.), serves `public/` plus test-only fixture videos, and drives real Chrome with Playwright (`e2e.cjs`).
Fixtures (not shipped): `ffmpeg -f lavfi -i testsrc=size=640x360:rate=25 -f lavfi -i sine -t 3 -c:v libx264 -pix_fmt yuv420p -c:a aac test.mp4`,
a VP9/Opus `test.webm`, and 6 KB of random bytes as `broken.mp4`. `harness.css` is a tiny stand-in for Tailwind.
