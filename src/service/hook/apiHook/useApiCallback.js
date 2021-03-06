import { useRecoilCallback } from 'recoil'

const useApiCallback = (apiType) =>
  useRecoilCallback(({ snapshot, refresh, set }) => async (api) => {
    console.log(`${apiType} Called...`)
    const release = snapshot.retain()
    try {
      const { data } = await snapshot.getPromise(api)

      return data
    } catch (error) {
      throw error
    } finally {
      refresh(api)
      release()
    }
  })

export default useApiCallback
