import { Float } from '@headlessui-float/react'
import { Popover } from '@headlessui/react'

type ComingSoonFeatureProps = {
  children: React.ReactNode
}

export default function ComingSoonFeature({ children }: ComingSoonFeatureProps) {
  return (
    <Popover>
      <Float
        placement="bottom-start"
        offset={12}
        flip={10}
        arrow
        portal
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Button as="div">{children}</Popover.Button>

        <Popover.Panel className="my-menu-container !min-w-[105px] bg-opacity-25">Coming Soon!</Popover.Panel>
      </Float>
    </Popover>
  )
}
