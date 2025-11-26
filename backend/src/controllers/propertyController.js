const Property = require("../models/Property");

exports.addProperty = async (req, res) => {
  try {
    const { title, price, location, description, type } = req.body;

    // Ensure required fields exist
    if (!title || !price || !location || !type) {
      return res.status(400).json({ message: "Please enter all required fields." });
    }

    // Create property assigned to logged-in user
    const newProperty = new Property({
      title,
      price,
      location,
      description,
      type,
      owner: req.user.userId
    });

    await newProperty.save();

    res.status(201).json({
      message: "Property added successfully",
      property: newProperty
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("owner", "name email");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "name email");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this property"
      });
    }

    // Update
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Property updated successfully",
      updatedProperty
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this property"
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Property deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
