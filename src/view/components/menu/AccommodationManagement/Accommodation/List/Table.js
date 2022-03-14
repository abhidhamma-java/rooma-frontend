import { Suspense } from 'react'
import ButtonGroup from '../../common/ButtonGroup'
import Paging from '@components/common/Paging'
import ReadAccommodationList from './ReadAccommodationList'

export default function AccommodationTable() {
  console.log('AccommodationTable called...')
  return (
    <>
      <table className='tbl-list'>
        <caption>숙소목록</caption>
        <colgroup>
          <col width='80px' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='130px' />
        </colgroup>
        <thead>
          <tr>
            <th>
              <span className='only check'>
                <input id='check1' type='checkbox' />
                <label htmlFor='check1'>
                  <span className='hidden'>전체선택</span>
                </label>
              </span>
            </th>
            <th>번호</th>
            <th>업체명</th>
            <th>숙소명</th>
            <th>지역</th>
            <th>등급</th>
            <th>판매시작일</th>
            <th>판매종료일</th>
            <th>담당자</th>
            <th>사용</th>
          </tr>
        </thead>
        <tbody>
          <Suspense
            fallback={
              <tr>
                <td>loading...</td>
              </tr>
            }
          >
            <ReadAccommodationList />
          </Suspense>
        </tbody>
      </table>
      <ButtonGroup addText={'숙소추가'} addHref={'/accommodationManagement/accommodation/new'} />
      <Paging />
    </>
  )
}
