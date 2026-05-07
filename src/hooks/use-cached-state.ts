'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { getFromCache, saveToCache } from '@/lib/cache'

/**
 * A custom hook that works like useState but persists the value in localStorage.
 * @param key - The unique key for the cache.
 * @param initialState - The default value if no cached data is found.
 * @returns [state, setState]
 */
export function useCachedState<T>(
  key: string,
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  // Initialize state with initial state (always, to match server render)
  const [state, setState] = useState<T>(() => {
    return typeof initialState === 'function'
      ? (initialState as () => T)()
      : initialState
  })

  // Sync state when key changes (e.g., switching between different challenges)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cachedValue = getFromCache<T>(key)
      if (cachedValue !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(cachedValue)
      } else {
        // If no cache, reset to initial state
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(typeof initialState === 'function'
          ? (initialState as () => T)()
          : initialState
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // Update cache whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      saveToCache(key, state)
    }
  }, [key, state])

  return [state, setState]
}
