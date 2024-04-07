const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload the captured video to Cloudinary and send notification emails
async function uploadToCloudinary(saveFilePathName, newFileName, res, req) {
    try {
        const date = new Date();
        const cloudinaryFolderName = `/perimeter-watch/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        const fullPath = `${__dirname}${saveFilePathName}/${newFileName}`;

        const result = await cloudinary.uploader.upload_large(fullPath, { folder: cloudinaryFolderName, use_filename: true, resource_type: 'video', unique_filename: false });

        return result;
    } catch (err) {
        return res.send('Failed to upload capture to cloudinary');
    }
}


module.exports = {
    cloudinary,
    uploadToCloudinary
}