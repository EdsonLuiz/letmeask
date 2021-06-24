import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string
}

export function RoomCode({code}: RoomCodeProps) {

  function copyRoomToClipboard() {
    navigator.clipboard.writeText(code)
  }
  return (
    <button className="room-code" onClick={copyRoomToClipboard}>
      <div>
        <img src={copyImg} alt="representaçao gráfica de cópiar" />
      </div>
      <span>Sala #{code}</span>
    </button>
  )
}