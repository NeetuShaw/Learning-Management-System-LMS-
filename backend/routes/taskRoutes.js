const express = require("express");
const { assignTask, getDepartmentProgress  } = require("../controllers/taskController");

const router = express.Router();

router.post("/assign-task", assignTask);
router.get("/department-progress/:department", getDepartmentProgress);

module.exports = router;
