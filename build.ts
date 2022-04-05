import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/client/app.tsx"],
    bundle: true,
    outdir: "./dist/js",
  })
  .then(() => {
    console.log(`Build completed`);
  });
