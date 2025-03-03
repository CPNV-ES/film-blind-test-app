const Scoreboard = () => {
    return (
        <table className="table table-striped table-sm">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Points</th>
            <th scope="col">Utilisateur</th>
        </tr>
        </thead>
        <tbody>
        <tr className="table-primary">
            <td>1</td>
            <td>1234</td>
            <td>Mikael</td>
        </tr>
        <tr>
            <td>2</td>
            <td>1233</td>
            <td>Sebastien</td>
        </tr>
        <tr>
            <td>3</td>
            <td>1232</td>
            <td>Noha</td>
        </tr>
        </tbody>
    </table>
    );
};

export default Scoreboard;
