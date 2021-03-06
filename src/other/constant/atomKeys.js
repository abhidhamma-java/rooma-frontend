//common
export const IS_LOGGED_IN_ATOM_KEY = 'isLoggedInAtom'

//common-header
export const CURRENT_COMPANY_ATOM_KEY = 'currentCompanyAtom'
export const CURRENT_ACCOMMODATION_ATOM_KEY = 'currentAccommodationAtom'

//common-paging
export const TOTAL_COUNT_ATOM_KEY = 'totalCountAtom'
export const CURRENT_PAGE_ATOM_KEY = 'currentPageAtom'
export const CURRENT_INDEX_ATOM_KEY = 'currentIndexAtom'

//common-search
export const SEARCH_KEYWORD_ATOM_KEY = 'searchKeywordAtom'

//common-form
export const DEFAULT_VALUES_ATOM_KEY = 'defaultValuesAtom'
export const ROOM_SELECT_ATOM = 'roomSelectAtom'

//common-calendar
export const SELECTED_DATE_ATOM_KEY = 'selectedDateAtom'
export const SELECTED_MONTH_ATOM_KEY = 'selectedMonthAtom'
export const SHOW_CALENDAR_ATOM = 'showCalendarAtom'

//common-popup
export const DIMMD_LEYER_ATOM_KEY = 'dimmdLayerAtom'

//common-sidebar
export const SIDEBAR_OPEN_ATOM_KEY = 'sidebarOpenAtom'

//예약현황
//atom
export const RENDER_COUNT_ATOM_KEY = 'renderCountAtom'
export const ROOMTYPE_LIST_ATOM_KEY = 'roomTypeListAtom'
export const RESERVATION_LIST_ATOM_KEY = 'reservationListAtom'
export const CURRENT_RESERVATION_ATOM_KEY = 'currentReservationAtom'
export const DAY_COUNT_ATOM_KEY = 'dayCountAtom'
export const STANDARD_DATE_ATOM_KEY = 'standardDateAtom'
export const IS_DISPLAY_CREATE_RESERVATION_ATOM_KEY = 'isDisplayCreateReservationAtom'
export const IS_DISPLAY_READ_RESERVATION_ATOM_KEY = 'isDisplayReadReservationAtom'
export const DISPLAY_ATOM_KEY = 'displayAtom'
export const LOCKED_ROOM_LIST_ATOM_KEY = 'lockedRoomListAtom'
export const OVERLAY_ATOM_KEY = 'overlayAtom'
export const RIGHT_CLICK_POPUP_ATOM_KEY = 'rightClickPopupAtomKey'
export const READ_RESERVATION_PARAMETER_ATOM_KEY = 'readReservationParameterAtomKey'
export const IS_MOUSE_DOWN_ATOM_KEY = 'isMouseDownAtomKey'
export const SELECTED_CELL_ARRAY_ATOM_KEY = 'selectedCellArrayAtomKey'

//selector
export const READ_RESERVATION_PRICE_SELECTOR_KEY = 'readReservationPriceSelectorKey'
export const LOCK_ROOM_SELECTOR_KEY = 'lockRoomSelectorKey'
export const UNLOCK_ROOM_SELECTOR_KEY = 'unlockRommSelectorKey'
export const UPDATE_RESERVATION_STATUS_SELECTOR_KEY = 'updateReservationStatusSelectorKey'
export const UPDATE_RESERVATION_DATE_SELECTOR_KEY = 'updateReservationDateSelectorKey'
export const UPDATE_CLEANING_STATUS_SELECTOR_KEY = 'updateCleaningStatusSelectorKey'

//예약현황 - 예약팝업
export const ADD_RESERVATION_ROOM_COUNT_ATOM_KEY = 'addReservationRoomCountAtomKey'
export const CREATE_RESERVATION_ATOM_KEY = 'createReservationAtomKey'
export const PAY_FORM_COUNT_ATOM_KEY = 'payFormCountAtomKey'

export const CREATE_RESERVATION_SELECTOR_KEY = 'createReservationSelectorKey'
export const READ_RESERVATION_SELECTOR_KEY = 'readReservationSelectorKey'
export const READ_POSSIBLE_ROOM_LIST_SELECTOR_KEY = 'readPossibleRoomListSelectorKey'
export const DELETE_PAY_RECORD_SELECTOR_KEY = 'deletePayRecordSelectorKey'

//auth
export const AUTH_RESULT_ATOM_KEY = 'authResultAtom'
export const USER_ATOM_KEY = 'userAtom'

//숙소관리 - 숙소등록관리(Accommodation)
export const ACCOMODATION_LIST_ATOM_KEY = 'accommodationListAtomKey'
export const CREATE_ACCOMMODATION_SELECTOR_KEY = 'createAccommodationKey'
export const READ_ACCOMMODATION_LIST_SELECTOR_KEY = 'readAccommodationListKey'
export const READ_ACCOMMODATION_SELECTOR_KEY = 'readAccommodationKey'
export const UPDATE_ACCOMMODATION_SELECTOR_KEY = 'updateAccommodationKey'
export const READ_AREA_LIST_SELECTOR_KEY = 'readAreaListSelectorKey'

export const BREAKFAST_OPTION_COUNT_ATOM_KEY = 'breakfastOptionCountAtomKey'
export const EXT_OPTION_COUNT_ATOM_KEY = 'extOptionCountAtomKey'

//숙소관리 - 객실타입등록관리(RoomType)
export const CREATE_ROOMTYPE_SELECTOR_KEY = 'createRoomTypeKey'
export const READ_ROOMTYPE_LIST_SELECTOR_KEY = 'readRoomTypeListKey'
export const READ_ROOMTYPE_SELECTOR_KEY = 'readRoomTypeKey'
export const UPDATE_ROOMTYPE_SELECTOR_KEY = 'updateRoomTypeKey'

export const BREAKFAST_CONFIG_OPTION_COUNT_ATOM_KEY = 'breakfastConfigOptionCountAtomKey'
export const ETC_CONFIG_OPTION_COUNT_ATOM_KEY = 'etcConfigOptionCountAtomKey'
export const RTNO_ATOM_KEY = 'rtNoAtomKey'

//숙소관리 - 객실관리(Room)
export const CREATE_ROOM_SELECTOR_KEY = 'createRoomSelectorKey'
export const READ_ROOM_SELECTOR_KEY = 'readRoomSelectorKey'
export const READ_ROOM_LIST_SELECTOR_KEY = 'readRoomListSelectorKey'
export const UPDATE_ROOM_SELECTOR_KEY = 'updateRoomSelectorKey'
export const DELETE_ROOM_SELECTOR_KEY = 'deleteRoomSelectorKey'

//숙소관리 - 이미지
export const READ_IMAGE_LIST_SELECTOR_KEY = 'readImageListSelectorKey'
export const READ_IMAGE_SELECTOR_KEY = 'readImageSelectorKey'
export const CREATE_IMAGE_SELECTOR_KEY = 'createImageSelectorKey'
export const DELETE_IMAGE_SELECTOR_KEY = 'deleteImageSelectorKey'

//user
export const SIGNIN_SELECTOR_KEY = 'signInSelector'
export const SIGNUP_SELECTOR_KEY = 'signUpSelector'

//company
export const READ_COMPANY_SELECTOR_KEY = 'readCompanySelectorKey'
export const READ_COMPANY_LIST_SELECTOR_KEY = 'readCompanyListSelectorKey'
export const UPDATE_COMPANY_SELECTOR_KEY = 'updateCompanySelectorKey'
export const CREATE_MEMBER_SELECTOR_KEY = 'createMemberSelectorKey'
export const DELETE_MEMBER_SELECTOR_KEY = 'deleteMemberSelectorKey'
export const READ_MEMBER_LIST_SELECTOR_KEY = 'readMemberListSelectorKey'

//요금관리 - 탭
export const PRICE_MANAGEMENT_TAB = 'priceManagementTab'

//요금관리 - 객실타입별요금관리
export const UPDATE_ROOMTYPE_PRICES_SELECTOR_KEY = 'updateRoomTypePricesSelectorKey'
export const CURRENT_PERIOD_PRICE_MANAGEMENT_ROOM_TYPE = 'currentPeriodPriceManagementRoomType'
export const CURRENT_PERIOD_PRICE_MANAGEMENT_WEEK_PRICES = 'currentPeriodPriceManagementWeekPrices'
export const UPDATE_ROOM_PRICE_PERIOD_SELECTOR_KEY = 'updateRoomPricePeriodSelectorKey'
export const READ_ROOM_PRICE_SELECTOR_KEY = 'readRoomPriceSelectorKey'

//요금관리 - 날짜별요금관리
export const CALENDAR_PRICE_MANAGEMENT_CURRENT_MONTH = 'calendarPricemanagementCurrentMonth'
export const READ_ROOM_PRICE_CALENDAR_SELECTOR_KEY = 'readRoomPriceCalendarSelectorKey'
export const UPDATE_ROOM_PRICE_CALENDAR_SELECTOR_KEY = 'updateRoomPriceCAlendarSelectorKey'

//예약관리
export const READ_RESERVATION_LIST_SELECTOR_KEY = 'readReservationListSelectorKey'
export const READ_RESERVATION_LIST_ATOM_KEY = 'readReservationListAtomKey'

//정산관리
export const READ_CALCULATE_RESERVATION_LIST_SELECTOR_KEY =
  'readCalculateReservationListSelectorKey'
export const AMOUNT_ATOM_KEY = 'amountAtomKey'

//청소관리
export const CLEANING_DAY_COUNT_ATOM_KEY = 'cleaningDayCountAtomKey'
export const CLEANING_STANDARD_DATE_ATOM_KEY = 'cleaningStandardDateAtomKey'
export const CLEANGING_POPUP_ATOM_KEY = 'cleaningPopupAtomKey'

export const READ_CLEANING_STATUS_LIST_SELECTOR_KEY = 'readCleaningStatusListSelectorKey'
