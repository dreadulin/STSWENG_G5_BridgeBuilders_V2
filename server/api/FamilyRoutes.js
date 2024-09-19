import { familySchemaServer } from "../../schemas/FormValidationSchema.js";
import Family from "../../schemas/FamilySchema.js";
import * as Yup from "yup";
import express from "express";

const apiRouter = express.Router();

apiRouter.post("/intakeFamilyInfo", async (req, res) => {
  try {
    const familyData = req.body.familyInfo;

    // Validate the request body
    await familySchemaServer.validate(familyData, { abortEarly: false });
    /* const postImgURL = await imageUploader(req.files[0]); */
    await Family.create(familyData);

    res
      .status(200)
      .json({ message: "Created family information successfully" });
  } catch (error) {
    console.log("THERES ACTUALLY AN ERROR 0_0", error.message);
    if (error instanceof Yup.ValidationError) {
      // Validation failed
      const errors = error.inner.map((err) => err.message);
      console.log(errors);
      return res.status(400).json({ errors });
    }
  }
});

export default apiRouter;
