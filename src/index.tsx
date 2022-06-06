import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.scss'
import App from './App'
import store from './redux/store'

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

const rootElement = document.getElementById('root')

const root = createRoot(rootElement as HTMLElement)
root.render(app)
