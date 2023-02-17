import React from 'react'



interface Props{
  className?: string
}


const NewsFeed: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      className={"" + className}
      viewBox="-.5 -.5 59 59"
      // style="background-color:#fff"
    >
      <defs/>
      <image width="57.6" height="57.6" x="-.8" y="-.8" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
</svg>
  )
}

export default NewsFeed