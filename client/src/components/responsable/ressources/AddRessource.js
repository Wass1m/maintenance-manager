import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { addRessource } from "../../../redux/actions/ressource";

const AddRessource = ({
  addRessource,
  ressource: { error, ressources, loading },
  endModal,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleDone = (data) => {
    addRessource(data, endModal);
  };

  return (
    <div className="login-wrapper">
      <div className="container ressource flex center pt-32">
        <main>
          <div className="text -align-center mb-48">
            <h1 className="">Ajouter une ressource</h1>
            <p className="text -big mt-16">
              {/* Already having an account? <Link to="/user/login">Go-to-App</Link> */}
            </p>
          </div>
          <form onSubmit={handleSubmit(handleDone)} className="stack -gap-16">
            <div className="field">
              <label className="field_required" htmlFor="user_firstName">
                Description
              </label>
              <input
                {...register("description", { required: true })}
                className="input"
                autoComplete="text"
                type="text"
                id="ressource_description"
              />
              {errors.firstName && (
                <div className="form-error">
                  {errors.firstName.type === "required" && (
                    <p id="firstName-error" className="field_error">
                      La description est requise.
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="field">
              <label className="field_required" htmlFor="user_firstName">
                Localisation
              </label>
              <input
                {...register("localisation", { required: true })}
                className="input"
                autoComplete="text"
                type="text"
                id="ressource_localisation"
              />
              {errors.lastName && (
                <div className="form-error">
                  {errors.lastName.type === "required" && (
                    <p id="lastName-error" className="field_error">
                      La localisation est requise
                    </p>
                  )}
                </div>
              )}
            </div>

            {error !== null && (
              <div className="mt-40">
                <p id="email-error" className="field_error">
                  {error}
                </p>
              </div>
            )}
            <input
              type="submit"
              name="commit"
              value="Creer"
              className="button -full"
              data-disable-with="Creating account..."
            />
          </form>
        </main>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ressource: state.ressource,
});

export default connect(mapStateToProps, { addRessource })(AddRessource);
