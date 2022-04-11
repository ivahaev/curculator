import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/client/app.tsx"],
    bundle: true,
    outdir: "./docs/js",
  })
  .then(() => {
    console.log(`Build completed`);
  });
