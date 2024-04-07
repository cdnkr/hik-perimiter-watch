const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload the captured video to Cloudinary and send notification emails
async function uploadToCloudinary(newFileName) {
    return new Promise((resolve, reject) => {
        try {
            const date = new Date();
            const cloudinaryFolderName = `/perimeter-watch/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    
            cloudinary.uploader.upload_large(newFileName, {folder: cloudinaryFolderName, use_filename: true, resource_type: 'video', unique_filename: false }, function(error, result) { 
                if(error) {
                    return reject(error);
                }

                return resolve(result.secure_url);
            });
        } catch (err) {
            return reject(err);
        }
    })
}


module.exports = {
    cloudinary,
    uploadToCloudinary
}