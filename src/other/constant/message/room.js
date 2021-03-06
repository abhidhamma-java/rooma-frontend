import { makeEmptyMessage, makeUnselectedMessage } from './common'

export const ACCOMMODATION_UNSELECTED = makeUnselectedMessage('숙소명')
export const ROOM_TYPE_UNSELECTED = makeUnselectedMessage('객실타입명')
export const ROOM_NAME_IS_EMPTY = makeEmptyMessage('객실명')
export const SALE_START_DATE_IS_EMPTY = makeEmptyMessage('판매시작일')
export const SALE_END_DATE_IS_EMPTY = makeEmptyMessage('판매종료일')
