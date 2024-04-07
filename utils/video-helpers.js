const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const { getVideoDurationInSeconds } = require('get-video-duration')

const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

function convert(input, output, callback) {
    ffmpeg(path.resolve(input))
    .output(output)
    .on('end', function() {                    
        console.log('conversion ended');
        callback(null);
    }).on('error', function(err){
        console.log('error: ', err);
        callback(err);
    }).run();
}

function convertAsync(input, output, callback) {
    return new Promise((resolve, reject) => {
        ffmpeg(path.resolve(input))
        .output(output)
        .on('end', function() {                    
            console.log('conversion ended');
            
            resolve(true);
        }).on('error', function(err){
            console.log('error: ', err);
            
            resolve(false);
        }).run();
    });
}

async function getVideoDuration(videoPath) {
    return new Promise((resolve, reject) => {
        getVideoDurationInSeconds(path.resolve(videoPath)).then((duration) => {
            console.log(duration);

            resolve(duration);
        })
        .catch((err) => {
            console.log(err);
            
            resolve(false);
        })
    });
}

module.exports = {
    convert,
    convertAsync,
    getVideoDuration
}