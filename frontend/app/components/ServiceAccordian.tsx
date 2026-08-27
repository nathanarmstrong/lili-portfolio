'use client'

import {Service} from '@/sanity.types'
import {useState} from 'react'
import PortableText from '@/app/components/PortableText'
import {PortableTextBlock} from 'next-sanity'

export default function ServiceAccordian({service, index}: {service: Service; index: number}) {
  // const [activeService, setActiveService] = useState<string[]>([])
  const [openAccordian, setOpenAccordian] = useState<boolean>(false)

  return (
    <div
      key={service._id}
      className={
        `flex flex-col gap-6 mb-6 border-b border-gray-100 group` + (index === 0 ? ' border-t' : '')
      }
      onClick={() => setOpenAccordian(!openAccordian)}
    >
      {/* Accordian */}
      <div className="flex flex-row gap-6 mb-6 items-center py-10 ">
        <div className="flex flex-row gap-6 items-center">
          {/* Three Circle Triangle */}
          <div
            className={`flex gap-2 w-[70px] h-[60px] relative p-1 origin-center group-hover:rotate-90 duration-300 ease-in-out ${openAccordian && 'rotate-90'}`}
          >
            <div
              className={`w-[26px] h-[26px] absolute rounded-full top-0 left-1/2 transform -translate-x-1/2 duration-500 ease-in-out group-hover:bg-gray-100 ${openAccordian ? 'bg-gray-100' : 'bg-gray-800'}`}
            />
            <div className="w-[26px] h-[26px] absolute left-0 bottom-0 rounded-full  bg-gray-800" />
            <div className="w-[26px] h-[26px] absolute right-0 bottom-0 rounded-full  bg-gray-800" />
          </div>
          {/* Title */}
          <h2 className="heading-bold text-2xl">{service.title}</h2>
        </div>
        {/* Small Description */}
        <p className="text-sm">{service.description}</p>
      </div>
      {/* Hidden Accordian Blocks */}
      <div
        className={`grid transition-all duration-500 overflow-hidden ease-in-out ${
          openAccordian ? 'max-h-[1000px]' : 'max-h-[0]'
        }`}
      >
        <div
          className={`grid grid-cols-3 overflow-hidden gap-6 mb-6 transition-opacity duration-500 ease-in-out ${
            openAccordian ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {service.capabilities?.map((capability, index) => (
            <div key={index} className="flex flex-col gap-6 mb-6">
              <h3 className="heading-bold text-xl">{capability.title}</h3>
              <PortableText value={capability?.description as PortableTextBlock[]} />
            </div>
          ))}
        </div>
      </div>
      <div className={`flex flex-col overflow-hidden gap-6 mb-6 items-end min-h-[30px]`}>
        {openAccordian ? (
          <span>
            <img src="/images/VectorMinus.svg" alt="-" />
          </span>
        ) : (
          <span>
            <img src="/images/VectorPlus.svg" alt="+" />
          </span>
        )}
      </div>
    </div>
  )
}
