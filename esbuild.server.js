const {build} = require('esbuild');

build({
  entryPoints: ["./src/server/index.js"],
  bundle: true,
  outfile: 'dist/index.js',
  jsx: 'automatic',
  platform: "node",
  loader: { '.js': 'jsx' },
  write: true,
  watch: {
    onRebuild(error) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded')
    },
  }
}).then(() => {
  console.log('Watching...')
})