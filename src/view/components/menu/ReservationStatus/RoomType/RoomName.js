import useApiCallback from '@hook/apiHook/useApiCallback'
import { currentAccommodationAtom } from '@state/common/common'
import { dayCountAtom, standardDateAtom } from '@state/reservation'
import {
  lockRoomSelector,
  readReservationPriceSelector,
  unlockRoomSelector,
} from '@state/reservationStatus/reservationStatus'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { addDays } from 'date-fns/fp'
import _ from 'lodash/fp'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'

export default function RoomName({ rtName, room, rmNo, reservationList, lockedRoomList }) {
  const lockRoomCallback = useApiCallback('lockRoom')
  const unlockRoomCallback = useApiCallback('unlockRoom')

  const accommodation = useRecoilValue(currentAccommodationAtom)
  const dayCount = useRecoilValue(dayCountAtom)
  const standardDate = useRecoilValue(standardDateAtom)

  const parameter = {
    acNo: accommodation.acNo,
    startDate: formatyyyyMMddWithHyphen(addDays(-5)(standardDate)),
    endDate: formatyyyyMMddWithHyphen(addDays(29)(standardDate)),
  }

  const resetReadReservationPrice = useRecoilRefresher_UNSTABLE(
    readReservationPriceSelector(parameter)
  )

  const formatDate = _.map((number) => formatyyyyMMddWithHyphen(addDays(number)(standardDate)))
  const filterReservationDate = _.filter(
    (date) => reservationList.find((reservation) => reservation.checkinDate === date) === undefined
  )
  const joinComma = _.join(',')
  const makeLockDateString = _.flow(_.range(0), formatDate, filterReservationDate, joinComma)
  const lockDateString = makeLockDateString(dayCount)

  // const makeLockAbleDateArray = _.flow(_.range(0), formatDate, filterReservationDate)
  // const lockAbleDateArray = makeLockAbleDateArray(dayCount)
  const formatLockedRoomList = _.map((lockedRoom) => lockedRoom.lockDate)
  const lockedRoomArray = formatLockedRoomList(lockedRoomList)
  // const minus = lockAbleDateArray.length - lockedRoomArray.length

  // let isAllLocked = false
  // if (minus === 0) {
  //   isAllLocked = true
  // } else if (minus > 0) {
  //   isAllLocked = false
  // } else {
  //   isAllLocked = true
  // }
  const isAllLocked = lockedRoomArray.length > 0

  const handleAllLock = () => {
    if (isAllLocked) {
      const isConfirm = window.confirm('?????? ????????? ?????????????????????????')

      if (isConfirm) {
        unlockRoomCallback(
          unlockRoomSelector(getFormDataFromJson({ rmNo, lockDate: lockDateString }))
        ).then((result) => {
          const { message } = result
          if (message === '??????') {
            resetReadReservationPrice()
          }
        })
      }
    } else {
      const isConfirm = window.confirm('????????? ??????????????????????')
      if (isConfirm) {
        lockRoomCallback(
          lockRoomSelector(getFormDataFromJson({ rmNo, lockDate: lockDateString }))
        ).then((result) => {
          const { message } = result
          if (message === '??????') {
            resetReadReservationPrice()
          }
        })
      }
    }
  }
  return (
    <div style={{ width: '150px' }}>
      <a href='#' className={isAllLocked ? 'key lock' : 'key unlock'} onClick={handleAllLock}>
        <span className='hidden'>??????/??????</span>
      </a>
      <span>{`${room.rmName} ${rmNo}`}</span>
    </div>
  )
}
