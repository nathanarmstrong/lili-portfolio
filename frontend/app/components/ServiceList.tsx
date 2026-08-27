import StyledButton from './Button'
import type {Service} from '@/sanity.types'

export default function ServiceList({
  service,
  filter,
  activeService,
  setActiveService,
}: {
  service: Service
  filter: (serviceId: string) => void
  activeService: string
  setActiveService: (serviceId: string) => void
}) {
  const changeActiveService = async (serviceId: string) => {
    const newActiveServices = activeService === serviceId ? '' : serviceId
    setActiveService(newActiveServices)
    filter(newActiveServices)
  }

  return (
    <div className="flex flex-wrap gap-4">
      <StyledButton
        key={service._id}
        onClick={() => {
          changeActiveService(service._id)
        }}
        color={activeService !== service._id ? 'tertiary' : 'primary'}
        solid
      >
        {service.title}
      </StyledButton>
    </div>
  )
}
