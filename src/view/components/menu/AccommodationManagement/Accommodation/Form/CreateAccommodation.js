import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import useCreateAccommodationCallback from '@hook/apiHook/useCreateAccommodationCallback'
import { createAccommodationSelector } from '@state/accommodation/accommodation'
import AccommodationForm from './Form'
import { validateAccommodationInput } from '@util/validation/validateAccommodationInput'
import { useRecoilValue } from 'recoil'
import { currentCompanyAtom } from '@state/common/common'
import { numberToArray } from '@util/common/lodash'

export default function CreateAccommodation() {
  const createAccommodationCallback = useCreateAccommodationCallback('create Accommodation')
  const { name, cpNo } = useRecoilValue(currentCompanyAtom)

  console.log('currentCompany')
  console.log(name, cpNo)
  let navigate = useNavigate()

  const defaultValues = {
    cpName: name,
    cpNo: cpNo,
    nickname: '롯데호텔',
    homepage: 'www.lottehotel.com',
    email: 'lottel@lotte.com',
    fax: '',
    address2: '1111번지',
    options: '',
    addPersionFee: '성인||20000//유아||10000',
    addBreakfastFee: '성인||20000//유아||10000',
    addExtFee: '바베큐||30000//고기||10000//숯||10000',
    useYn: 'Y',
    openYn: 'Y',
    name: '롯데호텔',
    tel: '070-1111-2222',
    address1: '제주도 서귀포시 중문',
    positionX: '1111',
    positionY: '2222',
    bankAccount: '하나은행 1111-2222',
    saleStartdate: '2022-03-02',
    saleEnddate: '2022-03-01',
    area1: '1',
    area2: '2',
    checkinTime: '15:00',
    checkoutTime: '11:00',
    description: '',
    notice: '',
  }
  const { register, handleSubmit } = useForm({ defaultValues })

  const onSubmit = _.flow(
    preprocessAccommodationFormdata,
    validateAccommodationInput,
    getFormDataFromJson,
    createAccommodation(createAccommodationCallback, navigate)
  )

  return (
    <AccommodationForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      submitText={'등록'}
    />
  )
}

const createAccommodation = (createAccommodationCallback, navigate) => (formData) => {
  if (formData === false) {
    return
  }

  createAccommodationCallback(createAccommodationSelector(formData)).then((data) => {
    const { message } = data
    if (message === '성공') {
      alert('등록되었습니다.')
      navigate('/accommodationManagement/accommodation')
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}
const join = _.join('|')
const makeAccommodationFormOptions = (submitData) => {
  const getOptionCount = () => 22
  const filterChecked = _.filter((number) => submitData[`check${number}`] !== false)
  const checkBoxMap = {
    check1: '조식',
    check2: '취사기능',
    check3: '풀빌라',
    check4: '월풀(자쿠지)',
    check5: '화장실2개이상',
    check6: '단독(독채)형',
    check7: '복층형',
    check8: '순수온돌방',
    check9: '바베큐',
    check10: '수영장',
    check11: '인터넷',
    check12: '노트북대여',
    check13: '픽업유부',
    check14: '세미나실',
    check15: '노래방',
    check16: '애완동물입장가능',
    check17: '카페',
    check18: '장애인시설',
    check19: '통나무숙소',
    check20: '산책로',
    check21: '골프연습장',
    check22: '체험학습장(텃밭)',
  }
  const mapRoomOption = _.map((number) => checkBoxMap[`check${number}`])
  return _.flow(getOptionCount, numberToArray, filterChecked, mapRoomOption, join)(submitData)
}
export const preprocessAccommodationFormdata = (submitData) => {
  submitData.options = makeAccommodationFormOptions(submitData)
  return submitData
}