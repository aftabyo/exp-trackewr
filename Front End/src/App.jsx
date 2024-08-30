import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./routes/LoginRoute";
import UserRoute from "./routes/UserRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="bg-[#000] text-[#FCF8D9] min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path="/user/*"
            element={
              <ProtectedRoute>
                <UserRoute />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<LoginRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
