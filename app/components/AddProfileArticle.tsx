import React, {useState} from 'react';
import Input from '@components/Input'
import {useForm} from 'react-hook-form'
import Photograph from '@components/logos/Photograph'
import Button from '@components/Button'
import {motion} from 'framer-motion'
import {ADD_USER_SCIENTIFIC_ARTICLE, ADD_USER_WHITE_PAPER} from '@queries'
import {useMutation} from 'urql'
import {useRouter} from 'next/router'
import { uploadFile } from '@functions'
import {BallClipRotateMultiple } from 'react-pure-loaders'
import {ArticleType} from 'types'




interface Props{
  className?: string
  userId?: string
  onCancel: Function
  type: ArticleType
}

interface CreateArticleData{
  title: string,
  description: string
  image?: string,
  file_link: string,
  article_link?: string
  userId: string
}



const PageCreate:React.FC<Props> = ({className, userId, onCancel, type}) => {
 
  const {register, errors , handleSubmit, watch} = useForm()
  
  const queries = {
    scientific: ADD_USER_SCIENTIFIC_ARTICLE,
    whitepaper: ADD_USER_WHITE_PAPER    
  }
  const [{data: createArticleData, fetching: createArticleLoading, error: createArticleError}, createArticle] = useMutation(queries[type])
  const coverImage = watch('coverImage')
  const file = watch('file')
  const [fileUploading, setfileUploading] = useState(false)
  
  
  const handleCancel = (e) => {
    onCancel()
  }
  

  const onSubmit = async (data) => {
    // we first upload the images if any
    let coverImagePath = ""
    let filePath = ""
    if (data?.coverImage[0]){
      setfileUploading(true)
      coverImagePath = await uploadFile(data?.coverImage[0])
    }
    if (data?.file[0]){
      setfileUploading(true)
      filePath = await uploadFile(data?.file[0])
    }
    const reqData: CreateArticleData = {
      userId,
      title: data?.title,
      description: data?.description,
      article_link: data?.article_link,
      image: "",
      file_link:"",

    }
    if (coverImagePath) reqData.image = coverImagePath
    if (filePath) reqData.file_link = filePath

    console.log({createArticleData, createArticleLoading, createArticleError, reqData})
    const result  = await createArticle(reqData)
    console.log({result, reqData})
    setfileUploading(false)
    onCancel()
  }

  const inputs = [
    {
      type: 'text',
      placeholder: "title",
      name: "title",
      validationOptions: {
        minLength: 3
      }
    },
    {
      type: 'text',
      placeholder: "description",
      name: "description",
      validationOptions: {
        minLength: 3
      }
    },
    {
      type: 'text',
      placeholder: "article link",
      name: "article_link",
      validationOptions: {
        minLength: 3
      }
    },
    
    {
      type: "file", 
      name: "coverImage",
      placeholder: "cover image",
      data: coverImage
    },
    {
      type: "file",
      placeholder: "file",
      name: "file",
      data: file

    }


  ]
  
  console.log({type})
  console.log({createArticleData, createArticleLoading, createArticleError})
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}  
      className="relative mx-16 space-y-6 xl:mx-0">
      <h2 className="py-2 text-sm font-semibold capitalize text-light-blue-900"> create article </h2>
      {
        fileUploading || createArticleLoading ? (
        <span className="absolute top-0 right-3">
          <BallClipRotateMultiple color="#2cbcfa" loading={true}/>
        </span>
        ) : null
      }

      {
        inputs.filter(el => el.type !== "file").map((el, id) => (
          <Input {...el} register={register} key={id} />
        ))
      
      }
      
      {
        inputs.filter(el => el.type === 'file').map((el,id) => (
          <React.Fragment key={id}>
            <div  className="flex items-center cursor-pointer hover:opacity-80">
              <label htmlFor={el.name} className="flex items-center justify-start space-x-2 cursor-pointer hover:opacity-80">
      
                <Photograph className="w-10 h-10 text-light-blue-900 " />
                <span className="text-sm text-cold-gray-500 ">{el.placeholder}</span>
              </label>
              <input 
                id={el.name} 
                className="hidden"
                name={el.name}
                ref={register} 
                disabled={false} 
                type="file" 
              />
            </div> 
            {
              el.data && el.data[0] && (
                <motion.div 
                  initial={{y:20, opacity:0}} 
                  animate={{y:0, opacity:1}} 
                  transition={{duration: 0.2, type: 'linear'}}
                  className="h-40 border rounded border-light-blue-900">
                  <img className="object-contain w-full h-full" src={window.URL.createObjectURL(el.data[0])} alt={el.placeholder}/>
                </motion.div>
              )
            }
          </React.Fragment>
        ))
      }
      <div className="flex items-center justify-end space-x-4">
        <Button inverted type="button" onClick={handleCancel}>
          cancel
        </Button>
        <Button disabled={fileUploading || createArticleLoading} type="submit">
          create
        </Button>
      </div>
    </form>
  )
}




export default PageCreate