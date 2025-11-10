import { useRef, useEffect } from "react"

/**
 * Hook that executes a callback when the component unmounts.
 *
 * @param callback Function to be called on component unmount
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useUnmount = (callback: (...args: Array<any>) => any) => {
  const ref = useRef(callback)
  // eslint-disable-next-line react-hooks/refs
  ref.current = callback

  useEffect(
    () => () => {
      ref.current()
    },
    []
  )
}

export default useUnmount
