// const bodyParser = require("body-parser");
// const fetch = require("node-fetch")
import fs from 'fs';
import path from 'path'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const appUrl = process.env.NEXT_PUBLIC_URL



const fileUpload = async (req, res) => {
  const { filename, base64Str, post_id, comment_id } = req.body.input;
  console.log({ newReqFile: filename });
  let fileBuffer = Buffer.from(base64Str, 'base64');
  try {

    const dir = path.resolve("./public");
    console.log({dir: dir})
    fs.writeFileSync(dir + `/${filename}`, fileBuffer, 'base64');
    // insert into db
    const HASURA_MUTATION = `
      mutation createPostfile($post_id : String, $link: String){
        insert_images_one(object:{post_id: $post_id, link: $link}){
          id
          link
        }
      }
    `;
    const imageLink = `${appUrl}/${filename}`
    const variables = { link: imageLink, post_id: post_id };

    // execute the parent mutation in Hasura
    const fetchResponse = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_API_SECRET
        },
        body: JSON.stringify({
          query: HASURA_MUTATION,
          variables
        })
      }
    );
    const { data, errors } = await fetchResponse.json();
    console.log(data);

    // if Hasura operation errors, then throw error
    if (errors) {
      console.log({errorWriteTohasura: errors});
      return res.status(400).json({
        message: errors.message
      })
    }

    // success
    return res.json({ link: imageLink });
  } catch (e) {
    // next(e);
    console.log({imageuploaderror: e})
  }
}

export default fileUpload