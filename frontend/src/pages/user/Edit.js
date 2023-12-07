import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserServices from "../../services/users/users.services";
import Header from "../../master/Header";
import Footer from "../../master/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Edit = () => {
  
  const { user_id } = useParams();

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("Please enter your first name")
      .min(3, "Too Short"),
    last_name: Yup.string()
      .required("Please enter your last name")
      .min(3, "Too Short"),
    age: Yup.string().required("Please enter your age"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .min(10, "Mobile number is not valid")
      .max(10, "Mobile number is not valid"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      age: "",
      mobile: "",
      user_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await UserServices.updateUser(values);
        toast.success("User updated successfully");
       
      } catch (error) {
        toast.error("Unknown Error Occured!");
      } finally {
        setSubmitting(false);
      }
    },
  });
  const fetchUserData = async () => {
    try {
      const response = await UserServices.detailsUser(user_id);
      const fetchedData = response.data.data;

      // Set the fetched user data in the component state
      formik.setValues({
        first_name: fetchedData.first_name || "",
        last_name: fetchedData.last_name || "",
        email: fetchedData.email || "",
        age: fetchedData.age || "",
        mobile: fetchedData.mobile || "",
        user_id: fetchedData.id || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [user_id]);

  // Check if userData is available before rendering the form
  // if (!userData.first_name) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <h3 className="text-start mt-3 text-center">Edit User</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="first_name" className="form-label mt-5">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded"
                    id="first_name"
                    name="first_name"
                    {...formik.getFieldProps("first_name")}
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
                  <label htmlFor="last_name" className="form-label mt-5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded"
                    id="last_name"
                    name="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
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
                  <label htmlFor="email" className="form-label mt-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control rounded"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
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
                  <label htmlFor="age" className="form-label mt-2">
                    Age
                  </label>
                  <input
                    type="number"
                    className="form-control rounded"
                    id="age"
                    name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    placeholder="Enter your age "
                  />
                  {formik.errors.age ? (
                    <span name="error" className="text-danger">
                      {formik.errors.age}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="mobile" className="form-label mt-2">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    className="form-control rounded"
                    id="mobile"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    placeholder="Enter your mobile "
                  />
                  {formik.errors.mobile ? (
                    <span name="error" className="text-danger">
                      {formik.errors.mobile}
                    </span>
                  ) : null}
                </div>
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
                        "Save Changes"
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

export default Edit;
