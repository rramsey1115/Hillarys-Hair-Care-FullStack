import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap"

export const UpcomingApp = ({ allAppointments }) => {
    const upcomingApp = allAppointments?.filter(app => app.isPast === false)

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString); // {object Date}
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        const formatted = mm + "-" + dd + "-" + yyyy;
        return formatted;
      };

      const getFormattedTime = (dateStr) => {
        const date = new Date(dateStr);
        let hh = date.getHours();
        if(hh >= 12) {return (hh - 12 + ':00 PM')}
        if (hh < 12) {return (hh + ':00 AM')}
      }

    const navigate=useNavigate();

    return (
        <Table>
            <thead style={{backgroundColor:"lightgray"}}>
                    <tr>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Stylist</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Services</th>
                        <th>Price</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {upcomingApp?.map(a => {
                        return (
                            <tr key={a.id}>
                                <th scope="row">{a.id}</th>
                                <td>{a.customer.name}</td>
                                <td>{a.stylist.name}</td>
                                <td>{getFormattedDate(a.date)}</td>
                                <td>{getFormattedTime(a.date)}</td>
                                <td>{a.appointmentServices?.map(s => {return <div key={s.id}>{s.service.name}</div>} )}</td>
                                <td>${a.totalCost}</td>
                                <td><Button
                                    size="sm"
                                    value={a.id}
                                    onClick={(e) => navigate(`edit/${e.target.value}`)}
                                    >Edit</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
        </Table>
    )
}