import '../styles/bootstrap.min.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import { Provider } from 'react-redux'
import store from '../redux/store'
import { useAppDispatch } from '../redux/hooks'
import { setCart } from '../redux/cartSlice'

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
