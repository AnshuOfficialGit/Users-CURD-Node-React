import React from "react";
import Header from "../../master/Header";
import Footer from "../../master/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
// import registerImage from "../../assets/register_user.svg";
const Add = () => {
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your name").min(3, "too Short"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .min(10, "Mobile number is not valid")
      .max(10, "Mobile number is not valid"),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit(values) {
      console.log(values);
    },
  });
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <h3 className="text-start mt-3 text-center">Profile</h3>

          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="name" className="form-label mt-5">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded"
                    id="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Enter your name!"
                  />
                  {formik.errors.name ? (
                    <span name="error" className="text-danger">
                      {formik.errors.name}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="email" className="form-label mt-5">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control rounded"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Enter your email"
                  />
                  {formik.errors.email ? (
                    <span name="error" className="text-danger">
                      {formik.errors.email}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="password" className="form-label mt-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Enter your password "
                  />
                  {formik.errors.password ? (
                    <span name="error" className="text-danger">
                      {formik.errors.password}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="confirm_password" className="form-label mt-2">
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    className="form-control rounded"
                    id="confirm_password"
                    onChange={formik.handleChange}
                    value={formik.values.confirm_password}
                    placeholder="Enter your confirm password "
                  />
                  {formik.errors.confirm_password ? (
                    <span name="error" className="text-danger">
                      {formik.errors.confirm_password}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="mobile" className="form-label mt-2">
                    Mobile
                  </label>
                  <input
                    type="text"
                    className="form-control rounded"
                    id="mobile"
                    onChange={formik.handleChange}
                    value={formik.values.mobile}
                    placeholder="Enter your mobile "
                  />
                  {formik.errors.mobile ? (
                    <span name="error" className="text-danger">
                      {formik.errors.mobile}
                    </span>
                  ) : null}
                </div>
                {/* Button */}
              </div>
              <div className="col-sm-6">
                <div className="row mt-5">
                  <div className="d-flex justify-content-end">
                
                    <Link
                      to="/user/dashboard"
                      className="btn btn-outline-primary cancel_btn"
                    >
                      Cancel
                    </Link>
                 
                  &nbsp;&nbsp;&nbsp;
                  <button
                    className="btn btn-outline-primary save_btn "
                    type="submit"
                  >
                    Update
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Add;
