import React, { useEffect } from "react";
import ressourceImg from "../../../assets/images/ressource.png";
import staticQR from "../../../assets/images/staticQR.png";
import { connect } from "react-redux";
import { getRessourcesById } from "../../../redux/actions/ressource";
import Loading from "../../common/Loading";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Ressource = ({
  ressource: { loading, ressource },
  getRessourcesById,
  auth: { user },
}) => {
  const { ressourceID } = useParams();

  useEffect(() => {
    getRessourcesById(ressourceID);
  }, []);

  let navigate = useNavigate();

  const handleQR = () => {
    navigate(`/responsable/manage/ressources/generateQR/${ressourceID}`);
  };

  return loading || ressource == null ? (
    <Loading />
  ) : ressource.ressource.responsableID != user.id ? (
    <Navigate to="/" />
  ) : (
    <div className="main-ressource">
      <div className="ressource-container">
        <div className="ressource-header">
          <div></div>
          <h2 className="text-center">{ressource.ressource.description}</h2>
          <div onClick={handleQR} className="staticQR">
            <img src={staticQR} alt="" />
          </div>
        </div>

        <h4 className="text-center localisation">
          {ressource.ressource.localisation}
        </h4>
        <div className="ressource-image">
          <img src={ressourceImg} alt="" />
        </div>
        <div className="anomalies">
          <h2 className="anomalies-header">Anomalies</h2>

          <ul className="anomalies-list">
            {ressource.anomalies.map((anomalie) => (
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
  ressource: state.ressource,
  auth: state.authentification,
});

export default connect(mapStateToProps, { getRessourcesById })(Ressource);
