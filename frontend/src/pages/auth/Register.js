import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import AuthServices from "../../services/auth/auth.services";
import registerImage from "../../assets/images/register_user.svg";
import { Link, useNavigate } from "react-router-dom";



const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your name").min(3, "too Short"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .min(10, "Mobile number is not valid")
      .max(10, "Mobile number is not valid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Doesn't match with given criteria")
      .max(15, "Doesn't match with given criteria"),

    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit(values) {
      setIsLoading(true);
      AuthServices.register(values).then(
        (response) => {
         
          // swal("Good job!", "Sign UP Successfully", "success").then(
          //   function () {
          navigate("/login");
          //   }
          // );
        },
        (error) => {
          setIsLoading(false);
         

            console.log(error);
           
          
        }
      );
    },
  });
  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <div className="row">
          <h3 className="text-start mt-3 text-center text-primary">Register</h3>

          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <div className="mt-5">
                  <img src={registerImage} alt="" className="img-fluid" />
                </div>
              </div>
              <div className="col-sm-6 mt-5">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded"
                    id="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Enter your name!"
                  />
                  {formik.errors.name ? (
                    <span name="error" className="text-danger error">
                      {formik.errors.name}
                    </span>
                  ) : null}
                </div>
                {/* </div>
              <div className="col-sm-6"> */}
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
                {/* </div>
              <div className="col-sm-6"> */}
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control rounded"
                    id="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    placeholder="Enter your confirm password "
                  />
                  {formik.errors.confirmPassword ? (
                    <span name="error" className="text-danger error">
                      {formik.errors.confirmPassword}
                    </span>
                  ) : null}
                </div>
                {/* </div>
              <div className="col-sm-6"> */}
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control rounded"
                    id="mobile"
                    onChange={formik.handleChange}
                    value={formik.values.mobile}
                    placeholder="Enter your mobile "
                  />
                  {formik.errors.mobile ? (
                    <span name="error" className="text-danger error">
                      {formik.errors.mobile}
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
                      Register <i class="fas-solid fa-right-to-bracket"></i>
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  Already have an account{" "}
                  <Link to="/login" className="link">
                    Login
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
export default Register;
