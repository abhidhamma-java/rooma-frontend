import { ROOM_LIST_URL } from '@constant/locationURLs'
import useCreateAccommodationCallback from '@hook/apiHook/useCreateAccommodationCallback'
import { createRoomSelector, readRoomListSelector } from '@state/accommodationManagement/room'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyMMddWithDot, formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { loadItem } from '@util/common/localStorage'
import { validateRoomForm } from '@util/validation/validateRoomForm'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE } from 'recoil'
import RoomForm from './Form'

export default function CreateRoom() {
  const createRoomCallback = useCreateAccommodationCallback('create Room')

  let navigate = useNavigate()
  const user = loadItem('user')
  const today = new Date()
  const defaultSaleStartdate = formatyyyyMMddWithHyphen(today)

  const defaultValues = {
    cpNo: user.cpNo,
    acNo: 'unSelected',
    rtNo: '1',
    saleStartdate: defaultSaleStartdate,
    saleEnddate: '',
    name: '',
    useYn: 'Y',
    description: '',
  }
  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })

  const data = {
    cpNo: user.cpNo,
    name: '',
    startRow: '0',
    rowCount: '999',
    rtNo: watch('rtNo'),
  }
  const resetReadRoomListSelector = useRecoilRefresher_UNSTABLE(
    readRoomListSelector(getFormDataFromJson(data))
  )

  const onSubmit = _.flow(
    validateRoomForm,
    getFormDataFromJson,
    createRoom(createRoomCallback, navigate, resetReadRoomListSelector)
  )
  return (
    <RoomForm
      formType={'등록'}
      titleText={'객실등록'}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      watch={watch}
      reset={reset}
      getValues={getValues}
    />
  )
}
const createRoom = (createRoomCallback, navigate, resetReadRoomListSelector) => (formData) => {
  if (formData === false) {
    return
  }

  createRoomCallback(createRoomSelector(formData)).then((data) => {
    const { message } = data
    if (message === '성공') {
      alert('등록되었습니다.')
      navigate(ROOM_LIST_URL)
      resetReadRoomListSelector()
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}
