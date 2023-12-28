import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./index.css"
import { Navigation } from "./components/navigation/Navigation";
import { Home } from "./components/Home/Home.js";
import { StylistList } from "./components/stylists/StylistsList.js";
import { CustomersList } from "./components/customers/CustomersList.js";
import { AppointmentsList } from "./components/appointments/AppointmentsList.js";
import { CustomerDetails } from "./components/customers/CustomerDetails.js";
import { StylistDetails } from "./components/stylists/StylistDetails.js";
import { EditAppointment } from "./components/appointments/EditAppointment.js";
import { AddStylist } from "./components/stylists/AddStylist.js";
import { AddCustomer } from "./components/customers/AddCustomer.js";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<><Navigation /><Outlet /></>}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/stylists" element={<><Navigation /><Outlet /></>}>
        <Route index element={<StylistList />} />
        <Route path=":id" element={<StylistDetails />} />
        <Route path="add" element={<AddStylist />} />
      </Route>
      <Route path="/customers" element={<><Navigation /><Outlet /></>}>
        <Route index element={<CustomersList />} />
        <Route path=":id" element={<CustomerDetails />} />
        <Route path="add" element={<AddCustomer />} />
      </Route>
      <Route path="/appointments" element={<><Navigation /><Outlet /></>}>
        <Route index element={<AppointmentsList />} />
        <Route path="edit">
          <Route path=":id" element={<EditAppointment /> } />
          </Route> 
      </Route>
    </Routes> 
  </BrowserRouter>
  );
}

export default App;
