const path = require("path");
const Contact = require("../models/contact");

exports.getMessages = async (req, res, next) => {
  const messages = await Contact.find();
  res.status(200).json({
    success: true,
    data: messages,
  });
};

exports.createMessage = async (req, res, next) => {
  const message = await Contact.create(req.body);
  res.status(200).json({
    success: true,
    data: message,
  });
};
