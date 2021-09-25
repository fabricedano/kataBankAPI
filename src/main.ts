import app from './app';

const port = process.env.SERVER_PORT || 3001;

app.listen(port, () => console.log(`app started at http://localhost:${port}!`));
