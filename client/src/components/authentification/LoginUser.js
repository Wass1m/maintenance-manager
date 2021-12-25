import React from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import loader from "../../assets/images/loader.gif";
import { loginUser } from "../../redux/actions/authentification";

const LoginUser = ({ auth, loginUser }) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    loginUser(data);
  };

  if (auth.isAuthenticated && auth.user != null) {
    switch (auth.role) {
      case "admin":
        return <Navigate to="/admin" />;
      case "responsable":
        return <Navigate to="/responsable" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return (
    <div className="login-wrapper">
      <div className="container auth flex center pt-32 ">
        <main>
          <div className="text -align-center mb-48">
            <h1 className="">Identifiez-Vous</h1>
            <p className="text -big mt-16">
              {/* Already having an account? <Link to="/user/login">Go-to-App</Link> */}
            </p>
          </div>
          <form onSubmit={handleSubmit(handleLogin)} className="stack -gap-16">
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

            {auth.error !== null && (
              <div className="mt-40">
                <p id="email-error" className="field_error">
                  {auth.error == "email_exist"
                    ? "Your email address already exists, please use a new one"
                    : auth.error}
                </p>
              </div>
            )}

            {!auth.loading ? (
              <input
                type="submit"
                name="commit"
                value="Identifiez-Vous"
                className="button -full"
                data-disable-with="Creating account..."
              />
            ) : (
              <img height="100px" width="100px" src={loader} alt="" />
            )}
          </form>
        </main>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authentification,
});

export default connect(mapStateToProps, { loginUser })(LoginUser);
