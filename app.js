require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rtspRelay = require('rtsp-relay');

const { handleCapture } = require('./handlers/capture');
const { handleStream } = require('./handlers/stream');

const app = express();

const { proxy } = rtspRelay(app);

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use('/captures', express.static(__dirname + '/captures'));

app.ws('/api/stream/:camera', (ws, req) => handleStream(ws, req, proxy));
app.post('/api/capture/:camera', handleCapture);

const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`running on port ${port}`));