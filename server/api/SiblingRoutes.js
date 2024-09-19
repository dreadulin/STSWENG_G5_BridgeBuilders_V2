import { kapatidSchemaServer } from "../../schemas/FormValidationSchema.js";
import Sibling from "../../schemas/SiblingSchema.js";
import * as Yup from "yup";
import express from "express";

const apiRouter = express.Router();

apiRouter.post("/intakeSibling", async (req, res) => {
  try {
    const siblingData = req.body;

    // Validate the request body
    await kapatidSchemaServer.validate(siblingData, { abortEarly: false });
    /* const postImgURL = await imageUploader(req.files[0]); */
    await Sibling.create(siblingData);

    res.status(200).json({ message: "Created kapatid successfully" });
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
