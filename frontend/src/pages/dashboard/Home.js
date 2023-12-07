import React, { useState, useEffect } from "react";
import Header from "../../master/Header";
import Footer from "../../master/Footer";
import { format } from "date-fns";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import UserServices from "../../services/users/users.services";
import "../../assets/css/custom.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [tableData, setTableData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await UserServices.listUser();
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  };
  useEffect(() => {
    fetchData()
      .then((data) => {
        setTableData(data);
        setOriginalData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleFilter(event) {
    const filterValue = event.target.value.toLowerCase();

    const newData = originalData.filter((row) => {
      return Object.values(row).some(
        (value) =>
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(filterValue)
      );
    });

    setTableData(newData);
  }
  const handleDeleteUser = async (e, id) => {
    e.preventDefault();
    alert('Are you sure you want to delete this user?')
    try {
      await UserServices.deleteUser(id);
      const updatedData = await fetchData();
      setTableData(updatedData);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Unknown error Occured!");
    }
  };
  const columns = [
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => format(new Date(row.createdAt), "yyyy-MM-dd"),
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <Link to={`/edit/user/${row.id}`} className="button-link">
            <i class="fa fa-edit" aria-hidden="true"></i>
          </Link>
          &nbsp;
          <button
            className="button-delete"
            onClick={(e) => handleDeleteUser(e, row.id)}
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 mt-4">
            <h3 className="text-center">
              User Management Application with React and Node Js
            </h3>
          </div>
        </div>
        <div class="table-responsive mt-5 mb-5">
          <div className="text-start">
            <Link to="/add/user" className="btn btn-outline-primary save_btn">
              Add User
            </Link>
          </div>
          <div className="text-end">
            <input type="text" onChange={handleFilter} />
          </div>
          <DataTable
            columns={columns}
            data={tableData}
            pagination
            // expandableRows
            fixedHeader
          />
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Home;
