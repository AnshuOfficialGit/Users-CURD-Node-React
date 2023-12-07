const apiSuccess = require("../../responses/success");
const apiError = require("../../responses/error");
const db = require("../../database/database");
const Users = db.Users;

/* Create product api */
const store = async (req, resp) => {
  try {
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      age: req.body.age,
      mobile: req.body.mobile,
      //   profile_image: req.file.filename,
    };
    const protocol = req.protocol;
    const hostname = req.get("host");
    const users = await Users.create(userData);
    if (users) {
      const result = {
        id: users.id,
        first_name: users.first_name,
        last_name: users.last_name,
        email: users.email,
        age: users.age,
        mobile: users.mobile,
        // profile_image: users.getProductImageURL(protocol, hostname),
      };
      const data = {
        Users: result,
        status: true,
        message: "User added sucessfully!",
      };
      apiSuccess(resp, data);
    } else {
      const errorData = {
        status: false,
        message: "Unable to add User!",
      };
      apiError(resp, errorData);
    }
  } catch (error) {
    const errorData = {
      error: error.message,
      status: false,
      // 'message': "Unable to create Category!"
    };
    apiError(resp, errorData);
  }
};
/* list product api */
const list = async (req, resp) => {
  try {
    const protocol = req.protocol;
    const hostname = req.get("host");
    var list_users = await Users.findAll({});

    // Apply the accessor to each product
    for (const user of list_users) {
      user.dataValues.product_image_url = user.getProductImageURL(
        protocol,
        hostname
      ); // Call the accessor method
    }
    if (list_users) {
      const data = {
        status: true,
        message: `Users fetched sucessfully!`,
        data: list_users,
      };
      apiSuccess(resp, data);
    } else {
      const errorData = {
        status: false,
        message: "No Products found!",
      };
      apiError(resp, errorData);
    }
  } catch (error) {
    const errorData = {
      error: error.message,
      status: false,
    };
    apiError(resp, errorData);
  }
};
/* signle product list api */
const details = async (req, resp) => {
  try {
    const protocol = req.protocol;
    const hostname = req.get("host");
    if (req.params.user_id) {
      var user_details = await Users.findOne({
        where: { id: req.params.user_id },
      });
      // Apply the accessor to each product

      if (user_details) {
        const data = {
          status: true,
          message: `Users fetched sucessfully!`,
          data: user_details,
        };
        apiSuccess(resp, data);
      } else {
        const errorData = {
          status: false,
          message: "No User found!",
        };
        apiError(resp, errorData);
      }
    } else {
      const errorData = {
        status: false,
        message: "User id is required",
      };
      apiError(resp, errorData);
    }
  } catch (error) {
    const errorData = {
      error: error.message,
      status: false,
    };
    apiError(resp, errorData);
  }
};
/* update product api */
const update = async (req, resp) => {
  try {
    const user = await Users.findByPk(req.body.user_id);
    if (user) {
      const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        mobile: req.body.mobile,
      };
      const update_user = await Users.update(userData, {
        where: { id: req.body.user_id },
      });
      if (update_user) {
        const updated_user = await Users.findByPk(req.body.user_id);
        const data = {
          user: updated_user,
          status: true,
          message: "User updated sucessfully!",
        };
        apiSuccess(resp, data);
      } else {
        const errorData = {
          // 'error': error.message,
          status: false,
          message: "Unable to update User!",
        };
        apiError(resp, errorData);
      }
    } else {
      const errorData = {
        // 'error': error.message,
        status: false,
        message: "User id is required",
      };
      apiError(resp, errorData);
    }
  } catch (error) {
    const errorData = {
      error: error.message,
      status: false,
      // 'message': "Unable to create Category!"
    };
    apiError(resp, errorData);
  }
};

const deleteUser = async (req, resp) => {
  try {
    if (req.body.user_id) {
      const user = await Users.findByPk(req.body.user_id);

      if (user) {
        await user.destroy();
        const data = {
          status: true,
          message: `User deleted sucessfully!`,
        };
        apiSuccess(resp, data);
      } else {
        const errorData = {
          status: false,
          message: "No User found!",
        };
        apiError(resp, errorData);
      }
    } else {
      const errorData = {
        status: false,
        message: "User id is required",
      };
      apiError(resp, errorData);
    }
  } catch (error) {
    const errorData = {
      error: error.message,
      status: false,
    };
    apiError(resp, errorData);
  }
};
module.exports = { store, list, details, update, deleteUser };
