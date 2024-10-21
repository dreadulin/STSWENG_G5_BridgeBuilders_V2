import { parentSchemaServer } from "../../schemas/FormValidationSchema.js";
import Mother from "../../schemas/MotherSchema.js";
import * as Yup from "yup";
import express from "express";

const apiRouter = express.Router();

apiRouter.post("/intakeMother", async (req, res) => {
  try {
    const parentData = req.body;

    // Validate the request body
    await parentSchemaServer.validate(parentData, { abortEarly: false });
    /* const postImgURL = await imageUploader(req.files[0]); */
    await Mother.create(parentData);

    res.status(200).json({ message: "Created mother successfully" });
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