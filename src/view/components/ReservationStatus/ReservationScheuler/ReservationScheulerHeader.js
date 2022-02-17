import { useRecoilValue } from 'recoil'
import { today } from '../../../../other/util/common/dateUtil'
import { getReservationSchedulerDateArray } from '../../../../other/util/reservation/reservation'
import { dayCountAtom, standardDateAtom } from '../../../../service/state/reservation/atom'
import Day from './Day'

export default function ReservationScheulerHeader() {
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
