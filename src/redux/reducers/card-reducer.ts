import { createSlice } from '@reduxjs/toolkit'
import { CartItemModel } from '../../models/cart-item.model'
import { getCartLocalStorage } from '../../utils/cart-handle'

export type Cart = {
    items: CartItemModel[]
}

const initialState: Cart = {
    items: getCartLocalStorage()
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCartState: (state) => {
            state.items = getCartLocalStorage()
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateCartState } = cartSlice.actions

export default cartSlice.reducer