import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from 'src/client/App';
import template from './template';

const app = express();

app.use(express.static('dist/client'));

app.get('*', (req, res) => {
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  res.send(template(html));
});

app.listen(4000);
