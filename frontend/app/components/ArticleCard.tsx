'use client'
import {useState} from 'react'
import {Article} from '@/sanity.types'
import StyledButton from './Button'
import ArticleModal from './Modal/ArticleModal'

export default function ArticleCard({article}: {article: Article}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <div className="flex flex-col gap-4 bg-[#202020] p-4 min-w-[330px] w-[21vw] justify-between justify-self-center aspect-[33/40]">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl text-white">{article?.title}</h3>
          <p className="text-white">{article?.description}</p>
          <p>{article?.readTime} READ</p>
        </div>
        <div className="group">
          <StyledButton
            color="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex justify-between items-center max-w-[110px] min-w-[110px] group-hover:max-w-full group-hover:min-w-full transition-all duration-500 relative"
          >
            Read More
            <span className="ml-2 text-white group-hover:max-w-full transition-all duration-500 absolute right-0 top-1/2 transform -translate-y-1/2">
              →
            </span>
          </StyledButton>
          <span className="block bg-white h-0.5 max-w-[110px] group-hover:max-w-full transition-all duration-500" />
        </div>
      </div>
      <ArticleModal article={isModalOpen ? article : null} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
