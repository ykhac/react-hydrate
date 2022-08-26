export default (markup) => `
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css">
    </head>

    <body>
      <div id="app">${markup}</div>

      <script src="/bundle.js"></script>
    </body>
  </html>
`;
