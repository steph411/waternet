import React, {useState} from 'react';
import Input from '@components/Input'
import {useForm} from 'react-hook-form'
import Photograph from '@components/logos/Photograph'
import Button from '@components/Button'
import {motion} from 'framer-motion'
import {CREATE_GROUP} from '@queries'
import {useMutation} from 'urql'
import {useRouter} from 'next/router'
import { uploadFile } from '@functions'
import {BallClipRotateMultiple } from 'react-pure-loaders'



interface Props{
  className?: string
  userId?: string
  onCancel: Function
}

interface CreateGroupData{
  name: string,
  description: string
  image?: string,
  logo?: string
}



const CreateGroup:React.FC<Props> = ({className, userId, onCancel}) => {
 
  const {register, errors , handleSubmit, watch} = useForm()
  const [{data: createGroupData, fetching: createGroupLoading, error: createGroupError}, createGroup] = useMutation(CREATE_GROUP)
  const coverImage = watch('coverImage')
  const groupLogo = watch('groupLogo')
  const [fileUploading, setfileUploading] = useState(false)
  
  const router = useRouter()
  
  const handleCancel = (e) => {
    onCancel()
  }
  

  const onSubmit = async (data) => {
    // we first upload the images if any
    let coverImagePath = ""
    let groupLogoPath = ""
    if (data?.coverImage[0]){
      setfileUploading(true)
      coverImagePath = await uploadFile(data?.coverImage[0])
    }
    if (data?.groupLogo[0]){
      setfileUploading(true)
      groupLogoPath = await uploadFile(data?.groupLogo[0])
    }
    const reqData: CreateGroupData = {
      name: data?.name,
      description: data?.description,
    }
    if (coverImagePath) reqData.image = coverImagePath
    if (groupLogoPath) reqData.logo = groupLogoPath

    const result  = await createGroup(reqData)
    console.log({result})
    router.push(`/groups/${result.data?.insert_groups_one.id}`)
    setfileUploading(false)
  }

  console.log({createGroupData, createGroupError, createGroupLoading})
  console.log(createGroupData?.insert_groups_one.id)
  const inputs = [
    {
      type: 'text',
      placeholder: "name",
      name: "name",
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
      type: "file", 
      name: "coverImage",
      placeholder: "cover image",
      data: coverImage
    },
    {
      type: "file",
      placeholder: "logo",
      name: "groupLogo",
      data: groupLogo

    }


  ]
  
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}  
      className="relative mx-16 space-y-6 xl:mx-0">
      <h2 className="py-2 text-sm font-semibold capitalize text-light-blue-900"> create group </h2>
      {
        fileUploading || createGroupLoading ? (
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
        <Button disabled={fileUploading || createGroupLoading} type="submit">
          create
        </Button>
      </div>
    </form>
  )
}




export default CreateGroup