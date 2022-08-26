import  App from '../client/pages/index.js';
import template from './template';

import express from 'express';
import { matchPath, StaticRouter } from 'react-router-dom';
import * as ReactDOMServer from 'react-dom/server';
import routes from '../client/routes.js';
import * as path from 'path';

const app = express();

app.use(express.static('public'));

app.use('*', (req, res) => {
    const markup = ReactDOMServer.renderToString(
        <App />
    );

    res.send(template(markup));
})

app.listen(4000, () => {
  console.log(`Server is listening on port 4000`);
});