const userController = require("../controllers/user.controller");
var router = require("express").Router();

router.get("/", userController.userBoard);

/**
 * @swagger
 * /api/user/profile/{id}:
 *   get:
 *     description: Get user's profile
 *     parameters:
 *      - in : path
 *        name : id
 *        required : true
 *        type : integer
 *        minimum : 1
 *     responses:
 *       200:
 *         description: Success.
 */
router.get("/profile/:id", userController.getProfile);

/**
 * @swagger
 * /api/user/profile/{id}:
 *   post:
 *     description: Update User's profile
 *     parameters:
 *      - in : path
 *        name : id
 *        required : true
 *        type : integer
 *        minimum : 1
 *      - name: first_name
 *        in: formData
 *        required: false
 *        type: string
 *      - name: last_name
 *        in: formData
 *        required: false
 *        type: string
 *      - name: gender
 *        in: formData
 *        required: false
 *        type: string
 *      - name: address
 *        in: formData
 *        required: false
 *        type: string
 *      - name: dob
 *        in: formData
 *        required: false
 *        schema:
 *          type: string
 *          format: date
 *      - name: height
 *        in: formData
 *        required: false
 *        type: double
 *      - name: weight
 *        in: formData
 *        required: false
 *        type: double
 *      - name: phone_number
 *        in: formData
 *        required: false
 *        type: string
 *      - name: special_conditions
 *        in: formData
 *        required: false
 *        type: string
 *     responses:
 *       200:
 *         description: Profile was updated successfully.
 */
router.post("/profile/:id", userController.updateProfile);

module.exports = router;
