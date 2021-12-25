import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { addResponsable } from "../../../redux/actions/admin";

const AddResponsable = ({
  addResponsable,
  admin: { error, loading },
  endModal,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    addResponsable(data);
    endModal();
  };

  return (
    <div className="login-wrapper">
      <div className="container flex center pt-32">
        <main>
          <div className="text -align-center mb-48">
            <h1 className="">Ajouter un responsable</h1>
            <p className="text -big mt-16">
              {/* Already having an account? <Link to="/user/login">Go-to-App</Link> */}
            </p>
          </div>
          <form onSubmit={handleSubmit(handleLogin)} className="stack -gap-16">
            <div className="field">
              <label className="field_required" htmlFor="user_firstName">
                Prenom
              </label>
              <input
                {...register("firstName", { required: true })}
                className="input"
                autoComplete="text"
                type="text"
                id="user_firstName"
              />
              {errors.firstName && (
                <div className="form-error">
                  {errors.firstName.type === "required" && (
                    <p id="firstName-error" className="field_error">
                      Le prenom est requis.
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="field">
              <label className="field_required" htmlFor="user_firstName">
                Nom
              </label>
              <input
                {...register("lastName", { required: true })}
                className="input"
                autoComplete="text"
                type="text"
                id="user_lastName"
              />
              {errors.lastName && (
                <div className="form-error">
                  {errors.lastName.type === "required" && (
                    <p id="lastName-error" className="field_error">
                      Le nom est requis.
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="field">
              <label className="field_required" htmlFor="user_email">
                Adresse email
              </label>
              <input
                {...register("email", { required: true })}
                className="input"
                autoComplete="email"
                type="email"
                id="user_email"
              />
              {errors.email && (
                <div className="form-error">
                  {errors.email.type === "required" && (
                    <p id="email-error" className="field_error">
                      L'email est requis.
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="field">
              <label className="field_required" htmlFor="user_password">
                Mot de passe
              </label>
              <input
                {...register("password", { minLength: 8, required: true })}
                className="input"
                autoComplete="new-password"
                aria-describedby="pw-req"
                type="password"
                id="user_password"
                aria-autocomplete="list"
              />
              {errors.password && (
                <div className="form-error">
                  {errors.password.type === "required" && (
                    <p id="password-error" className="field_error">
                      Le mot de passe est requis.
                    </p>
                  )}
                  {errors.password.type === "minLength" && (
                    <p id="password-error-length" className="field_error">
                      Le mot de passe doit comprendre 8 caracteres au minimum.
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
  admin: state.admin,
});

export default connect(mapStateToProps, { addResponsable })(AddResponsable);
