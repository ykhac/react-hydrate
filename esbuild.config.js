const {build} = require('esbuild');

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// Map path
let renderMap = {
  name: 'render-map',
  setup(build) {
    const path = require('path');
    const fs = require('fs');

    const folderMap = {};
    const componentPath = {};

    function getFile(pathFolder, folder){
      fs.readdirSync(pathFolder).map((fileName) => {
        const isDir = fs.lstatSync(path.join(pathFolder, fileName)).isDirectory() 

        if (isDir) {
          folder[fileName] = {};
          getFile(path.join(pathFolder, fileName), folder[fileName]);
        } else {
          const hash = path.join(pathFolder, fileName).hashCode();
          componentPath[hash] = path.join(pathFolder, fileName);
          folder[fileName.split('.')[0]] = hash.toString();
        }
      });
    }
    
    getFile(path.resolve(__dirname, './src/client/pages'), folderMap);

    build.onStart(() => {
      // Get out file
      const { entryPoints } = build.initialOptions;

      const pathEntryPoint = entryPoints[0];

      fs.writeFile(pathEntryPoint.slice(0, pathEntryPoint.lastIndexOf('/') + 1) + 'routes.json', JSON.stringify({folderMap, componentPath}), err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });
    })
  },
}

// Build client
build({
  entryPoints: ["./src/client/root.tsx"],
  bundle: true,
  loader: { '.ts': 'tsx' },
  allowOverwrite: true,
  outdir: 'dist/client',
  splitting: true,
  plugins: [renderMap],
  format: 'esm',
  watch: {
    onRebuild(error) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded')
    },
  },
}).then(() => {
  console.log('Watching...')
});

// Build server
build({
  entryPoints: ["./src/server/index.tsx"],
  bundle: true,
  outfile: 'dist/server/index.js',
  jsx: 'automatic',
  platform: "node",
  loader: { '.js': 'jsx' },
  allowOverwrite: true,
  watch: {
    onRebuild(error) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded')
    },
  }
}).then(() => {
  console.log('Watching...')
})