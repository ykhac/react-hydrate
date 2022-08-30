export default (markup: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>React hydrate</title>
    </head>

    <body>
      <div id="app">${markup}</div>

      <script src="/root.js"></script>
    </body>
  </html>
`;
