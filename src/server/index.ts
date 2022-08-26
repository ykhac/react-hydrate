import template from './template';

import express from 'express';
// import * as ReactDOMServer from 'react-dom/server';

const app = express();

app.use(express.static('dist/client/'));

app.use('*', (req, res) => {
  console.log(req.url);
  const markup = "";
  res.send(template(markup));
})

app.listen(4000, () => {
  console.log(`Server is listening on port 4000`);
});