import { Table } from "reactstrap"


export const PastApp = ({allAppointments}) => {
    const pastApp = allAppointments?.filter(app => app.isPast === true)

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString); // {object Date}
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate() + 1;
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

    return (
        <Table>
            <thead>
                    <tr>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Stylist</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Services</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pastApp?.map(a => {
                        return (
                            <tr key={a.id}>
                                <th scope="row">{a.id}</th>
                                <td>{a.customer.name}</td>
                                <td>{a.stylist.name}</td>
                                <td>{getFormattedDate(a.date)}</td>
                                <td>{getFormattedTime(a.date)}</td>
                                <td>{a.appointmentServices?.map(s => {return <div>{s.service.name}</div>} )}</td>
                                <td>${a.totalCost}</td>
                            </tr>
                        )
                    })}
                </tbody>
        </Table>
    )
}