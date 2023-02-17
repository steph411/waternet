import React from 'react';
import {FeedNavBar} from '@components/FeedNavBar'
import { TopBannerAd } from '@components/TopBannerAd'

interface Props{

}



const FeedLayout:React.FC<Props> = ({children}) => {
  return (
    <div className="p-0 bg-gray-200">
      <FeedNavBar />
      <TopBannerAd undefined />
      <main className="pl-56 pr-52 2xl:px-32 xl:px-4">
        <section className="pt-8 feeds-container">
          {children}
        </section>
      </main>
    </div>
  );
}

export default FeedLayout