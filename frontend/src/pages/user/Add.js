import React from "react";
import Header from "../../master/Header";
import Footer from "../../master/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link} from "react-router-dom";
import UserServices from "../../services/users/users.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
 
  const initialValues = {
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    mobile: "",
  
  };
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("Please enter your first name")
      .min(3, "too Short"),
    last_name: Yup.string()
      .required("Please enter your last name")
      .min(3, "too Short"),
    age: Yup.string().required("Please enter your age"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .min(10, "Mobile number is not valid")
      .max(10, "Mobile number is not valid"),
   
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await UserServices.addUser(values);
        toast.success("User added successfully");
        formik.resetForm();
      } catch (error) {
        toast.error("User added successfully");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <h3 className="text-start mt-3 text-center">Add User</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="name" className="form-label mt-5">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded"
                    id="first_name"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    placeholder="Enter your first name!"
                  />
                  {formik.errors.first_name ? (
                    <span name="error" className="text-danger">
                      {formik.errors.first_name}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="name" className="form-label mt-5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded"
                    id="last_name"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    placeholder="Enter your last name!"
                  />
                  {formik.errors.last_name ? (
                    <span name="error" className="text-danger">
                      {formik.errors.last_name}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="email" className="form-label mt-2">
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
                  <label for="age" className="form-label mt-2">
                    Age
                  </label>
                  <input
                    type="number"
                    className="form-control rounded"
                    id="age"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    placeholder="Enter your age "
                  />
                  {formik.errors.age ? (
                    <span name="error" className="text-danger">
                      {formik.errors.age}
                    </span>
                  ) : null}
                </div>
              </div>
              {/* <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="profile_image" className="form-label mt-2">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    className="form-control rounded"
                    id="profile_image"
                    onChange={handleImageChange}
                  />
                  {formik.errors.profile_image ? (
                    <span name="error" className="text-danger">
                      {formik.errors.profile_image}
                    </span>
                  ) : null}
                </div>
              </div> */}
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="mobile" className="form-label mt-2">
                    Mobile
                  </label>
                  <input
                    type="tel"
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
                    <Link to="/" className="btn btn-outline-primary cancel_btn">
                      Cancel
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-outline-primary save_btn"
                      type="submit"
                      disabled={formik.isSubmitting} // Disable the button while submitting
                    >
                      {formik.isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          Saving...
                        </>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Add;
