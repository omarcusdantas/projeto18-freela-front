import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import LoginPage from "./pages/LoginPage";

export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}
