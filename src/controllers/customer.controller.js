const {
  createCustomerService,
  getCustomersService,
  getCustomerByIdService,
  updateCustomerService,
  deleteCustomerService,
} = require("../services/customer.service");

const createCustomer = async (req, res) => {
  try {
    const customer =
      await createCustomerService(
        req.admin.id,
        req.body
      );

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers =
      await getCustomersService(
        req.admin.id
      );

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCustomerById = async (
  req,
  res
) => {
  try {
    const customer =
      await getCustomerByIdService(
        req.admin.id,
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCustomer = async (
  req,
  res
) => {
  try {
    const customer =
      await updateCustomerService(
        req.admin.id,
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCustomer = async (
  req,
  res
) => {
  try {
    await deleteCustomerService(
      req.admin.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};