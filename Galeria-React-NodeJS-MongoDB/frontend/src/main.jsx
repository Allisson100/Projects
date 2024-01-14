import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterApp from './routes'
import GlobalStyles from './styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { Provider } from 'react-redux'
import store from './store'



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme.dark}>
      <GlobalStyles />
      <RouterApp />
    </ThemeProvider>
  </Provider>
)
