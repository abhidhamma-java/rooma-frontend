import { selectedDateAtom } from '@state/common/calendar'
import { formatdd } from '@util/common/dateUtil'
import { isSameDay, isSaturday, isSunday } from 'date-fns'
import { useRecoilState } from 'recoil'

export default function Day({ date, dateName }) {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom)

  const className = makeClassName(date, selectedDate[dateName])
  const dd = formatdd(date)
  const selectDate = () => setSelectedDate((prev) => ({ ...prev, [dateName]: date }))

  return (
    <td>
      <div className={className} onClick={selectDate}>
        {dd}
      </div>
    </td>
  )
}
const makeClassName = (date, selectedDate) => {
  let classNameString = 'day'
  if (isSunday(date)) {
    classNameString += ' sun'
  } else if (isSaturday(date)) {
    classNameString += ' sat'
  }

  if (isSameDay(date, selectedDate)) {
    classNameString += ' today'
  }
  return classNameString
}