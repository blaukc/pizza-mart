import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order, Item } from '../types/orders'
// import type { RootState } from './store'

// Define a type for the slice state
interface CartState {
    orders: Array<Order>;
    numItems: number;
}

// Define the initial state using that type
const initialState: CartState = {
    orders: [],
    numItems: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Item>) => {
            for (let i=0; i<state.orders.length; i++) {
                if (state.orders[i].item.pizza.id === action.payload.pizza.id && state.orders[i].item.size === action.payload.size) {
                    state.orders[i].quantity += 1
                    localStorage.setItem('orders', JSON.stringify(state.orders))
                    return
                }
            }
            state.orders.push({
                item: action.payload,
                quantity: 1
            });
            state.numItems += 1;
            localStorage.setItem('orders', JSON.stringify(state.orders))
        },
        minusFromCart: (state, action: PayloadAction<Item>) => {
            for (let i=0; i<state.orders.length; i++) {
                if (state.orders[i].item.pizza.id === action.payload.pizza.id && state.orders[i].item.size === action.payload.size) {
                    if (state.orders[i].quantity === 1) {
                        state.orders.splice(i, 1)
                        state.numItems -= 1;
                    } else {
                        state.orders[i].quantity -= 1
                    }
                    localStorage.setItem('orders', JSON.stringify(state.orders))
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<Item>) => {
            for (let i=0; i<state.orders.length; i++) {
                if (state.orders[i].item.pizza.id === action.payload.pizza.id && state.orders[i].item.size === action.payload.size) {
                    state.orders.splice(i, 1)
                    state.numItems -= 1;
                    localStorage.setItem('orders', JSON.stringify(state.orders))
                    return
                }
            }
            state.numItems -= 1;
        },
        setCart: (state, action: PayloadAction<Array<Order>>) => {
            state.orders = action.payload;
            state.numItems = action.payload.length;
        }
        // // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

export const { addToCart, minusFromCart, removeFromCart, setCart } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default cartSlice.reducer
