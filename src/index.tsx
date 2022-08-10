import React from "react";
import ReactDOM from "react-dom/client";
import { setupStore } from './store/store'

import App from "./App";
import {Provider} from "react-redux";

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render((
    <Provider store={store}>
        <App />
    </Provider>
));
