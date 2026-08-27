import React from 'react'

export default function ModalWrapper({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/50 text-black overflow-y-auto">
          <div className="bg-white p-6 w-full h-fit">
            {children}
            <button onClick={onClose} className="absolute top-4 right-4">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
