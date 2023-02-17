import { FC } from 'react'

export type FCWithLayout<T> = FC<T> & {Layout: FC} 


export enum ArticleType  {
  scientific = "scientific",
  whitepaper = "whitepaper"
}

export enum FeedType{
  post = "POSTS",
  digital = "DIGITAL"
}