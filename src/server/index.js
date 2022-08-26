import  App from '../client/pages/index.js';
import template from './template';

import express from 'express';
import * as ReactDOMServer from 'react-dom/server';

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