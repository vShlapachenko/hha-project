import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Store from "./store/store";

interface State {
    store: Store
}

const store = new Store();

export const Context = createContext<State>({
    store,
})

ReactDOM.render(
    <Context.Provider value={{
        store
    }}>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Context.Provider>,
  document.getElementById('root')
);