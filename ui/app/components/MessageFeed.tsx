import React,{useState, useRef, useEffect} from 'react'
import Avatar from '@components/Avatar'
import DotsHorizontal from '@components/logos/DotsHorizontal'
import Input from '@components/Input'
import Attachment from '@components/logos/Attachment'
import Camera from '@components/logos/Camera'
import Video from '@components/logos/Video' 
import {useQuery, useSubscription, useMutation} from 'urql'
import {GET_CONVERSATION_MESSAGES, SUBSCRIBE_TO_NEW_MESSAGES, ADD_CONVERSATION_MESSAGE} from '@queries'
import {uploadFile} from '@functions'
import {useForm} from 'react-hook-form'
import {BallClipRotateMultiple} from 'react-pure-loaders'
import {motion} from 'framer-motion'
import {format} from 'date-fns'



interface Props {
  className?: string
  userName: string;
  userImage: string;
  conversationId: string;
  userId: string; // current user ID
}



const MessageFeed:React.FC<Props> = ({className, userImage, userName, userId, conversationId }) => {

  const {register, errors , handleSubmit, watch, reset} = useForm()
  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const documentInputRef = useRef(null)
  const messagesContainerRef = useRef(null)
  // scroll to the bottom of the messages

  useEffect(() => {
    const element = messagesContainerRef.current
    if (element){
      element.scrollTop = messagesContainerRef.current?.scrollHeight
    }
  })
  
  
  const [uploadedFiles, setUploadedFiles] = useState([])

  const allFormData = watch()

  const [fileUploading, setFileUploading] = useState(false)
  
  const [
    {data: getMessagesData, error: getMessagesError, fetching: getMessagesFetching},
    refetchMessages
  ] = useQuery({
      query: GET_CONVERSATION_MESSAGES, 
      variables:{conversationId},
      requestPolicy:"cache-and-network"
    }
  )
  
  const handleNewMessages = (old, response) => {
    console.log({response, old})
  }

  const [{
   data: messageSubData, error: messageSubError, fetching: messageSubFetching 
  }] = useSubscription({query: SUBSCRIBE_TO_NEW_MESSAGES, variables:{conversationId}}, handleNewMessages)
  

  const [
    {data: addMessageData, error: addMessageError, fetching: addMessageFetching},
    addMessage
  ] = useMutation(ADD_CONVERSATION_MESSAGE)

  const handleFileChange = async (event) => {
    setFileUploading(true)
    console.log({allFormData})
    const allFiles = [...allFormData["Photo"], ...allFormData["Video"], ...allFormData["File/Document"]]
    // console.log(allFiles)
    const formUploadedFiles = [] //await Promise.all(allFiles.map(el => uploadFile(el)))
    // const uploadPromises = allFiles.map(el => uploadFile(el))
    // console.log({uploadPromises})
    // const formUploadedFiles = await Promise.all(uploadPromises)
    for (const file of allFiles) {
      const uploadRes = await uploadFile(file)
      formUploadedFiles.push(uploadRes)
    }
    console.log({formUploadedFiles})
    setUploadedFiles(old => [...old , ...formUploadedFiles])
    console.log({allFiles})
    console.log({uploadedFiles})
    setFileUploading(false)
    // console.log(event)
  }

  const onSubmit = async (data) => {
    let filesData = uploadedFiles.map(el => ({link: el}))
    if (filesData.length === 0){
      filesData = [{link:""}]
    }

    const result = await addMessage({
      content: data?.content,
      files: filesData,
      conversationId
    })

    console.log({createmessagedata: data, result})
    // setFileUploading(false);
    setUploadedFiles([]);
    reset()
  }
  

  if (getMessagesError){
    return (
      <section className={"bg-white rounded shadow " + className}>
        
      </section>
    )
  }
  
  console.log({getMessagesData,getMessagesError,getMessagesFetching});
  console.log({addMessageData, addMessageError, addMessageFetching})
  console.log({messageSubData, messageSubError, messageSubFetching})
  console.log({wft: fileUploading || addMessageFetching, fileUploading, addMessageFetching})


  return (
    <main className={"bg-white rounded shadow " + className}>
      <div className="flex items-center justify-between p-2 border rounded text-light-blue-900 border-light-blue-900">
        <div className="flex items-center justify-between space-x-2">
          <Avatar image={userImage} />          
          <h3 className="text-base font-semibold">{userName}</h3>
        </div>
        <span className="cursor-pointer">
          <DotsHorizontal />
        </span>
      </div>
      <section
        ref={messagesContainerRef}
        className="flex flex-col overflow-x-auto shadow-inner "
        style={{ height: "calc(100vh - 270px)"}} >
        
        <Messages messages={getMessagesData?.messages} userId={userId} />
          
        <div className="flex max-w-full p-4 mt-auto ml-auto space-x-1 ">

          {
            uploadedFiles?.map((el, id) => (
              <motion.div
                key={id} 
                initial={{y:20, opacity:0}} 
                animate={{y:0, opacity:1}} 
                transition={{duration: 0.2, type: 'linear'}}
                className="w-32 h-32 border rounded border-light-blue-900">
                <img className="object-cover w-full h-full" src={el} alt={"uploaded image"}/>
              </motion.div> 
            ))
          }
        </div>
      </section>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 shadow-none">

        <Input 
          className="w-full rounded-3xl bg-cold-gray-100 text-light-blue-900"
          placeholder="Type message" 
          name={"content"}
          register={register}
          // id="content"
          type="text" />
        <div className="flex items-center justify-between">

          <div className="flex items-center pt-2 pb-1 space-x-3 ">
            {
              [
                { name: "Photo", image: Camera, ref: imageInputRef },
                { name: "Video", image: Video, ref: videoInputRef },
                { name: "File/Document", image: Attachment, ref: documentInputRef },
              ].map((el, i) => (
                  <div key={i} className="flex items-center cursor-pointer">
                    <label htmlFor={el.name} className="flex items-center px-2 py-1 rounded cursor-pointer hover:bg-cold-gray-100">

                      <el.image className="w-6 h-6 text-light-blue-900 " />
                      <span className="text-xs font-semibold text-light-blue-900">{el.name}</span>
                    </label>
                    <input 
                      id={el.name} 
                      name={el.name}
                      className="hidden"
                      ref={register} 
                      // disabled={share || update} 
                      onChange={handleFileChange} 
                      type="file" 
                      multiple
                    >
                    </input>
                  </div>
                ))
            }
            
          </div>
          {
            (fileUploading) && (
              <span className="pr-4">
                <BallClipRotateMultiple color="#0C4A6E" loading={true} />
              </span>
            ) 
          }
        </div>

      </form>
      
    </main>
  )
}















interface IMessage{
  content: string;
  date: string;
  userName: string;
  userImage: string;
  origin: boolean;
  files: any[]
}

const Messages: React.FC<{messages: any[], userId: string}> = ({messages=[], userId}) => {
  
  const reversedMessages = []
  messages?.forEach(el => reversedMessages.unshift(el))

  return (
    <>
      {reversedMessages.map((el,id) => (
        <Message
          content={el.content}
          date={el.created_at}
          userName={el.user.name}
          userImage={el.user.image}
          origin={el.user.id === userId}
          key={id}
          files={el?.files || []}
        />
      ))}
    </>
  )
}

const Message:React.FC<IMessage> = ({ content, date, userName, userImage , origin, files}) => {
  // console.log({origin}) 
  return (
    <div className={"flex text-sm p-4 space-x-2 text-white " + `${origin ? 'justify-end': 'justify-start'}`}>
      <Avatar image={userImage} className={"relative " + `${origin ? 'top-6 order-1 ml-2': '-top-3'}`} />
      <div className={"relative flex flex-col px-3 pt-3 pb-1 rounded-xl text-white " + `${origin ? 'bg-light-blue-800 rounded-br-none': 'bg-cold-gray-400 rounded-tl-none'}`}>
        <div className="flex space-x-2">

          {

            files.filter(el => el.link).map((el,id) => (
              <motion.picture
                key={id} 
                initial={{y:20, opacity:0}} 
                animate={{y:0, opacity:1}} 
                transition={{duration: 0.1, type: 'linear'}}
                className="w-32 h-32 border rounded border-cold-gray-100">
                <img className="object-cover w-full h-full" src={el.link} alt={"uploaded image"}/>
              </motion.picture> 
            ))
          }
        </div>
        <span className="pt-1 pb-2">
          {content}
        </span>
        <span className="text-xs text-cold-gray-100 text-opacity-60 bottom-1 right-4">
          {format(new Date(date), "MMM d, H:m")}
        </span>
      </div>
    </div>
  )
}



export default MessageFeed