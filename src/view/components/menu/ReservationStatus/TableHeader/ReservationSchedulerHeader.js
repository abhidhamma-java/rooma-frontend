import { useRecoilValue } from 'recoil'
import { today } from '@util/common/dateUtil'
import { getReservationSchedulerDateArray } from '@util/reservation/reservation'
import { dayCountAtom, standardDateAtom } from '@state/reservation'
import Day from './Day'

export default function ReservationSchedulerHeader() {
  const standardDate = useRecoilValue(standardDateAtom)
  const dayCount = useRecoilValue(dayCountAtom)

  const reservationSchedulerDateArray = getReservationSchedulerDateArray(standardDate, dayCount, today)

  return (
    <div className='scheduler-header dF-f'>
      <div className='room-tit'>타입/객실</div>
      <div className='date-row dF-f'>
        {reservationSchedulerDateArray.map((dayData, index) => (
          <Day key={index} {...dayData} />
        ))}
      </div>
    </div>
  )
}
