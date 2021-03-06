import SideBar from '@components/menu/AccommodationManagement/SideBar'
import { Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AccommodationListSelect from '../../common/AccommodationListSelect'
import RoomSetting from './RoomSetting'
import AddOptionForm from '../../common/AddOptionForm'
import {
  breakfastConfigOptionCountAtom,
  etcConfigOptionCountAtom,
} from '@state/accommodationManagement/roomType'
import PictureForm from '../../common/PictureForm'
import SaleDateForm from '../../common/SaleDateForm'
import { ROOMTYPE_LIST_URL } from '@constant/locationURLs'
import { sidebarOpenAtom } from '@state/common/common'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import { loadItem } from '@util/common/localStorage'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import {
  readAccommodationListSelector,
  readAccommodationSelector,
} from '@state/accommodationManagement/accommodation'

export default function RoomTypeForm({
  register,
  handleSubmit,
  onSubmit,
  formType,
  titleText,
  watch,
  reset,
  getValues,
  rtNo,
  acNo,
}) {
  const sidebarOpen = useRecoilValue(sidebarOpenAtom)
  let navigate = useNavigate()

  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <SideBar active={1} />
        {/* <!-- E:lnb --> */}
        {/* <!-- S:content --> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type={'hidden'} {...register('cpNo')} />
          <input type={'hidden'} {...register('originPrice')} />
          <input type={'hidden'} {...register('salePrice')} />
          <input type={'hidden'} {...register('providerPrice')} />
          <input type={'hidden'} {...register('roomTypeCd')} />
          <input type={'hidden'} {...register('roomMakeConfig')} />
          <input type={'hidden'} {...register('roomShortDesc')} />
          <div className='content2' style={{ marginLeft: sidebarOpen ? '250px' : '65px' }}>
            <div className='titWrap'>
              <h3>{titleText}</h3>
            </div>
            <div className='writeArea v1'>
              <section>
                <dl>
                  <dt>????????????</dt>
                  <dd>
                    <select className='auto' {...register('useYn')}>
                      <option value={'Y'}>??????</option>
                      <option value={'N'}>?????????</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>?????????</dt>
                  <dd>
                    <Suspense
                      fallback={
                        <select>
                          <option>???????????????</option>
                        </select>
                      }
                    >
                      <AccommodationListSelect
                        register={register}
                        watch={watch}
                        reset={reset}
                        getValues={getValues}
                      />
                    </Suspense>
                  </dd>
                </dl>
                <dl>
                  <dt>???????????????</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='?????????????????? ??????????????????'
                      {...register('roomTypeName')}
                    />
                  </dd>
                </dl>
              </section>
              <SaleDateForm register={register} reset={reset} getValues={getValues} top={'413'} />
              <RoomSetting
                register={register}
                roomTotalNum={Number(watch('roomTotalNum'))}
                prefix={watch('prefix')}
                roomNumber={watch('roomNumber')}
                suffix={watch('suffix')}
                reset={reset}
                getValues={getValues}
                formType={formType}
                watch={watch}
              />

              <section>
                <dl>
                  <dt>????????????</dt>
                  <dd>
                    <input type='text' {...register('roomComposition')} />
                    <span className='ex'> (??? : ???2+??????+??????+??????)</span>
                  </dd>
                </dl>
                <dl>
                  <dt>??????</dt>
                  <dd>
                    <select {...register('viewType')}>
                      <option value={'????????????'}>????????????</option>
                      <option value={'?????????'}>?????????</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>????????????</dt>
                  <dd>
                    <select className='auto' {...register('basicPersonNum')}>
                      <option value={'1'}>1???</option>
                      <option value={'2'}>2???</option>
                      <option value={'3'}>3???</option>
                      <option value={'4'}>4???</option>
                    </select>
                    <input type='text' {...register('addPersionConfig')} />
                    <span className='ex'>(??? : ???????????? , ??????????????? ??? 7??? ??????)</span>
                  </dd>
                </dl>
                <dl>
                  <dt>????????????</dt>
                  <dd>
                    <select className='auto' {...register('maxPersionNum')}>
                      <option value={'1'}>1???</option>
                      <option value={'2'}>2???</option>
                      <option value={'3'}>3???</option>
                      <option value={'4'}>4???</option>
                    </select>
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
                      firstInputName={'addBreakfastConfigName'}
                      secondInputName={'addBreakfastConfigPrice'}
                      optionCountAtom={breakfastConfigOptionCountAtom}
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
                      firstInputName={'addEtcConfigName'}
                      secondInputName={'addEtcConfigPrice'}
                      optionCountAtom={etcConfigOptionCountAtom}
                    />
                  </dd>
                </dl>
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
                      </ul>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>??????????????????</dt>
                  <dd>
                    <input type='text' className='w100' {...register('convInfo')} />
                  </dd>
                </dl>
                <dl>
                  <dt>????????????</dt>
                  <dd>
                    <input type='text' className='w100' {...register('etcInfo')} />
                  </dd>
                </dl>
              </section>
              {formType === '??????' && (
                <PictureForm
                  formType={formType}
                  watch={watch}
                  register={register}
                  group={'ROOMTYPE'}
                  rtNo={rtNo}
                  acNo={acNo}
                />
              )}
            </div>
            <div className='center mgt_30'>
              <button type='submit' className='btn btn-large purple'>
                {formType}
              </button>
              <button
                onClick={() => cancel(navigate)}
                type='button'
                className='btn btn-large line1'
              >
                ??????
              </button>
            </div>
          </div>
          {/* <!-- E:content --> */}
        </form>
      </div>

      {/* <!-- E:Container --> */}
    </>
  )
}
const cancel = (navigate) => {
  navigate(ROOMTYPE_LIST_URL)
}
