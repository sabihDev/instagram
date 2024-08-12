import { getMessages, sendMessage } from "../controllers/message.js";
import express from express;
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route('/send/:id').post(isAuthenticated, sendMessage);
router.route('/all/:id').post(isAuthenticated, getMessages);

export default router