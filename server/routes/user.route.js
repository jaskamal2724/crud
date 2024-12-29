import { Router } from "express";
import  {addData, deleteData, getData, update } from "../controllers/user.controller.js";

const router = Router()

router.route("/add").post(addData)
router.route("/get").get(getData)
router.route("/update").post(update)
router.route("/delete").delete(deleteData)
export default router