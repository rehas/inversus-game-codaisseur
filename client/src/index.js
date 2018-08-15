import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import {Provider} from 'react-redux'
import store from './store'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const THEME = createMuiTheme({
  typography: {
    "fontFamily": "\"Orbitron\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={THEME}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
	document.getElementById('root')
)
registerServiceWorker()
