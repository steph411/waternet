import React from 'react'
import WaterAnsers from '@components/logos/WaterAnswers'
import WaterMedia from '@components/logos/WaterMedia'
import ClockLogo from '@components/logos/Clock'
import WaterTv from '@components/logos/WaterTv'
import AdSection from '@components/AdSection'


interface Props {
  className?: string
  questions: number
  answers: number


}



const WaterAnswersSidebar: React.FC<Props> = ({className, questions, answers}) => {
  
  const stats = [
    {name: 'questions', logo: WaterAnsers, value: questions},
    {name: 'answers', logo: WaterTv, value: answers},
    {name: 'best answers', logo: ClockLogo},
    {name: 'trending questions', logo: WaterTv},
    {name: 'water research', logo: WaterTv},
  ]


  return (
    
    <aside className={"space-y-5 w-60 " + className}>
               
      <div className="bg-white rounded-lg shadow">
        <div className="py-3 font-semibold text-center text-white rounded-t-lg text-md bg-light-blue-900">
            Stats
        </div>
        <div className="overflow-y-scroll divide-y divide-cold-gray-200 max-h-80">
          {
            stats.map((el, id) => (
              <div key={id} className="flex items-center py-2 pl-2 space-x-2 cursor-pointer hover:bg-cold-gray-50">
                <el.logo className="w-8 h-8 text-light-blue-900" />
                <span className="inline-block text-sm font-semibold text-light-blue-900">{ el.name}  ({el.value || 0})</span> 
              </div>
            ))
          }
        </div>
      </div>	
      <AdSection />

    </aside>
  )
}



export default WaterAnswersSidebar