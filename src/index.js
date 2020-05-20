import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { enableLogging } from 'mobx-logger';
import { configure } from 'mobx';
import { Provider as MobxProvider } from 'mobx-react';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { stores } from './stores';

configure({ enforceActions: 'always' });

const config = {

};

enableLogging(config);

ReactDOM.render(
  <MobxProvider {...stores}>
    <SnackbarProvider maxSnack={3} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SnackbarProvider>
  </MobxProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
