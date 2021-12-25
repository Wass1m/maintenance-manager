import React, { useEffect, useState } from "react";
import PagedTable from "../../common/PagedTable";
import { getTickets, solveTicket } from "../../../redux/actions/ticket";
import { connect } from "react-redux";
import Loading from "../../common/Loading";
import Modal from "../../common/Modal";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ManageTickets = ({
  getTickets,
  solveTicket,
  ticket: { tickets, loading },
}) => {
  useEffect(() => {
    getTickets();
  }, []);

  const [modal, setModal] = useState(false);
  const [solveModal, setSolveModal] = useState(false);
  const [ressourceToSolve, setRessourceToSolve] = useState(-1);

  const handleSolveState = (state) => {
    setSolveModal(state);
  };

  const handleSolve = (ressourceID) => {
    setRessourceToSolve(ressourceID);
    handleSolveState(true);
  };

  const confirmSolve = () => {
    handleSolveState(false);
    solveTicket(ressourceToSolve);
    setRessourceToSolve(-1);
  };

  const cancelSolve = () => {
    handleSolveState(false);
    setRessourceToSolve(-1);
  };

  let navigate = useNavigate();

  const columns = [
    {
      name: "Numero",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Localisation",
      selector: (row) => row.localisation,
      sortable: true,
    },
    {
      name: "Date de creation",
      selector: (row) => row.createdAt,
      sortable: true,
    },

    {
      name: "Anomalies",
      selector: (row) => row.anomalies.length,
    },
    {
      name: "Etat",
      selector: (row) =>
        row.solved ? (
          <span className="success">Resolu</span>
        ) : (
          <span className="pending">En Cours</span>
        ),
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) =>
        solveModal && row.id == ressourceToSolve ? (
          <>
            <button onClick={confirmSolve} className="small-button confirm">
              Confirmer
            </button>
            <button onClick={cancelSolve} className="small-button cancel">
              Annuler
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate(`/responsable/manage/tickets/${row.id}`)}
              className="small-button"
            >
              Consulter
            </button>
            <button
              onClick={() => handleSolve(row.id)}
              className="small-button"
            >
              Resoudre
            </button>
          </>
        ),
    },
  ];

  var ticketsData = [];

  tickets.map((tick) => {
    ticketsData.unshift({
      ...tick.ticket,
      anomalies: tick.anomalies,
    });
  });

  return loading ? (
    <Loading />
  ) : (
    <div>
      <PagedTable data={ticketsData} columns={columns} type={"ressource"} />
      {/* <DataTables
        data={users}
        headers={["NUMERO", "PRENOM", "NOM", "EMAIL", "DATE CREATION", "ROLE"]}
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
});

export default connect(mapStateToProps, { getTickets, solveTicket })(
  ManageTickets
);
