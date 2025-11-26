const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");
const Property = require("../models/Property");
const {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} = require("../controllers/propertyController");

const router = express.Router();

// Create property (seller or admin only)
router.post("/add", authMiddleware, roleMiddleware(["seller", "admin"]), addProperty);

// Read all properties (public)
router.get("/", getAllProperties);

// Read single property (public)
router.get("/:id", getPropertyById);

// Update property (seller or admin only)
router.put("/:id", authMiddleware, roleMiddleware(["seller", "admin"]), updateProperty);

// Delete property (seller or admin only)
router.delete("/:id", authMiddleware, roleMiddleware(["seller", "admin"]), deleteProperty);

// Upload property images (seller/admin)
router.post(
  "/upload/:id",
  authMiddleware,
  roleMiddleware(["seller", "admin"]),
  upload.array("images", 5),
  async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      if (property.owner.toString() !== req.user.userId) {
        return res.status(403).json({ message: "You are not allowed to upload images for this property" });
      }

      const uploadedUrls = req.files.map(file => file.path);
      property.images.push(...uploadedUrls);
      await property.save();

      res.json({ message: "Images uploaded successfully", images: property.images });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

module.exports = router;
