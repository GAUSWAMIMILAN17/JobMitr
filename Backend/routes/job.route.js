import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  updateJobs,
  starJob,
  getStarredJobs,
  removeStarredJob
} from "../controllers/job.controller.js";
// import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.route("/post").post(authenticateToken, postJob);
router.route("/get").get( getAllJobs);
router.route("/getadminjobs").get(authenticateToken, getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/update/:id").put(authenticateToken, updateJobs);

router.route("/starJob/:id").post(authenticateToken, starJob);
router.route("/getStarredJobs").get(authenticateToken, getStarredJobs);
router.route("/removeStarredJob/:id").delete(authenticateToken, removeStarredJob);


// router.get("/test-email", async(req,res)=>{

//     try {

//         await sendEmail(
//             "milangamerz17@gmail.com",
//             "Testing",
//             `
//       <div style="font-family: Arial; padding:20px;">

//         <h2 style="color:#2563eb;">
//           New Job Posted 🚀
//         </h2>

//         <hr/>

//         <p><strong>Job Title:</strong></p>

//         <p><strong>Description:</strong></p>

//         <p><strong>Location:</strong> </p>

//         <p><strong>Salary:</strong> ₹</p>

//         <p><strong>Job Type:</strong> </p>

//         <p><strong>Experience:</strong>  years</p>

//         <p><strong>Requirements:</strong> </p>

//         <br/>

//         <a 
//           href="http://localhost:5173/jobs"
//           style="
//             background:#2563eb;
//             color:white;
//             padding:10px 20px;
//             text-decoration:none;
//             border-radius:5px;
//           "
//         >
//           Apply Now
//         </a>

//         <br/><br/>

//         <p>
//           Best Regards,<br/>
//           Job Portal Team
//         </p>

//       </div>
//     `
//         );

//         res.send("Email sent");

//     } catch(error) {

//         console.log(error);

//         res.send(error.message);
//     }
// });


export default router;
