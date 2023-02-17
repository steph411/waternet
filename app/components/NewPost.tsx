import React, {useRef, useState} from 'react'
import Write from './logos/Write'
import Camera from './logos/Camera';
import Video from './logos/Video';
import { 
  CREATE_POST, 
  CREATE_POST_WITH_FILE, 
  UPLOAD_POST_IMAGE, 
  CREATE_SHARED_POST,
  UPDATE_POST } from '../utils/queries'
import { useMutation } from 'urql'
import Image from 'next/image'
import Loader from '@components/Loader'
import { BallClipRotateMultiple } from 'react-pure-loaders'
import { FeedType } from 'types';
import Media from '@components/Media'

interface Props {
 onPostCreated?: any
 actionMessage?: string
 update?: boolean
 share?: boolean
 postId?: string
 textPlaceholder?: string
 feedType?: string
}



const NewPost: React.FC<Props> = ({ onPostCreated, feedType=FeedType.post, textPlaceholder="start a post", actionMessage="publish", update=false, share=false, postId  }) => {
  
  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const textRef = useRef(null)
  const [file, setFile] = useState(null);
  const [base64Str, setBase64Str] = useState(null);
  const [uploadedImage, setUploadedImage] = useState({name:"", url:""});
  const [fileUploading, setfileUploading] = useState(false);
  const [{ error, fetching, data }, createPost] = useMutation(CREATE_POST)
  const [{
    error: postWithFileError,
    fetching: postWithFileFetching,
    data: postWithfileData }, createPostWithFile] = useMutation(CREATE_POST_WITH_FILE)
  
  const [{
    error:updatePostError, 
    fetching:updatePostFetching, 
    data:updatePostData}, updatePost] = useMutation(UPDATE_POST)  
    
  const [{
    error: createSharedPostError, 
    fetching: createdSharedPostFetching,
    data: createSharedPostData
  }, createSharedPost] = useMutation(CREATE_SHARED_POST)

  const [text, setText] = useState("")

  const handleCreatePost = async (e) => {
    e.preventDefault();
    console.log({text})
    // first upload the file to the server
    if (file && !update && !share) {
      const uploadUrl = "/api/files/upload"
      const formData = new FormData()
      formData.append("file", file)
      setfileUploading(true)
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData
      })
      const responseData = await response.json()
      const filePath = responseData.filePath
      setfileUploading(false)

      console.log({response: responseData})

      const reqData: any = {
        title: "",
        content: text,
        file: filePath,
      }
      reqData.type = feedType

      const createPostResult = await createPostWithFile(reqData);
      console.log({ createPostResult, reqData })
      const newPost = createPostResult?.data?.insert_posts_one
      onPostCreated && onPostCreated(newPost)
      setFile(null)
      setUploadedImage(null)
      setText("")
      console.log({ fetching, postWithFileFetching, fileUploading });
      return 
    }

    if (update){
      const updatePostResult = await updatePost({
        id: postId,
        content: text
      })
      console.log({updatePostResult})
      onPostCreated && onPostCreated(updatePostResult?.data?.update_posts_by_pk)
      setFile(null)
      setUploadedImage(null)
      setText("")
      return
    }
    else if(share){
      const reqData: any = {

        title: "",
        content: text,
        original_post_id: postId
      }
      reqData.type = feedType
      const createSharePostResult = await createSharedPost(reqData) 
      console.log({createSharePostResult})
      onPostCreated && onPostCreated(createSharePostResult?.data?.insert_posts_one)
      setFile(null)
      setUploadedImage(null)
      setText("")
      return
    }
    else{
      const reqData: any = {
        title: "",
        content: text,
      };
      reqData.type = feedType
      const createPostResult = await createPost(reqData)
      console.log({ createPostResult })
      const newPost = createPostResult?.data?.insert_posts_one
      onPostCreated && onPostCreated(newPost)
      setFile(null)
      setUploadedImage(null)
      setText("")
      return
    }

  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    const reader = new FileReader();
    if (e.target.files[0]) {

      console.log({file: e.target.files[0]});
      reader.readAsBinaryString(e.target.files[0]);
      const imageLocalUrl = window.URL.createObjectURL(e.target.files[0])
      console.log({imageLocalUrl});
      setUploadedImage({name: e.target.files[0].name, url: imageLocalUrl});
    }
    reader.onload = function () {
      const base64str = btoa(reader.result as string);
      setBase64Str(base64str);
    };
    reader.onerror = function () {
      console.log('Unable to parse file');
    };
  }
  

  console.log({uploadedImage})

  return (
    <section className="sticky bg-white rounded-lg shadow-md ring-4 ring-light-blue-900">
      <div className="flex items-center py-2 pl-2">
        <div className="flex items-center justify-center flex-none w-8 h-8 p-2 overflow-hidden">
          {
            fetching || postWithFileFetching || updatePostFetching || fileUploading ? (
              <BallClipRotateMultiple color="#2cbcfa" loading={true}/>
            ) : null
          }
        </div>

        <Write className="flex-none w-12 h-12 text-light-blue-900"/>
        
        <form onSubmit={handleCreatePost} className="block w-full h-full appearance-none">

          <textarea
            value={text}
            rows={3}
            ref={textRef}
            onChange={(e) => setText(e.target.value)}
            className="w-full py-2 text-sm resize-none form-textarea placeholder-light-blue-900 placeholder-opcacity-100 text-light-blue-900"
            placeholder={textPlaceholder}>
          
              
          </textarea>
        </form>
      </div>
      {/* uploaded media section */}
      {
        file && uploadedImage.url && (
          <div className="flex-none px-16 my-2 overflow-hidden">  
            {
              <Media name={uploadedImage.name} url={uploadedImage.url} />
            }
          </div>
        )
      }
      {/* media upload section */}
      <div className="flex justify-between py-2 pl-8 pr-4 border-t-2 border-light-blue-900 ring-light-blue-900 focus:ring-4">
        <div className="flex justify-between space-x-4">

          {
            [
              { name: "Photo", image: Camera, ref: imageInputRef },
              { name: "Video", image: Video, ref: videoInputRef }].map((el, i) => (
                <div key={i} className="flex flex-col items-center cursor-pointer hover:opacity-80">
                  <label htmlFor={el.name} className="flex flex-col items-center cursor-pointer hover:opacity-80">

                    <el.image className="w-14 text-light-blue-900 " />
                    <span className="text-xs font-semibold text-light-blue-900">{el.name}</span>
                  </label>
                  <input 
                    id={el.name} 
                    className="hidden"
                    ref={el.ref} 
                    disabled={share || update} 
                    onChange={handleFileChange} 
                    type="file" 
                  >
                  </input>
                </div>
              ))
          }
          <div onClick={(e) => textRef.current?.focus()} className="flex flex-col items-center cursor-pointer hover:opacity-80">
            <Write className="w-14 text-light-blue-900" />
            <span className="text-xs font-semibold text-light-blue-900">Write Article</span>
          </div>
        </div>
        <button
          onClick={handleCreatePost}
          className="self-center inline-block px-4 py-2 ml-auto text-sm font-semibold text-white rounded cursor-pointer hover:bg-light-blue-800 bg-light-blue-900"
        >
          {actionMessage}
        </button>

        

      </div>
    </section>
  )
}



export default NewPost;