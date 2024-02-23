import { useModalContext } from '@/contexts/ModalContext'
import { Wedding } from '@/models/wedding'
import { useEffect, useRef } from 'react'

export default function AttendCountModal({ wedding }: { wedding: Wedding }) {
  const { open, close } = useModalContext()
  const haveSeenModal = localStorage.getItem('@have-seen-modal')

  const $input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (haveSeenModal === 'true') {
      return
      // Returns early if haveSeenModal is 'true'
    }

    open({
      title: `현재 참석자: ${wedding.attendCount}`,
      body: (
        <div>
          <input
            ref={$input}
            type="number"
            placeholder="참석 가능 인원을 추가해 주세요"
            style={{ width: '100%' }}
          />
        </div>
      ),
      onLeftButtonClick: () => {
        localStorage.setItem('have-seen-modal', 'true')
        close()
      },
      onRightButtonClick: async () => {
        if ($input.current == null) {
          return null
        }
        await fetch('/db.json', {
          method: 'PUT',
          body: JSON.stringify({
            ...wedding,

            // In JS, the result is a string concatenation when a string is concatenated with a number using the + operator
            // By using Number(), the value is explicitly converted to a numeric type

            attendCount: wedding.attendCount + Number($input.current.value),
          }),
          headers: {
            // Infroms the Server that the payload is formatted as JSON and should be parsed accordingly
            'Content-Type': 'application/json',
          },
        })
        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
    })
  }, [])

  return null
}
