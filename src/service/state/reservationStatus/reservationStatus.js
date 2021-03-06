import {
  lockRoom,
  readReservationPrice,
  unlockRoom,
  updateCleaningStatus,
  updateReservationDate,
  updateReservationStatus,
} from '@api/reservationStatus/reservationStatus'
import {
  ADD_RESERVATION_ROOM_COUNT_ATOM_KEY,
  LOCK_ROOM_SELECTOR_KEY,
  READ_RESERVATION_PRICE_SELECTOR_KEY,
  RIGHT_CLICK_POPUP_ATOM_KEY,
  READ_RESERVATION_PARAMETER_ATOM_KEY,
  UNLOCK_ROOM_SELECTOR_KEY,
  UPDATE_RESERVATION_DATE_SELECTOR_KEY,
  UPDATE_RESERVATION_STATUS_SELECTOR_KEY,
  IS_MOUSE_DOWN_ATOM_KEY,
  SELECTED_CELL_ARRAY,
  SELECTED_CELL_ARRAY_ATOM_KEY,
  UPDATE_CLEANING_STATUS_SELECTOR_KEY,
} from '@constant/atomKeys'
import { removeCookie } from '@util/common/cookie'
import { removeItem } from '@util/common/localStorage'
import { atom, selectorFamily } from 'recoil'

//atom
export const addReserverationRoomCountAtom = atom({
  key: ADD_RESERVATION_ROOM_COUNT_ATOM_KEY,
  default: 1,
})
export const rightClickPopupAtom = atom({
  key: RIGHT_CLICK_POPUP_ATOM_KEY,
  default: { display: 'none', screenX: '0', screenY: '0', position: 'absolute' },
})
export const readReservationParameterAtom = atom({
  key: READ_RESERVATION_PARAMETER_ATOM_KEY,
  default: { rrNo: 0, rmNo: 0 },
})
export const isMouseDownAtom = atom({
  key: IS_MOUSE_DOWN_ATOM_KEY,
  default: false,
})
export const selectedCellArrayAtom = atom({
  key: SELECTED_CELL_ARRAY_ATOM_KEY,
  default: {},
})

//selector
export const readReservationPriceSelector = selectorFamily({
  key: READ_RESERVATION_PRICE_SELECTOR_KEY,
  get:
    ({ acNo, startDate, endDate }) =>
    async () => {
      if (acNo === undefined) {
        console.log('acNo없음')
      }
      try {
        return await readReservationPrice({ acNo, startDate, endDate })
      } catch (error) {
        removeItem('user')
        removeCookie('jwttoken')
        window.location = '/'
        console.log('readReservationPriceSelector 에러')
        console.log(error)
      }
    },
})
export const lockRoomSelector = selectorFamily({
  key: LOCK_ROOM_SELECTOR_KEY,
  get: (formData) => async () => await lockRoom(formData),
})
export const unlockRoomSelector = selectorFamily({
  key: UNLOCK_ROOM_SELECTOR_KEY,
  get: (formData) => async () => await unlockRoom(formData),
})
export const updateReservationStatusSelector = selectorFamily({
  key: UPDATE_RESERVATION_STATUS_SELECTOR_KEY,
  get: (formData) => async () => await updateReservationStatus(formData),
})
export const updateReservationDateSelector = selectorFamily({
  key: UPDATE_RESERVATION_DATE_SELECTOR_KEY,
  get: (formData) => async () => await updateReservationDate(formData),
})
export const updateCleaningStatusSelector = selectorFamily({
  key: UPDATE_CLEANING_STATUS_SELECTOR_KEY,
  get: (formData) => async () => await updateCleaningStatus(formData),
})
