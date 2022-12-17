import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { queryClient } from '../constants/client'

function updateQuery<T>(key: string, updatedValue: T) {
  queryClient.setQueryData([key], updatedValue)
}

export default function usePersistedState<T>(key: string, intialValue?: T) {
  if (typeof intialValue !== 'undefined' && typeof queryClient.getQueryData([key]) === 'undefined') {
    updateQuery(key, intialValue)
  }

  const updateState = useCallback(
    (updatedValue: T) => {
      if (queryClient.getQueryData([key]) !== updateQuery) {
        updateQuery(key, updatedValue)
      }
    },
    [key],
  )

  const { data: state } = useQuery([key], () => queryClient.getQueryData<T>([key]))

  return [state, updateState] as const
}
