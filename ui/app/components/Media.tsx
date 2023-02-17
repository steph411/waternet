import React from 'react'
import {isImage, isVideo} from "@functions"
import ReactPlayer from 'react-player'



interface Props{
  className?: string
  name?: string
  url: string
}




const Media: React.FC<Props> = ({name, url}) => {
  console.log({url,name})
  console.log({isimage: isImage(name), isVideo: isVideo(name)})
  if (name && isImage(name)){
    console.log({isImageandname: name})
    return (

      <img
        src={url}
        className="object-contain w-full max-h-full"
      />
    ); 
  }
  if (name && isVideo(name)){
    console.log({isvideoandname: name})
    return(

      <div className="player-wrapper">
        <ReactPlayer 
          width="100" 
          height="100%" 
          className="react-player" 
          // playing={true}
          controls={true}
          url={url} />
      </div>
    )

  }
  if (isImage(url)){
    console.log({isimageandurl: url})
    return (
      <img
        src={url}
        className="object-cover w-full max-h-full"
      />
    ); 
  }
  if (isVideo(url)){
    console.log({isvideoandurl: url});
    return (
      <div className="player-wrapper">
        <ReactPlayer
          width="100"
          height="100%"
          className="react-player"
          // playing={true}
          controls={true}
          url={url}
        />
        
      </div>
    ); 
  }
  return null
}

export default Media