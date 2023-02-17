import imageExtensions from './image-extensions'
import videoExtensions from './video-extensions'



export const uploadFile = async (fileData) => {
  console.log({fileData})
  const uploadUrl = "/api/files/upload"
  const formData = new FormData()
  formData.append("file", fileData)
  
  const response = await fetch(uploadUrl, {
    method: "POST",
    body: formData
  })
  const responseData = await response.json()
  return responseData.filePath

}




export const isImage = (filePath: string):Boolean => {
  const fileExtension = filePath?.split(".")?.pop()
  console.log({splitsfile: filePath?.split(".")})
  console.log({fileExtension, splitsfile: filePath?.split(".")})
  return imageExtensions.includes(fileExtension)
}






export const isVideo = (filePath: string): Boolean => {
  const fileExtension = filePath?.split(".")?.pop()
  console.log({fileExtension})
  return videoExtensions.includes(fileExtension) 
}