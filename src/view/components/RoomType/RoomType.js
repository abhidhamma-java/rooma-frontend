import { useRecoilValue } from 'recoil'
import { dayCountAtom } from '../../../data/state'
import RoomReservation from './RoomReservation'

export default function RoomType({ roomType }) {
  //지금 해야할것
  //roomNumber에 맞게 reservation을 보내야한다
  //

  return (
    <div className='scheduler-rows dF-f'>
      {/* <!-- 01 --> */}
      <div className='room-type'>{roomType.roomTypeName}</div>
      <div className='room-number'>
        {roomType.roomNumbers.map((roomNumber, index) => (
          <div key={index}>{roomNumber}</div>
        ))}
      </div>
      <div className='room-state'>
        {roomType.monthPriceList.map((monthPrice, index) => {
          const roomNumber = roomType.roomNumbers[index]
          return <RoomReservation key={index} monthPrice={monthPrice} roomNumber={roomNumber} />
        })}
      </div>
    </div>
  )
}
