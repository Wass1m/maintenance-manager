import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRessourcesById } from "../../../redux/actions/ressource";
import Loading from "../../common/Loading";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
const PageQR = ({
  ressource: { loading, ressource },
  getRessourcesById,
  auth: { user },
}) => {
  const { ressourceID } = useParams();

  useEffect(() => {
    getRessourcesById(ressourceID);
  }, []);

  let navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return loading || ressource == null ? (
    <Loading />
  ) : ressource.ressource.responsableID != user.id ? (
    <Navigate to="/" />
  ) : (
    <div className="qr-page">
      <div id="my-qr" className="qr-container">
        <div className="qr-content">
          <QRCode
            size="150"
            className="qr-image"
            value={`${process.env.REACT_APP_URL}signaler/${ressourceID}`}
          />

          <div className="qr-infos">
            <div className="qr-text">
              <h1>Flashez-moi</h1>
              <h4>Pour rapporter un problème avec ce materiel</h4>
            </div>
            <div className="qr-url">{`${process.env.REACT_APP_URL}signaler/${ressourceID}`}</div>
          </div>
        </div>
      </div>
      <div onClick={handlePrint} className="print-me">
        🖨
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ressource: state.ressource,
  auth: state.authentification,
});

export default connect(mapStateToProps, { getRessourcesById })(PageQR);
