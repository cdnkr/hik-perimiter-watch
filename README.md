# Perimeter Watch

Perimeter Watch is a Node.js application designed to enhance the security of your home or business by connecting to your HIK Vision CCTV system. It leverages the power of object detection to monitor RTSP feeds for specific objects such as people, cars, or any other items you wish to track. When an object of interest is detected within specified conditions, the system notifies you via email, allowing for immediate awareness and response.

## Features

- **Real-time Object Detection**: Connect to your HIK Vision CCTV's RTSP feed and detect objects in real-time.
- **Custom Object and Alert Configuration**: Specify the objects you're interested in, along with the minimum probability for detection and the hours during which detections should trigger alerts.
- **Video Capture**: Automatically saves a 10-second video capture of the stream at the moment of detection.
- **Email Notifications**: Sends an email with a link to view or download the video capture when an object of interest is detected.
- **Cloud Storage**: Utilizes Cloudinary for efficient video capture uploads and storage.

## How It Works

1. **Stream and Detect**: Utilizes the `rtsp-relay/browser` npm package to display the camera feed on a browser canvas. The feed is analyzed every second to detect specified objects.
2. **Capture and Post**: When an object of interest is detected, the client submits a POST request to the server to save the capture.
3. **Video Creation**: The server creates a 10-second video, capturing the stream from the point the POST request was made. Videos are organized and saved to `/captures/<year>/<month>/<day>/<timestamp.mp4>`.
4. **Upload and Retrieve**: The video capture is uploaded to Cloudinary, and a URL for the upload is provided.
5. **Notification**: An email notification is sent to all specified recipients with a link to the capture, using `nodemailer`.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js and npm installed.
- Access details for your HIK Vision CCTV system (IP, username, and password).
- Cloudinary account for file uploads.
- Gmail account for sending email notifications (if using the default nodemailer setup).

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/perimeter-watch.git
cd perimeter-watch
```

2. Install dependencies:

```bash
npm install
cd client
npm install
```

3. Copy `.env.example` to `.env` and fill in your configuration details including HIK Vision access details, Cloudinary credentials, and email settings.

4. Configure object detection settings in `client/config.js` to specify which objects to detect, minimum probability, and the time frame for alerts.

## Usage

Start the server:

```bash
npm start
```

Open a new terminal and start the client:

```bash
cd client
npm start
```

Open the client application in your browser `http://localhost:2001` to view the live feed and manage detection settings. The server runs at `http://localhost:2001`.

## Configuration

### `client/config.js`

- Specify object detection preferences, such as object types, minimum probability, and alert time frame.

### `.env`

- Contains all necessary environment variables for connecting to your HIK Vision CCTV, Cloudinary, and email settings.

## License

This project is licensed under the MIT License - see the LICENSE file for details.