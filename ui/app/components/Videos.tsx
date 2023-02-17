import React, {useState} from 'react'




export const Videos: React.FC = ({ }) => {
 
  const videos = [
    {
      id: "qa7o_E5IsDk",
      title: "Water is security",
      description: "Water is a strategic resource and an essential element of national and regional security. OSCE works to make water a resource for co-operation and not competition."
    },
    {
      id: "-CshhhrS1ww",
      title: "The digital water future",
      description: "The digitisation of water was a central theme at the IWA #WorldWaterCongress. Keynotes, panelists, workshops and exhibitors all aligned in the contribution to a common understanding of the digital water future. Listen to the IWA membership and how it intends to contribute to the topic. "
    },
    {
      id: "M3lTPZw5sOc",
      title: "Clean water AI",
      description: "Clean Water AI is a device that uses a deep learning neural network to detect dangerous bacteria and harmful particles in water. Users can see drinking water at a microscopic level, just like they would view footage from a security camera, with real-time detection and contamination mapping."
    },
    {
      id: "Gucig7AJvhU",
      title: "Scientists have created edible water",
      description: "Ooho by Skipping Rocks Lab is an edible water bottle created out of 100% biodegradable brown algae that is an environmental-friendly alternative to plastic bottles"
    }
  ]

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);


  const getVideoThumbnail = (videoId: string) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  
  const getVideoUrl = (videoId) => `https://www.youtube.com/embed/${videoId}`


  

  return (
    <section className="mb-12 px-72 lg:px-16 xl:px-32">
      <div className="flex p-4 space-x-4 bg-cold-gray-200">
        <div className="w-1/2 h-full rounded-lg shadow-md">
          <div className="absolute w-full" id="video-container">

            <iframe
              id="iframe-video"
              className="absolute top-0 left-0 w-full h-full"
              src={getVideoUrl(selectedVideo.id)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            >
            </iframe>
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <h3 className="mb-2 text-xl font-semibold text-cold-gray-600">
            { selectedVideo.title }
          </h3>
          <p className="text-base text-cold-gray-500">{ selectedVideo.description }</p>
          <div className="flex justify-between w-full mt-auto space-x-2 h-1/3">
            {
              videos.map((video) => (
                <div
                  className="w-1/3 h-full rounded-lg shadow-md cursor-pointer bg-cold-gray-300"
                  key={video.id}
                  onClick={(event) => setSelectedVideo(video)}
                >
                  <img className="w-full h-full " src={getVideoThumbnail(video.id)} alt="video thumbnail" />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}
