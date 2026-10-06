import type {
  SanityImageAssetReference,
  Project,
  SanityImageHotspot,
  SanityImageCrop,
} from '@/sanity.types'
import StyledButton from './Button'
import SanityImage from './SanityImage'

export default function ProjectCard({
  callBack,
  project,
  image,
}: {
  callBack: () => void
  project: Project
  image?: {
    asset?: SanityImageAssetReference
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
}) {
  let banner = image?.asset ? image.asset._ref : project?.coverImage?.asset?._ref
  return (
    <div className="group relative w-full h-full overflow-hidden rounded-lg">
      {/* Hover card content goes here */}
      <StyledButton
        onClick={() => {
          callBack()
        }}
      >
        <div className="-my-2">
          {banner && (
            <SanityImage id={banner} alt={banner || 'Project Image'} className="h-auto w-full" />
          )}
        </div>
      </StyledButton>
      {/* on hover show additional content */}
      <div className="flex flex-col justify-between absolute top-0 left-0 bottom-0 right-0 bg-[#202020] px-12 pb-12 transition-all duration-500 translate-y-full group-hover:translate-y-0">
        <div className="flex flex-col gap-4 top-[45%] relative">
          <h3 className="text-2xl text-white">{project.title}</h3>
          <p className="text-white">{project.company}</p>
        </div>
        <div>
          <StyledButton
            color="primary"
            onClick={() => callBack()}
            className="flex justify-between items-center relative cursor-pointer"
          >
            View Project
            <span className="ml-2 text-white">→</span>
          </StyledButton>
          <span className="block w-30 bg-white h-0.5" />
        </div>
      </div>
    </div>
  )
}
