const express = require("express");
const router = express.Router();

const authorizeRole = require("../middlewares/roleMiddleware.js");
const verifyToken = require("../middlewares/authMiddleware.js");
const { upload } = require("../middlewares/multerMiddleware.js");

const {
  addPet,
  deletePet,
  getPetsByOwner,
  getFilteredPets
} = require("../controllers/petController.js");
const {
  createAdoptionRequest,
  getAllRequestsForOwner,
  respondToAdoptionRequest,
  getUserAdoptionRequests
} = require("../controllers/orderController");

const {
  getMessagesForPet,
  postMessageForPet
} = require("../controllers/messageController");

router.get("/owner", verifyToken, authorizeRole("owner"), (req, res) => {
  res.json({ message: "Hello owner" });
});

router.post(
  "/add",
  verifyToken,
  authorizeRole("owner"),
  upload.single("image"),
  addPet
);

router.delete("/delete/:id", verifyToken, authorizeRole("owner"), deletePet);

//for owner
router.get("/getPets", verifyToken, authorizeRole("owner"), getPetsByOwner);

//for user
router.get("/allPets", verifyToken, authorizeRole("user"), getFilteredPets);

router.post(
  "/request/:petId",
  verifyToken,
  authorizeRole("user"),
  createAdoptionRequest
);

router.get(
  "/viewRequests",
  verifyToken,
  authorizeRole("owner"),
  getAllRequestsForOwner
);

router.put(
  "/respondRequest/:requestId/",
  verifyToken,
  authorizeRole("owner"),
  respondToAdoptionRequest
);

router.get(
  "/myRequests",
  verifyToken,
  authorizeRole("user"),
  getUserAdoptionRequests
);

// Get messages for a pet
router.get(
  "/chat/:petId",
  verifyToken,
  getMessagesForPet
);

// Post a new message for a pet
router.post(
  "/chat/:petId",
  verifyToken,
  postMessageForPet
);

router.get("/user", verifyToken, authorizeRole("user"), (req, res) => {
  res.json({ message: "Hello user" });
});

module.exports = router;
