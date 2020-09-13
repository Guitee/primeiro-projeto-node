import express from 'express';

import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) =>
    response.json({ message: 'Coeee Maaaaaariia' }),
);

app.listen(3337, () => {
    console.log('Server Guite Started');
});
