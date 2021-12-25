import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ressourceImg from "../../assets/images/ressource.png";
import statiCaptcha from "../../assets/images/static_captcha.png";
import { connect } from "react-redux";
import { getRessourcesById } from "../../redux/actions/ressource";
import { createTicket } from "../../redux/actions/ticket";
import { notify } from "../../redux/actions/notification";
import Loading from "../common/Loading";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignalRessource = ({
  ticket: { ticket, error },
  ressource: { ressource, loading },
  getRessourcesById,
  createTicket,
  auth: { user },
}) => {
  const { ressourceID } = useParams();

  useEffect(() => {
    getRessourcesById(ressourceID);
  }, []);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  // Captcha static pour un exemple de securite

  const [isCaptcha, setIsCaptcha] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  // Erreur pour absence de donnee
  const [emptyError, setEmptyError] = useState("");

  // Si creer on retourne a la page home
  let navigate = useNavigate();

  const endTicket = () => {
    navigate("/");
  };
  // Notifie les utilisateurs de leurs actions
  const notifyUser = (type, message) => {
    notify(type, message);
  };

  // Gere la validation de la creation de ticket
  const handleValidation = (data, notify) => {
    // Si aucune donnee, on retourne un message
    if (data.newAnomalie.length == 0 && previousAnomalies.length == 0) {
      setEmptyError("Veuillez selectionner ou rentrer une anomalie !");
    } else {
      setEmptyError("");
      setIsCaptcha(true);
    }
  };

  const handleCaptcha = (data) => {
    if (data.captcha == "uWTd8r") {
      var formData = {};
      formData.newAnomalie = data.newAnomalie;
      formData.anomalies = previousAnomalies;
      if (user != null) {
        formData.userID = user.id;
      }
      createTicket(formData, ressourceID, notifyUser, endTicket);
    } else {
      setCaptchaError("Mauvais captcha !");
    }
  };

  const [previousAnomalies, setPreviousAnomalies] = useState([]);

  const handleAnomalies = (anomaly, state) => {
    if (state == false) {
      setPreviousAnomalies(previousAnomalies.filter((ano) => ano != anomaly));
    } else if (state == true) {
      setPreviousAnomalies([...previousAnomalies, anomaly]);
    }
  };

  return loading || ressource == null ? (
    <Loading />
  ) : (
    <div className="signal-ressource">
      <div className="signal-container">
        <h1 className="text-center">{ressource.ressource.description}</h1>
        <h3 className="text-center localisation">
          {" "}
          {ressource.ressource.localisation}
        </h3>
        <div className="ressource-image">
          <img src={ressourceImg} alt="" />
        </div>
        <div className="anomalies">
          <h2 className="anomalies-header">Historique d'anomalies</h2>

          <ul className="anomalies-list">
            {ressource.anomalies.map((anomalie) => (
              <div key={anomalie.id} className="check-field">
                <input
                  name={`anomaly${anomalie.id}`}
                  type="checkbox"
                  onClick={(e) =>
                    handleAnomalies(anomalie.id, e.target.checked)
                  }
                  {...register(`anomaly${anomalie.id}`)}
                  id={`checkAnomaly${anomalie.id}`}
                  className="waitcheckb"
                />
                <label
                  htmlFor={`anomaly${anomalie.id}`}
                  className="form-check-label"
                >
                  {anomalie.description}
                </label>
              </div>
            ))}
            <div className="check-field">
              <input type="checkbox" className="waitcheckb" />
              <label className="form-check-label">lol</label>
            </div>
            <div className="check-field">
              <input type="checkbox" className="waitcheckb" />
              <label className="form-check-label">lol</label>
            </div>
            <div className="check-field">
              <input type="checkbox" className="waitcheckb" />
              <label className="form-check-label">lol</label>
            </div>
            <div className="check-field">
              <input type="checkbox" className="waitcheckb" />
              <label className="form-check-label">lol</label>
            </div>
            <div className="check-field">
              <input type="checkbox" className="waitcheckb" />
              <label className="form-check-label">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto,
                placeat.
              </label>
            </div>
            <div className="check-field">
              <input type="checkbox" className="waitcheckb" />
              <label className="form-check-label">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                molestias.
              </label>
            </div>
            <div className="check-field">
              <input type="checkbox" className="waitcheckb" />
              <label className="form-check-label">lol</label>
            </div>
            <div className="check-field">
              <input type="checkbox" className="waitcheckb" />
              <label className="form-check-label">lol</label>
            </div>
            <div className="check-field">
              <input type="checkbox" className="waitcheckb" />
              <label className="form-check-label">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                rerum accusamus ad veritatis ex repudiandae consequuntur! Iste
                perspiciatis modi asperiores.
              </label>
            </div>
          </ul>
        </div>
        {isCaptcha ? (
          <form onSubmit={handleSubmit(handleCaptcha)} className="signal-form">
            <div className="field">
              <label className="field_required" htmlFor="newAnomalie_ID">
                Veuillez rentrer le text que vous voyez
              </label>
              <div className="captcha-image">
                <img src={statiCaptcha} alt="" />
              </div>
              <input
                {...register("captcha", { required: true })}
                className="input"
                type="text"
                name="captcha"
                id="captcha_ID"
              />
              {errors.captcha && (
                <div className="form-error">
                  {errors.captcha.type === "required" && (
                    <p id="captcha-error" class="field_error">
                      Captcha requis.
                    </p>
                  )}
                </div>
              )}
            </div>

            {captchaError != "" && (
              <div className="mt-40">
                <p id="ticket-error" class="field_error">
                  {captchaError}
                </p>
              </div>
            )}

            <input
              type="submit"
              name="commit"
              value="Confirmer"
              className="button -full"
              data-disable-with="verify captcha..."
            />
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(handleValidation)}
            className="signal-form"
          >
            <div className="field">
              <label className="field_required" htmlFor="newAnomalie_ID">
                Decrire une nouvelle anomalie
              </label>
              <input
                {...register("newAnomalie", { required: false })}
                className="input"
                autoComplete="text"
                type="text"
                id="newAnomalie_ID"
              />
              {errors.newAnomalie && (
                <div className="form-error">
                  {errors.newAnomalie.type === "required" && (
                    <p id="newAnomalie-error" class="field_error">
                      Anomalie requise.
                    </p>
                  )}
                </div>
              )}
            </div>

            {error !== null && (
              <div className="mt-40">
                <p id="ticket-error" class="field_error">
                  {error}
                </p>
              </div>
            )}

            {emptyError != "" && (
              <div className="mt-40">
                <p id="ticket-error" class="field_error">
                  {emptyError}
                </p>
              </div>
            )}

            <input
              type="submit"
              name="commit"
              value="Signaler"
              className="button -full"
              data-disable-with="Creating account..."
            />
          </form>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ticket: state.ticket,
  ressource: state.ressource,
  auth: state.authentification,
});

export default connect(mapStateToProps, { getRessourcesById, createTicket })(
  SignalRessource
);
