const multer = require("multer");
const Property = require("../database/models/property");


// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =========================
   ADD PROPERTY (SELL)
========================= */

async function addProperty(req, res) {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    const {
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      sqft,
      propertyType,
    } = req.body;

    // Validate fields
    if (
      !title ||
      !location ||
      !price ||
      !bedrooms ||
      !bathrooms ||
      !sqft ||
      !propertyType
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    //  Prevent mongoose crash
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid property ID" });
    // }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const images = req.files.map((file) => file.path);

    //  OWNER COMES FROM AUTH MIDDLEWARE
    const owner = req.user.buyerId;
    // owner: req.user.buyerId,
console.log("REQ.USER IN CONTROLLER:", req.user);

    const newProperty = new Property({
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      sqft,
      propertyType,
      images,
      owner,
    });

    await newProperty.save();

    res.status(201).json({
      success: true,
      message: "Property listed successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/* =========================
   GET ALL PROPERTIES
========================= */
const getAllProperties = async (req, res) => {
  try {
    // const properties = await Property.find().populate("owner", "name email");
    const properties = await Property.find();

     res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   GET SINGLE PROPERTY
========================= */
// const getProperty = async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id).populate(
//       "owner",
//       "name email"
//     );

//     if (!property) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     res.json(property);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching property" });
//   }
// };
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Get Property Error:", error);
    res.status(500).json({ message: "Error fetching property" });
  }
};


module.exports = {
  addProperty,
  upload,
  getAllProperties,
  getProperty,
};
