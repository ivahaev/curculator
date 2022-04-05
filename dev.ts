import esbuild from "esbuild";

esbuild
  .serve(
    {
      servedir: "./www",
    },
    {
      entryPoints: ["./src/client/app.tsx"],
      bundle: true,
      outdir: "./www/js",
    }
  )
  .then((result) => {
    const { host, port } = result;
    console.log(`listening at http://${host}:${port}`);
  });
