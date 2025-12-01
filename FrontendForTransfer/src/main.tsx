
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {setupStore} from "./store/store.ts";
import {GoogleOAuthProvider} from "@react-oauth/google";
const store = setupStore();
const CLIENT_ID = "907994262332-kk2dqkeqsgtu0oru4tv1n9d694sivo4i.apps.googleusercontent.com"
createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={CLIENT_ID} >
        <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>,
)
