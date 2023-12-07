import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import loginImage from "../../assets/images/register.svg";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/auth/auth.services";

const Login = ({ history }) => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),

    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit(values) {
      AuthServices.Login(values).then(
        (response) => {
          localStorage.setItem(
            "userToken",
            JSON.stringify(response.data.token)
          );

          navigate("/user/dashboard");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          console.log(resMessage);
        }
      );
    },
  });
  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <div className="row">
          <h3 className="text-start mt-3 text-center text-primary">Login</h3>

          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <div className="">
                  <img src={loginImage} alt="" className="img-fluid" />
                </div>
              </div>
              <div className="col-sm-6 mt-5">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control rounded"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Enter your email"
                  />
                  {formik.errors.email ? (
                    <span name="error" className="text-danger error">
                      {formik.errors.email}
                    </span>
                  ) : null}
                </div>
                {/* </div>
              <div className="col-sm-6"> */}
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control rounded"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Enter your password "
                  />
                  {formik.errors.password ? (
                    <span name="error" className="text-danger error">
                      {formik.errors.password}
                    </span>
                  ) : null}
                </div>

                {/* Button */}
                <div className="row mt-2">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <button
                      className="btn btn-outline-primary  col-sm-12 btn_primary"
                      type="submit"
                    >
                      Login <i class="fas-solid fa-right-to-bracket"></i>
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  Don't have an account?
                  <Link to="/" className="link">
                    &nbsp;Register
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default Login;
