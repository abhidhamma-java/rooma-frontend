import { COMPANY_LIST_URL } from '@constant/locationURLs'
import { dimmdLayerAtom } from '@state/common/common'
import { Suspense, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import AddEmployee from '../Popup/AddEmployee'
import ReadMemberList from './ReadMemberList'

export default function CompanyForm({
  onSubmit,
  handleSubmit,
  register,
  reset,
  getValues,
  isCreate,
}) {
  let navigate = useNavigate()
  let { companyId } = useParams()
  const cpNo = companyId

  const cancel = () => navigate(COMPANY_LIST_URL)
  const setIsShowDimmdLayer = useSetRecoilState(dimmdLayerAtom)
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)
  const handleAddEmployeePopup = () => {
    if (cpNo === undefined) {
      alert('회사정보를 먼저 저장해 주세요')
    } else {
      setIsShowDimmdLayer(true)
      setIsAddEmployeeOpen(true)
    }
  }
  const daum = window.daum

  const searchAddress = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        Promise.resolve(data).then((o) => {
          const { address, zonecode } = data
          reset({ ...getValues(), address1: address, zipcode: zonecode })
        })
      },
    }).open()
  }
  return (
    <>
      <div id='container'>
        <div className='content'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='titWrap'>
              <h3>{isCreate ? '업체등록' : '업체수정'}</h3>
            </div>
            <div className='writeArea'>
              <section>
                <div className='two'>
                  <dl>
                    <dt>업체아이디</dt>
                    <dd>
                      <input
                        type='text'
                        placeholder={'업체아이디를 입력해주세요'}
                        {...register('cpId')}
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>업체명</dt>
                    <dd>
                      {/* <Suspense
                      fallback={
                        <select>
                          <option></option>
                        </select>
                      }
                    >
                      <CompanySelect register={register} />
                    </Suspense> */}
                      <input
                        type='text'
                        placeholder={'업체명을 입력해주세요'}
                        {...register('name')}
                      />
                    </dd>
                  </dl>
                </div>
                <div className='two'>
                  <dl>
                    <dt>대표명</dt>
                    <dd>
                      <input
                        type='text'
                        placeholder={'대표명을 입력해주세요'}
                        {...register('ownerName')}
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>사업자등록번호</dt>
                    <dd>
                      <input
                        type='text'
                        placeholder={'사업자등록번호를 입력해주세요'}
                        {...register('bizNum')}
                      />
                    </dd>
                  </dl>
                </div>
                <div className='two'>
                  <dl>
                    <dt>계좌번호</dt>
                    <dd>
                      <input
                        type='text'
                        placeholder={'계좌번호를 입력해주세요'}
                        {...register('bankAccount')}
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>홈페이지</dt>
                    <dd>
                      <input
                        type='text'
                        placeholder={'홈페이지를 입력해주세요'}
                        {...register('homepage')}
                      />
                    </dd>
                  </dl>
                </div>
                <div className='two'>
                  <dl>
                    <dt>E-mail</dt>
                    <dd>
                      <input
                        type='text'
                        placeholder={'E-mail을 입력해주세요'}
                        {...register('email')}
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>전화번호</dt>
                    <dd>
                      <input
                        type='text'
                        placeholder={'전화번호를 입력해주세요'}
                        {...register('tel')}
                      />
                    </dd>
                  </dl>
                </div>
                <div className='two'>
                  <dl>
                    <dt>팩스</dt>
                    <dd>
                      <input type='text' placeholder={'팩스를 입력해주세요'} {...register('fax')} />
                    </dd>
                  </dl>
                  <dl>
                    <dt>휴대폰번호</dt>
                    <dd>
                      <input
                        type='text'
                        placeholder={'휴대폰번호를 입력해주세요'}
                        {...register('hp')}
                      />
                    </dd>
                  </dl>
                </div>
                <dl className='addr'>
                  <dt>사업자주소</dt>
                  <dd>
                    <p>
                      <input type='text' {...register('zipcode')} readOnly />
                      <button type='button' onClick={searchAddress}>
                        우편번호검색
                      </button>
                    </p>
                    <p>
                      <input type='text' {...register('address1')} readOnly />
                    </p>
                    <p>
                      <input
                        type='text'
                        placeholder={'상세주소를 입력해주세요'}
                        {...register('address2')}
                      />
                    </p>
                  </dd>
                </dl>
                <dl className='addr'>
                  <dt>관리자메모</dt>
                  <dd>
                    <textarea
                      placeholder={'관리자메모를 입력해주세요'}
                      {...register('adminMemo')}
                    ></textarea>
                  </dd>
                </dl>
                <div className='two'>
                  <dl>
                    <dt>비밀번호</dt>
                    <dd>
                      <input
                        type='password'
                        placeholder={'비밀번호를 입력해주세요'}
                        {...register('cpPw')}
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>비밀번호확인</dt>
                    <dd>
                      <input
                        type='password'
                        placeholder={'비밀번호확인을 입력해주세요'}
                        {...register('confirmCpPw')}
                      />
                    </dd>
                  </dl>
                </div>
              </section>
              <section>
                <dl className='rowAdd'>
                  <dt>직원 아이디 추가</dt>
                  <dd>
                    <div className='right mgb_10'>
                      <a
                        href='#addEmployeePOP'
                        className='btn pop-layer2'
                        onClick={handleAddEmployeePopup}
                      >
                        직원추가
                      </a>
                    </div>
                    <table className='in-list'>
                      <colgroup>
                        <col width='25%' />
                        <col width='25%' />
                        <col width='10%' />
                        <col width='' />
                        <col width='10%' />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>아이디 (영문 or 영문+숫자)</th>
                          <th>담당자명</th>
                          <th>역할</th>
                          <th>메모</th>
                          <th>삭제</th>
                        </tr>
                      </thead>
                      <tbody>
                        <Suspense fallback={<tr></tr>}>
                          <ReadMemberList cpNo={cpNo} />
                        </Suspense>
                      </tbody>
                    </table>
                  </dd>
                </dl>
              </section>
            </div>
            <div className='center mgt_30'>
              <button type='submit' className='btn btn-large purple'>
                {isCreate ? '등록' : '수정'}
              </button>
              <button type='button' className='btn btn-large line1' onClick={cancel}>
                취소
              </button>
            </div>
            <input type={'text'} {...register('group')} style={{ display: 'none' }} />
          </form>
        </div>
      </div>
      {isAddEmployeeOpen && (
        <Suspense fallback={<div></div>}>
          <AddEmployee
            setIsShowDimmdLayer={setIsShowDimmdLayer}
            setIsAddEmployeeOpen={setIsAddEmployeeOpen}
            cpNo={cpNo}
          />
        </Suspense>
      )}
    </>
  )
}
