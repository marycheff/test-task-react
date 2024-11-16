import { ConfigProvider } from "antd"
import ru_RU from "antd/locale/ru_RU"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import "./index.css"
import store from "./store/store.ts"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ConfigProvider locale={ru_RU}>
                    <App />
                </ConfigProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>
)
