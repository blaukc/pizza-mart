import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from './store'
import { Order, OrderStatus } from '../types/orders'
import { setCart } from './cartSlice'
// import type { RootState } from './store'

// Define a type for the slice state
interface OrderState {
    order_loading: boolean
    order_error_message: string | null
    order_error_code: number | null
}

interface Error {
    message: string
    code: number
}

// Define the initial state using that type
const initialState: OrderState = {
    order_loading: false,
    order_error_message: null,
    order_error_code: null
}

export const orderSlice = createSlice({
    name: 'order',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        orderLoading: (state) => {
            state.order_loading = true
            state.order_error_message = null
            state.order_error_code = null
        },
        orderComplete: (state) => {
            state.order_loading = false
        },
        orderError: (state, action: PayloadAction<Error>) => {
            state.order_loading = false
            state.order_error_message = action.payload.message
            state.order_error_code = action.payload.code
        },
        // // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

export const { orderLoading, orderComplete, orderError } = orderSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export const orderAction = (orders: Array<Order>, address: string, postal_code: string, contact_number: string, email: string) => async(dispatch: AppDispatch): Promise<OrderStatus | null> => {

    dispatch(orderLoading())

    let orderSummary = []
    for (let i = 0; i < orders.length; i++) {
        orderSummary.push({
            pizza: orders[i].item.pizza.pizza_name,
            price: orders[i].item.pizza.price,
            size: orders[i].item.size,
            quantity: orders[i].quantity
        })
    }
    const data = {
        orders: orderSummary,
        address: address,
        postal_code: postal_code,
        contact_number: contact_number,
        email: email
    }

    try {
        const response = await fetch("https://blaukc-pizza-mart.herokuapp.com/api/order/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const parseRes = await response.json()

        if (!response.ok) {
            const err = {
                code: response.status,
                message: parseRes
            }
            dispatch(orderError(err))
            return null
        }

        dispatch(orderComplete())
        dispatch(setCart([]))
        localStorage.removeItem('orders')
        return parseRes


    } catch (error) {
        const err = {
            code: 500,
            message: "Server Error"
        }
        dispatch(orderError(err))
        return null
    }
}

export default orderSlice.reducer
