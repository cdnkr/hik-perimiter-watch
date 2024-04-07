// Handle RTSP streaming
function handleStream(ws, req, proxy) {
    proxy({
        url: getRtspUrl(req.params.camera),
        verbose: false
    })(ws);
}

// Get RTSP URL from environment variables
function getRtspUrl(camera) {
    return `rtsp://${process.env.HIK_USERNAME}:${process.env.HIK_PASSWORD}@${process.env.CAMERA_IP}:${process.env.RTSP_PORT}/ISAPI/Streaming/channels/${camera}01`;
}

module.exports = {
    handleStream
}