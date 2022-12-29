import { Float } from '@headlessui-float/react'
import { Popover } from '@headlessui/react'
import { MouseEvent } from 'react'

export type ConfirmProps = {
  popoverButton: React.ReactElement
  onClick: () => void
  content?: string | React.ReactNode
}

export default function Confirm({
  popoverButton,
  onClick,
  content = 'This action cannot be undone. Would you like to proceed?',
}: ConfirmProps) {
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
        {popoverButton}

        <Popover.Panel
          className="my-menu-container bg-opacity-25"
          onContextMenu={(event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault()
            event.stopPropagation()
          }}
        >
          {({ close }) => (
            <>
              <div className="w-52 mb-4">{content}</div>
              <span className="flex gap-x-2">
                <button className="!py-0 !px-1.5 warning-btn" onClick={onClick}>
                  Yes
                </button>
                <button
                  className="!py-0 !px-1.5 secondary-btn"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    close()
                  }}
                >
                  No
                </button>
              </span>
            </>
          )}
        </Popover.Panel>
      </Float>
    </Popover>
  )
}
