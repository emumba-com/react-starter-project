import q from 'q';
import uuid from 'uuid';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

import awsS3Config from '../../config/aws-s3.config'

AWS.config.update(awsS3Config);

const uploadOnS3 = (filePath, mimeType) => {
  
  const promise = q.defer()
  const extension = path.extname(filePath)
  const s3bucket = new AWS.S3({params: {Bucket: 'giving-at-work'}})
  const key = uuid.v4() + uuid.v4() + extension
  
  const params = {Key: key, ContentType: mimeType, Body: fs.createReadStream(filePath)}
  
  s3bucket.upload(params, (err, data) => {
    if (err)
      promise.reject(err);
    else
      promise.resolve(data.Location);    
          
    fs.unlink(filePath);
    return
  })

  return promise.promise;
}

export default {
  uploadOnS3: uploadOnS3
}
