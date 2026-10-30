const http = require("http"), fs = require("fs"), path = require("path");
const roots = [["/media/", "/home/claude/jahid-khan-portfolio/public"], ["/images/", "/home/claude/jahid-khan-portfolio/public"], ["/", "/tmp/harness"]];
const types = { ".js": "text/javascript", ".html": "text/html", ".webp": "image/webp", ".mp4": "video/mp4", ".webm": "video/webm", ".png": "image/png", ".css": "text/css" };
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  if (url === "/favicon.ico") { res.writeHead(204); return res.end(); }
  const root = roots.find(([p]) => url.startsWith(p))[1];
  let file = path.join(root, url === "/" ? "index.html" : url);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end("nf"); }
  const size = fs.statSync(file).size, type = types[path.extname(file)] || "application/octet-stream";
  const range = req.headers.range;
  if (range) { const [s, e] = range.replace("bytes=", "").split("-"); const start = +s, end = e ? +e : size - 1;
    res.writeHead(206, { "Content-Type": type, "Content-Range": `bytes ${start}-${end}/${size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 }); fs.createReadStream(file, { start, end }).pipe(res); }
  else { res.writeHead(200, { "Content-Type": type, "Content-Length": size, "Accept-Ranges": "bytes" }); fs.createReadStream(file).pipe(res); }
}).listen(8765, () => console.log("listening"));
