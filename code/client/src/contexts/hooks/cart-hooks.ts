import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { cartStore } from '../store/cart-store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => typeof cartStore.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof cartStore.getState>> = useSelector