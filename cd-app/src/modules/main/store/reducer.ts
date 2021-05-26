import { createReducer } from '@reduxjs/toolkit'
import { LoadingStatus } from 'shared/types/enums'

interface State {
  loading: LoadingStatus
  error?: string | null
}

const initialState: State = {
  loading: LoadingStatus.Idle,
  error: null,
}

export default createReducer(initialState, builder =>
  builder)