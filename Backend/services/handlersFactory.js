const asyncHandler = require("express-async-handler");
const fs = require("fs").promises;
const ApiError = require("../utils/apiError");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200);
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(document);
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    // Check if a file was uploaded
    // if (!req.file) {
    //   return res.status(400).json({ error: "No image uploaded" });
    // }

    const imageBuffer = await fs.readFile(req.file.path);

    const documentData = {
      [imageFieldName]: {
        data: imageBuffer,  
        contentType: req.file.mimetype,
      },
    };

    otherFieldNames.forEach((field) => {
      documentData[field] = req.body[field];
    });

    try {
      const newDocument = await Model.create(documentData);

      // Delete the temporary file after processing
      await fs.unlink(req.file.path);

      res.status(201).json({ data: newDocument });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json(document);
  });

exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const document = await Model.find({});
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json(document);
  });
