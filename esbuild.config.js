const {build} = require('esbuild');
// Map path

let renderMap = {
  name: 'render-map',
  setup(build) {
    const path = require('path');
    const fs = require('fs');

    const folderMap = {};

    function getFile(pathFolder, folder){
      fs.readdirSync(pathFolder).map((fileName) => {
        const isDir = fs.lstatSync(path.join(pathFolder, fileName)).isDirectory() 

        if (isDir) {
          folder[path.join(pathFolder, fileName)] = {};
          getFile(path.join(pathFolder, fileName), folder[path.join(pathFolder, fileName)]);
        } else {
          folder[fileName.split('.')[0]] = {
            path: fileName.split('.')[0],
            componentName: fileName
          }
        }
      });
    }
    
    getFile(path.resolve(__dirname, './src/client/pages'), folderMap);

    console.log(JSON.stringify(folderMap));
  },
}
// Build client
build({
  entryPoints: ["./src/client/root.tsx"],
  bundle: true,
  loader: { '.ts': 'tsx' },
  allowOverwrite: true,
  outfile: 'dist/client/bundle.js',
  plugins: [renderMap],
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
  entryPoints: ["./src/server/index.ts"],
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