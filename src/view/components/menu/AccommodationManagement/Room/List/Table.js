import Paging from '@components/common/Paging'
import { CREATE_ROOM_FORM_URL } from '@constant/locationURLs'
import { totalCountAtom } from '@state/common/paging'
import { useRecoilValue } from 'recoil'
import ButtonGroup from '../../common/ButtonGroup'
import ReadRoomList from './ReadRoomList'

export default function RoomTable() {
  const totalCount = useRecoilValue(totalCountAtom)
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
          <col width='' />
        </colgroup>
        <tbody>
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
            <th>숙소명</th>
            <th>객실타입명</th>
            <th>객실명</th>
            <th>판매시작일</th>
            <th>판매종료일</th>
            <th>등록일</th>
            <th>담당자</th>
            <th>사용</th>
          </tr>
          <ReadRoomList />
        </tbody>
      </table>
      {totalCount === 0 && (
        <div
          style={{
            height: '50px',
            display: 'grid',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          결과가 없습니다.
        </div>
      )}
      <ButtonGroup addText={'객실추가'} addHref={CREATE_ROOM_FORM_URL} />
      <Paging />
    </>
  )
}
