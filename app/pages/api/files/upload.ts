import HttpStatus from 'http-status-codes'
import middleware from '../../../middleware/middleware'
import nextConnect from 'next-connect';
import fs from 'fs'
import path from 'path'
import AWS from 'aws-sdk'


const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
const AWS_BUCKET = "ewatergate"

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});


const appUrl = process.env.NEXT_PUBLIC_URL

const handler = nextConnect();

handler.use(middleware);

handler.post(async(req:any, res:any) => {
  try {
    
    const files = req.files
    const body = req.body
    console.log({ files, body });
    const directory = path.resolve("./public")
    

    
    // do stuff with files and body
    const filename = files['file'].name
    const filePath = files['file'].path
    
    const fileContent = fs.createReadStream(filePath);

    // Setting up S3 upload parameters
    const params = {
      Bucket: AWS_BUCKET,
      Key: filename, 
      Body: fileContent,
      ACL: "public-read",
    };

    const uploadRes:any = await new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => (err == null ? resolve(data) : reject(err)));
    });

    // const newFilePath = path.join(directory, filename)
    // const fileLink = `${appUrl}/${filename}`
    // fs.rename(filePath, newFilePath, () => {
    //   console.log({fileSaved: filename})
    // })
    console.log({fileuploaded: uploadRes})
		res.status(HttpStatus.OK).json({filePath: uploadRes.Location});
	} catch (err) {
    console.log({fileuploadError: err})
		res.status(HttpStatus.BAD_REQUEST).json({error: err.message});
	}
});

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;


