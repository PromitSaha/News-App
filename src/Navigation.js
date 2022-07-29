import  { 
    BrowserRouter,
    Routes, 
    Route,
    Navigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navigation;