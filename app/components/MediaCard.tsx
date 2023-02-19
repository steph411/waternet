import React from 'react'
import Avatar from '@components/Avatar'
import Button from '@components/Button'
import Link from 'next/link'
import {formatDistance} from 'date-fns'



interface Props{
	className?: string
	coverImage?: string
	category?: string
	title?: string
	description?: string
	likes?: number
	comments?: number
	recommendations?: number
	authorImage?: string
	authorName?: string
	authorWaterIndex?: number
	created_at?: string
	id?: string
}



const MediaCard: React.FC<Props> = (
	{
		className ,
		likes, 
		comments, 
		recommendations, 
		title, 
		description, 
		category, 
		coverImage,
		authorImage,
		authorName,
		authorWaterIndex,
		created_at,
		id
	}
) => {

	const stats = [{name: "likes", value: likes}, {name: "comments", value: comments}, {name: "recommendations", value: recommendations}]
	
	
	return (
    <div
      className={
        "border-2 bg-white border-light-blue-900 min-w-min text-light-blue-900" +
        className
      }
    >
      <div className="relative h-64 bg-light-blue-50 ">
				{
					coverImage && (
						<img className="object-cover w-full h-full" src={coverImage} alt="article cover image" />
					)
				}
        <span className="absolute left-0 px-2 py-1 text-sm text-white top-4 bg-light-blue-900 ">
          {category}
        </span>
      </div>
      <div className="relative p-4 border-t-2 border-light-blue-900">
        <h3 className="pb-4 text-base font-bold text-light-blue-900">{title}</h3>
        <p className="pb-4 text-sm text-light-blue-900">{description}</p>
        <div className="flex justify-between py-4 text-xs font-semibold border-t border-b border-cold-gray-300 text-light-blue-900">
          {stats.map((el, id) => (
            <p className="space-x-2 " key={id}>
              <span>{el.value}</span>
              <span>{el.name}</span>
            </p>
          ))}
        </div>
        <h4 className="py-2 text-sm text-light-blue-900 ">Authored by</h4>
        <div className="flex items-center justify-between space-x-1">
          <div className="flex items-center justify-between space-x-1">
            <Avatar image={authorImage} />
            <div>
              <h5 className="space-x-2 text-xs font-semibold text-light-blue-900">
                <span>{authorName}</span>
                <span>
                  {formatDistance(new Date(created_at), new Date(Date.now()))}
                </span>
              </h5>
              <p className="text-sm text-light-blue-900">
                Water Index  <span className="font-semibold">{authorWaterIndex}</span>
              </p>
            </div>
          </div>
          <div>
            <Button>
              <Link href={`/media/${id}`}>
                <a className="text-xs"> View More</a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}



export default MediaCard