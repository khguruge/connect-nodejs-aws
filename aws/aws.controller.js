const AWS = require('aws-sdk');
const ACCESS_KEY_ID = '*******************';
const SECRET_ACCESS_KEY = '***************';
const BUCKET_NAME = 'medium-bucket';

const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
});

const uploadFile = (file) => {
    var base64data = new Buffer.from(file.data, 'binary');
    const params = {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: base64data,
        ContentType: file.mimetype,
        ContentEncoding: 'base64',
        ACL: 'private'
    };
    s3.putObject(params, function (resp) {
        console.log('Successfully uploaded file.');
        return true;
    });
};

const download = (filename) => {
    const url = s3.getSignedUrl('getObject', {
        Bucket: BUCKET_NAME,
        Key: filename,
        Expires: 10 * 60
    });
    return url;
};

// API Upload
// http://localhost:8080/api/aws/file/upload

exports.uploadAWS = async (req, res, next) => {
    try {
        upload = await uploadFile(req.files.file);
        return res.json({
            "success": true,
            "message": "file upload successfully",
            upload: upload
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            "success": false,
            "message": "something went wrong"
        });
    }
};

// API Download
// http://localhost:8080/api/aws/file/download/:filename

exports.downloadAWS = async (req, res, next) => {
    try {
        url = download(req.params.filename);
        return res.json({
            "success": true,
            url: url
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            "success": false,
            "message": "something went wrong"
        });
    }
};
