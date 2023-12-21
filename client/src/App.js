import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./index.css"
import { Navigation } from "./components/navigation/Navigation";
import { Home } from "./components/Home/Home.js";
import { StylistList } from "./components/stylists/StylistsList.js";
import { CustomersList } from "./components/customers/CustomersList.js";
import { AppointmentsList } from "./components/appointments/AppointmentsList.js";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<><Navigation /><Outlet /></>}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/stylists" element={<><Navigation /><Outlet /></>}>
        <Route index element={<StylistList />} />
      </Route>
      <Route path="/customers" element={<><Navigation /><Outlet /></>}>
        <Route index element={<CustomersList />} />
      </Route>
      <Route path="/appointments" element={<><Navigation /><Outlet /></>}>
        <Route index element={<AppointmentsList />} />
      </Route>
    </Routes> 
  </BrowserRouter>
  );
}

export default App;
