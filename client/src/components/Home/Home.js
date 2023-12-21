
export const Home = () => {
    return (
    <div className="container">
        <div className="header">
            <h1>Home</h1>
        </div>
        <div className="main">
            <h4>About</h4>
            <p>
                This application was built as an exercise for NSS. "Hillary" hired me to build an application to help her schedule appointments between customers and stylists.
                I was given a list of needs from Hillary, and created a wireframe, ERD, GitHub tickets, GitHub project board, and repositroy for this project.
            </p>
            <h4>Technical Details</h4>
            <p>
                This app was built with a ASP/.NET Minimal API web api, using PostgreSQL and Entity Framework Core for data storage and access.
                The front-end was built using React, Bootstrap, and vanilla CSS.
            </p>
            <h4>Technical Skills Used</h4>
            <table style={{marginBottom:14}}>
                <tr>
                    <td style={{paddingLeft:0}}><img width="50" src="https://user-images.githubusercontent.com/25181517/121405384-444d7300-c95d-11eb-959f-913020d3bf90.png" alt="C#" title="C#"/></td>
                    <td style={{paddingLeft:30}}><img width="50" src="https://user-images.githubusercontent.com/25181517/121405754-b4f48f80-c95d-11eb-8893-fc325bde617f.png" alt=".NET Core" title=".NET Core"/></td>
                    <td style={{paddingLeft:30}}><img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></td>
                    <td style={{paddingLeft:30}}><img width="50" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" title="PostgreSQL"/></td>
                    <td style={{paddingLeft:30}}><img width="50" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/></td>
                    <td style={{paddingLeft:30}}><img width="50" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" title="HTML"/></td>
                </tr>
                <tr>
                    <td style={{paddingLeft:0}}><img width="50" src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" title="CSS"/></td>
                    <td style={{paddingLeft:30}}><img width="50" src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png" alt="Bootstrap" title="Bootstrap"/></td>
                    <td style={{paddingLeft:30}}><img width="50" src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png" alt="Visual Studio Code" title="Visual Studio Code"/></td>
                    <td style={{paddingLeft:30}}><img width="50" src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" alt="GitHub" title="GitHub"/></td>
                    <td style={{paddingLeft:30}}><img width="50" src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" alt="Swagger" title="Swagger"/></td>
                </tr>
            </table>
            <h4>Soft Skills Used</h4>
            <ul>
                <li>Problem Solving</li>
                <li>Project Planning</li>
                <li>Organization</li>
                <li>Creativity</li>
                <li>Self-Learning</li>
            </ul>
        </div>
    </div>)
}