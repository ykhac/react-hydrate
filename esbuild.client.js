const {build} = require('esbuild');

build({
  entryPoints: ["./src/client/root.js"],
  bundle: true,
  loader: { '.js': 'jsx' },
  allowOverwrite: true,
  outfile: 'public/bundle.js',
  watch: {
    onRebuild(error) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded')
    },
  },
}).then(() => {
  console.log('Watching...')
})