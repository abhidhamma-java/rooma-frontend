import { useRecoilCallback } from 'recoil'
import { defaultValuesAtom } from '../state/common/form'

const useApiCallback = (apiType) =>
  useRecoilCallback(({ snapshot, refresh, set }) => async (api) => {
    console.log(`useApiCallback ${apiType} Called...`)
    const release = snapshot.retain()
    try {
      console.log('useApiCallback try')
      const result = await snapshot.getPromise(api)

      // 나중에 set할거 매개변수에 넣어서 명시해주는 방향으로 하자
      // set(accommodationListAtom, () => result.data.data.list)
      // set(totalCountAtom, () => result.data.data.totalCount)
      set(defaultValuesAtom, () => result.data.data)
    } catch (error) {
      throw error
    } finally {
      release()
    }
  })

export default useApiCallback
