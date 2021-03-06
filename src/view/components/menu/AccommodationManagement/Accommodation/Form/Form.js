import { useNavigate } from 'react-router-dom'
import SideBar from '@components/menu/AccommodationManagement/SideBar'

import AddOptionForm from '../../common/AddOptionForm'
import {
  breakfastOptionCountAtom,
  extOptionCountAtom,
} from '@state/accommodationManagement/accommodation'
import PictureForm from '../../common/PictureForm'
import SaleDateForm from '../../common/SaleDateForm'
import { ACCOMMODATION_LIST_URL } from '@constant/locationURLs'
import Area1 from '../Area1'
import Area2 from '../Area2'
import { sidebarOpenAtom } from '@state/common/common'
import { useRecoilValue } from 'recoil'
import { loadItem } from '@util/common/localStorage'
import { Suspense } from 'react'
import CompanyListSelect from '../CompanyListSelect'
import { readCompanyByNoSelector } from '@state/company/company'

export default function AccommodationForm({
  register,
  handleSubmit,
  onSubmit,
  reset,
  formType,
  getValues,
  watch,
  acNo,
}) {
  const sidebarOpen = useRecoilValue(sidebarOpenAtom)
  let navigate = useNavigate()

  const {
    authorities: [{ authority }],
    cpNo,
  } = loadItem('user')
  const isSuperAdmin = authority === 'ROLE_SUPERMASTER'
  console.log(isSuperAdmin)

  const parameter = {
    cpNo: cpNo,
  }
  const result = useRecoilValue(readCompanyByNoSelector(parameter))
  const company = result?.data?.data

  const daum = window.daum
  const searchAddress = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        Promise.resolve(data)
          .then((o) => {
            const { address } = data
            reset({ ...getValues(), address1: address })

            return new Promise((resolve, reject) => {
              const geocoder = new daum.maps.services.Geocoder()

              geocoder.addressSearch(address, (result, status) => {
                if (status === daum.maps.services.Status.OK) {
                  const { x, y } = result[0]

                  resolve({ positionY: y, positionX: x })
                } else {
                  reject()
                }
              })
            })
          })
          .then((result) => {
            const { positionY, positionX } = result
            reset({ ...getValues(), positionX, positionY })
          })
      },
    }).open()
  }

  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <SideBar active={0} />
        {/* <!-- E:lnb --> */}
        {/* <!-- S:content --> */}
        <div className='content2' style={{ marginLeft: sidebarOpen ? '250px' : '65px' }}>
          <div className='titWrap'>
            <h3>??????????????????</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ?????? */}
            <input type={'hidden'} {...register('cpNo')} />
            <input type={'hidden'} {...register('nickname')} />
            <input type={'hidden'} {...register('homepage')} />
            <input type={'hidden'} {...register('email')} />
            <input type={'hidden'} {...register('fax')} />
            <input type={'hidden'} {...register('address2')} />
            <input type={'hidden'} {...register('options')} />
            <input type={'hidden'} {...register('addPersionFee')} />
            <input type={'hidden'} {...register('addBreakfastFee')} />
            <input type={'hidden'} {...register('addExtFee')} />
            <input type={'hidden'} {...register('useYn')} />
            <input type={'hidden'} {...register('openYn')} />

            <div className='writeArea v1'>
              <section>
                <dl>
                  <dt>?????????</dt>
                  <dd>
                    {isSuperAdmin && formType === '??????' ? (
                      <Suspense
                        fallback={
                          <select>
                            <option>???????????????</option>
                          </select>
                        }
                      >
                        <CompanyListSelect register={register} />
                      </Suspense>
                    ) : (
                      <input
                        type='text'
                        disabled
                        {...register('cpName')}
                        defaultValue={company.name}
                      />
                    )}
                  </dd>
                </dl>
                <dl>
                  <dt>??????</dt>
                  <dd>
                    <select {...register('type')}>
                      <option value={'??????'}>??????</option>
                      <option value={'??????'}>??????</option>
                      <option value={'??????'}>??????</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>?????????</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='???????????? ??????????????????'
                      className='w70'
                      {...register('name')}
                      style={{ minWidth: '350px', width: '30%' }}
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>????????????</dt>
                  <dd>
                    <input type='text' placeholder='??????????????? ??????????????????' {...register('tel')} />
                  </dd>
                </dl>
                {/* <dl>
                  <dt>SMS?????????</dt>
                  <dd>
                    <input type='text' placeholder='SMS???????????? ??????????????????' />
                  </dd>
                </dl> */}
                {/* <dl>
                  <dt>????????????</dt>
                  <dd>
                    <input type='text' placeholder='??????????????? ??????????????????' />
                  </dd>
                </dl> */}
                <dl>
                  <dt>??????</dt>
                  <dd>
                    <input
                      type='text'
                      className='w50'
                      {...register('address1')}
                      readOnly
                      onClick={searchAddress}
                    />
                    {/* <button type='button'>??????????????????</button> */}
                  </dd>
                </dl>
                <dl>
                  <dt>??????</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='????????? ??????????????????'
                      {...register('positionX')}
                      readOnly
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>??????</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='????????? ??????????????????'
                      {...register('positionY')}
                      readOnly
                    />
                  </dd>
                </dl>
                {/* <dl>
                  <dt>????????????</dt>
                  <dd>
                    <input type='text' placeholder='??????????????? ??????????????????' />
                  </dd>
                </dl> */}
                <dl>
                  <dt>????????????</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='??????????????? ??????????????????'
                      {...register('bankAccount')}
                    />
                  </dd>
                </dl>
              </section>
              <SaleDateForm register={register} reset={reset} getValues={getValues} top={'698'} />

              <section>
                <Area1 register={register} watch={watch} reset={reset} getValues={getValues} />
                <Suspense
                  fallback={
                    <dl>
                      <dt>??????2</dt>
                      <dd>
                        <select>
                          <option>????????????</option>
                        </select>
                      </dd>
                    </dl>
                  }
                >
                  <Area2 register={register} watch={watch} reset={reset} getValues={getValues} />
                </Suspense>
              </section>
              <section>
                <dl>
                  <dt>????????????</dt>
                  <dd>
                    <div className='opt-box'>
                      <ul>
                        <li>
                          <span className='check'>
                            <input id='check01' type='checkbox' {...register('check1')} />
                            <label htmlFor='check01'>??????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check02' type='checkbox' {...register('check2')} />
                            <label htmlFor='check02'>????????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check03' type='checkbox' {...register('check3')} />
                            <label htmlFor='check03'>?????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check04' type='checkbox' {...register('check4')} />
                            <label htmlFor='check04'>??????(?????????)</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check05' type='checkbox' {...register('check5')} />
                            <label htmlFor='check05'>?????????2?????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check06' type='checkbox' {...register('check6')} />
                            <label htmlFor='check06'>??????(??????)???</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check07' type='checkbox' {...register('check7')} />
                            <label htmlFor='check07'>?????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check08' type='checkbox' {...register('check8')} />
                            <label htmlFor='check08'>???????????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check09' type='checkbox' {...register('check9')} />
                            <label htmlFor='check09'>?????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check10' type='checkbox' {...register('check10')} />
                            <label htmlFor='check10'>?????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check11' type='checkbox' {...register('check11')} />
                            <label htmlFor='check11'>?????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check12' type='checkbox' {...register('check12')} />
                            <label htmlFor='check12'>???????????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check13' type='checkbox' {...register('check13')} />
                            <label htmlFor='check13'>????????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check14' type='checkbox' {...register('check14')} />
                            <label htmlFor='check14'>????????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check15' type='checkbox' {...register('check15')} />
                            <label htmlFor='check15'>?????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check16' type='checkbox' {...register('check16')} />
                            <label htmlFor='check16'>????????????????????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check17' type='checkbox' {...register('check17')} />
                            <label htmlFor='check17'>??????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check18' type='checkbox' {...register('check18')} />
                            <label htmlFor='check18'>???????????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check19' type='checkbox' {...register('check19')} />
                            <label htmlFor='check19'>???????????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check20' type='checkbox' {...register('check20')} />
                            <label htmlFor='check20'>?????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check21' type='checkbox' {...register('check21')} />
                            <label htmlFor='check21'>???????????????</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check22' type='checkbox' {...register('check22')} />
                            <label htmlFor='check22'>???????????????(??????)</label>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </dd>
                </dl>
              </section>
              <section>
                <dl className='rowAdd'>
                  <dt>?????? ??????</dt>
                  <dd>
                    <div className='row tit'>
                      <div>??????</div>
                      <div>????????????('??????'?????????)</div>
                      <div>
                        <span className='hdn'>??????/??????</span>
                      </div>
                    </div>
                    <div className='row'>
                      <div>
                        <input type='text' {...register('adultBreakfastName')} readOnly />
                      </div>
                      <div>
                        <input type='text' {...register('adultBreakfastPrice')} />
                        <span className='won'>???</span>
                      </div>
                      <div></div>
                    </div>
                    <div className='row'>
                      <div>
                        <input type='text' {...register('childBreakfastName')} readOnly />
                      </div>
                      <div>
                        <input type='text' {...register('childBreakfastPrice')} />
                        <span className='won'>???</span>
                      </div>
                      <div></div>
                    </div>
                    <div className='row'>
                      <div>
                        <input type='text' {...register('infantBreakfastName')} readOnly />
                      </div>
                      <div>
                        <input type='text' {...register('infantBreakfastPrice')} />
                        <span className='won'>???</span>
                      </div>
                      <div></div>
                    </div>
                    <AddOptionForm
                      register={register}
                      firstInputName={'addBreakfastName'}
                      secondInputName={'addBreakfastPrice'}
                      optionCountAtom={breakfastOptionCountAtom}
                    />
                  </dd>
                </dl>
                <dl className='rowAdd'>
                  <dt>????????????</dt>
                  <dd>
                    <div className='row tit'>
                      <div>??????</div>
                      <div>????????????('??????'?????????)</div>
                      <div>
                        <span className='hdn'>??????/??????</span>
                      </div>
                    </div>
                    <AddOptionForm
                      register={register}
                      firstInputName={'addExtName'}
                      secondInputName={'addExtPrice'}
                      optionCountAtom={extOptionCountAtom}
                    />
                  </dd>
                </dl>
              </section>
              <section>
                <dl className='rowAdd v1'>
                  <dt>?????????/??????</dt>
                  <dd>
                    <div className='row tit'>
                      <div>?????????</div>
                      <div>????????????</div>
                    </div>
                    <div className='row'>
                      <div>
                        <input type='text' {...register('checkinTime')} />
                      </div>
                      <div style={{ marginRight: '0' }}>
                        <input type='text' {...register('checkoutTime')} />
                      </div>
                    </div>
                  </dd>
                </dl>
                <dl className='rowAdd v1'>
                  <dt>?????? ????????????</dt>
                  <dd>
                    <div className='row'>
                      <div style={{ maxWidth: 'initial', marginRight: '0' }}>
                        <input type='text' style={{ width: '63%' }} {...register('shortDesc')} />
                      </div>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>????????????</dt>
                  <dd>
                    <textarea {...register('description')} style={{ width: '63%' }}></textarea>
                  </dd>
                </dl>
                <dl>
                  <dt>??????/????????????</dt>
                  <dd>
                    <textarea {...register('notice')} style={{ width: '63%' }}></textarea>
                  </dd>
                </dl>
              </section>
              {/* <section>
                <dl className='rowAdd'>
                  <dt>?????? ???????????????</dt>
                  <dd>
                    <div className='row tit'>
                      <div>?????????????????? ??????</div>
                      <div>??????????????????</div>
                      <div>
                        <span className='hdn'>??????/??????</span>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='txt'>
                        <input type='text' />
                        <span>???????????? ?????????</span>
                      </div>
                      <div className='txt'>
                        <input type='text' />
                        <span>% ??? ??????????????? ??????</span>
                      </div>
                      <div>
                        <button type='button' className='btn plus'>
                          <span className='hdn'>??????</span>
                        </button>
                        <button type='button' className='btn minus'>
                          <span className='hdn'>??????</span>
                        </button>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='txt'>
                        <input type='text' />
                        <span>???????????? ?????????</span>
                      </div>
                      <div className='txt'>
                        <input type='text' />
                        <span>% ??? ??????????????? ??????</span>
                      </div>
                      <div>
                        <button type='button' className='btn plus'>
                          <span className='hdn'>??????</span>
                        </button>
                        <button type='button' className='btn minus'>
                          <span className='hdn'>??????</span>
                        </button>
                      </div>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>??????????????????(T/L) ??????</dt>
                  <dd>
                    <select>
                      <option>???????????????</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>?????? ??????????????????(T/L)</dt>
                  <dd>
                    <input type='text' defaultValue={'3'} />
                    <span className='mgl_10'>???</span>
                    <span className='ex'>
                      (????????? ???????????? ???????????? ?????? ?????? ????????? ???????????? ???????????????.)
                    </span>
                  </dd>
                </dl>
              </section> */}
              <section>
                <dl>
                  <dt>??????</dt>
                  <dd>
                    <input
                      type='text'
                      className='w70'
                      style={{ minWidth: 'initial', width: '63%' }}
                    />
                    <p className='ex mgt_5'>
                      ","??? ???????????????. (??? : ???????????????,???????????????,?????????,???????????????,????????? ???)
                    </p>
                  </dd>
                </dl>
              </section>
              {formType === '??????' && (
                <PictureForm
                  formType={formType}
                  watch={watch}
                  register={register}
                  group={'ACCMD'}
                  rtNo={'0'}
                  acNo={acNo}
                />
              )}
            </div>
            <div className='center mgt_30'>
              <button type='submit' className='btn btn-large purple'>
                {formType}
              </button>
              <button
                type='button'
                className='btn btn-large line1'
                onClick={() => cancel(navigate)}
              >
                ??????
              </button>
            </div>
          </form>
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}

const cancel = (navigate) => {
  navigate(ACCOMMODATION_LIST_URL)
}
