const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});

module.exports.uploadSingle = (req, res, next) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      req.body[req.file.fieldname] = result.url; //req.file.fieldname = thumnail, viết tổng quát như này để code linh động hơn cho những trường hợp giá trị name của ô input khác đi
      // console.log(result);
      next();
    }

    upload(req);
  } else {
    next();
  }

};