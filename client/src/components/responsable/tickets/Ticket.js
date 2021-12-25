import React, { useEffect } from "react";
import ressourceImg from "../../../assets/images/ressource.png";
import { connect } from "react-redux";
import { getTicketById } from "../../../redux/actions/ticket";
import Loading from "../../common/Loading";
import { Navigate, useParams } from "react-router-dom";

const Ticket = ({
  ticket: { loading, ticket },
  getTicketById,
  auth: { user },
}) => {
  const { ticketID } = useParams();

  useEffect(() => {
    getTicketById(ticketID);
  }, []);

  return loading || ticket == null ? (
    <Loading />
  ) : ticket.ressource.responsableID != user.id ? (
    <Navigate to="/" />
  ) : (
    <div className="main-ressource">
      <div className="ressource-container">
        <h2 className="text-center">{ticket.ressource.description}</h2>
        <h4 className="text-center localisation">
          {ticket.ressource.localisation}
        </h4>
        <div className="ressource-image">
          <img src={ressourceImg} alt="" />
        </div>
        <div className="anomalies">
          <h2 className="anomalies-header">Anomalies</h2>

          <ul className="anomalies-list">
            {ticket.anomalies.map((anomalie) => (
              <li key={anomalie.id} className="anomalies-item">
                {anomalie.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
  auth: state.authentification,
});

export default connect(mapStateToProps, { getTicketById })(Ticket);
