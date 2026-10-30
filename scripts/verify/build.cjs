const esbuild = require("/home/claude/.npm-global/lib/node_modules/tsx/node_modules/esbuild");
const stubs = "/tmp/ssr/stubs";
esbuild.build({
  entryPoints: ["/tmp/harness/entry.tsx"], bundle: true, outfile: "/tmp/harness/bundle.js", platform: "browser", format: "iife",
  tsconfig: "/tmp/ssr/tsconfig.json", jsx: "automatic", nodePaths: ["/home/claude/.npm-global/lib/node_modules"],
  define: { "process.env.NODE_ENV": '"development"', "process.env.NO_VIDEOS": "''" , "process.env.NEXT_PUBLIC_WHATSAPP_NUMBER": "undefined", "process.env.NEXT_PUBLIC_SITE_URL": "undefined", "process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_NOTICES": "undefined"},
  alias: { "next/link": stubs + "/link.tsx", "next/image": stubs + "/image.tsx", "next/navigation": stubs + "/navigation.ts", "next-themes": stubs + "/themes.tsx", sonner: stubs + "/sonner.tsx", gsap: stubs + "/gsap.ts", "gsap/ScrollTrigger": stubs + "/scrolltrigger.ts", "lucide-react": stubs + "/lucide.tsx", clsx: stubs + "/clsx.ts", "tailwind-merge": stubs + "/twmerge.ts", "class-variance-authority": stubs + "/cva.ts", "@radix-ui/react-slot": stubs + "/slot.tsx", "@radix-ui/react-accordion": stubs + "/accordion.tsx" },
  logLevel: "warning", sourcemap: false,
}).then(() => console.log("bundle ok")).catch(() => process.exit(1));
