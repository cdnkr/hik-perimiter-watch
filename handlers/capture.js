const WebSocket = require('ws');
const fs = require('fs');
const { ensureDirectoryExistence } = require("../utils/fs-helpers");
const { uploadToCloudinary } = require('../services/cloudinary');
const { sendEmails } = require("../services/nodemailer");

// Handle capturing video from camera and uploading it
async function handleCapture(req, res) {
    try {
        const { camera } = req.params;
        const saveFilePathName = generateFilePathName();
        await ensureDirectoryExistence(`${__dirname}${saveFilePathName}`);
        const webSocket = new WebSocket(`ws://${process.env.API_URL}/api/stream/${camera}`);
        const newFileName = await captureVideo(webSocket, saveFilePathName);

        const result = await uploadToCloudinary(saveFilePathName, newFileName, res, req);

        sendEmails(req, result.secure_url);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing the capture request.');
    }
}

// Generate file path name based on current date
function generateFilePathName() {
    const date = new Date();
    return `/captures/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

// Capture video from the WebSocket and save to a file
async function captureVideo(webSocket, saveFilePathName) {
    return new Promise((resolve, reject) => {
        const newFileName = `${new Date().getTime()}.mp4`;
        const fullPath = `${__dirname}${saveFilePathName}/${newFileName}`;

        webSocket.on('open', () => fs.writeFile(fullPath, createInitialVideoBlob(320, 240), err => {
            if(err) reject(err);
            else console.log('Video capture started');
        }));
        webSocket.on('message', data => fs.appendFile(fullPath, data, err => err && reject(err)));
        webSocket.on('close', () => resolve(newFileName));
        webSocket.on('error', reject);

        setTimeout(() => webSocket.close(), 10000); // 10 seconds capture duration
    });
}

// Create initial video blob with header
function createInitialVideoBlob(width, height) {
    // This creates a buffer with the initial video blob data
    const wh1 = (width >> 4),
        wh2 = ((width & 0xf) << 4) | (height >> 8),
        wh3 = (height & 0xff);

    return Buffer.from([
        0x00, 0x00, 0x01, 0xb3, // sequence start code
        wh1, wh2, wh3, // width & height
        0x13, // aspect ratio & framerate
        0xff, 0xff, 0xe1, 0x58, // bitrate and other
        0x00, 0x00, 0x01, 0xb8, 0x00, 0x08, 0x00, // GOP
        0x00, 0x00, 0x00, 0x01, 0x00 // first picture start code
    ]);
}

module.exports = {
    handleCapture
}