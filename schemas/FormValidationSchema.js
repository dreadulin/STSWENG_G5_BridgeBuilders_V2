import * as Yup from "yup";

const tataySchema = Yup.object().shape({
  pangalan: Yup.string()
    .required("Tatay - Pangalan is required.")
    .max(500, "Tatay - Pangalan must be 500 characters or less"),
  palayaw: Yup.string()
    .required("Tatay - Palayaw is required.")
    .max(500, "Tatay - Palayaw must be 500 characters or less"),
  kasarian: Yup.string()
    .required("Tatay - Kasarian is required.")
    .max(500, "Tatay - Kasarian must be 500 characters or less"),
  edad: Yup.number()
    .required("Tatay - Edad is required.")
    .positive("Tatay - Edad must be a positive number.")
    .integer("Tatay - Edad must be a number."),
  birthday: Yup.string().required("Tatay - Birthday is required."),
  lugarNgKapanganakan: Yup.string()
    .required("Tatay - Lugar ng Kapanganakan is required.")
    .max(500, "Tatay - Lugar ng Kapanganakan must be 500 characters or less."),
  relihiyon: Yup.string()
    .required("Tatay - Relihiyon is required.")
    .max(500, "Tatay - Relihiyon must be 500 characters or less."),
  antasNgPaaralan: Yup.string()
    .oneOf(["None", "Elementary", "High School", "College", "ALS"])
    .required("Tatay - Antas ng Paaralan is required."),
  hulingPaaralangPinasukan: Yup.string()
    .required("Tatay - Huling Paaralang Pinasukan is required.")
    .max(
      500,
      "Tatay - Huling Paaralang Pinasukan must be 500 characters or less."
    ),
  tirahan: Yup.string()
    .required("Tatay - Tirahan is required.")
    .max(500, "Tatay - Tirahan must be 500 characters or less."),
  probinsya: Yup.string()
    .required("Tatay - Probinsya is required.")
    .max(500, "Tatay - Probinsya must be 500 characters or less."),
  trabaho: Yup.string()
    .required("Tatay - Trabaho is required.")
    .max(500, "Tatay - Trabaho must be 500 characters or less."),
  kita: Yup.number()
    .required("Tatay - Kita is required.")
    .positive("Tatay - Kita must be a positive number.")
    .integer("Tatay - Kita must be a number."),
  skillTraining: Yup.string()
    .required("Tatay - Skill Training is required.")
    .max(500, "Tatay - Skill Training must be 500 characters or less."),
  skills: Yup.string()
    .required("Tatay - Skills is required.")
    .max(500, "Tatay - Skills must be 500 characters or less."),
  dokumento: Yup.array().of(Yup.string()),
});

const nanaySchema = Yup.object().shape({
  pangalan: Yup.string()
    .required("Nanay - Pangalan is required.")
    .max(500, "Nanay - Pangalan must be 500 characters or less"),
  palayaw: Yup.string()
    .required("Nanay - Palayaw is required.")
    .max(500, "Nanay - Palayaw must be 500 characters or less"),
  kasarian: Yup.string()
    .required("Nanay - Kasarian is required.")
    .max(500, "Nanay - Kasarian must be 500 characters or less"),
  edad: Yup.number()
    .required("Nanay - Edad is required.")
    .positive("Nanay - Edad must be a positive number.")
    .integer("Nanay - Edad must be a number."),
  birthday: Yup.string().required("Nanay - Birthday is required."),
  lugarNgKapanganakan: Yup.string()
    .required("Nanay - Lugar ng Kapanganakan is required.")
    .max(500, "Nanay - Lugar ng Kapanganakan must be 500 characters or less."),
  relihiyon: Yup.string()
    .required("Nanay - Relihiyon is required.")
    .max(500, "Nanay - Relihiyon must be 500 characters or less."),
  antasNgPaaralan: Yup.string()
    .oneOf(["None", "Elementary", "High School", "College", "ALS"])
    .required("Nanay - Antas ng Paaralan is required."),
  hulingPaaralangPinasukan: Yup.string()
    .required("Nanay - Huling Paaralang Pinasukan is required.")
    .max(
      500,
      "Nanay - Huling Paaralang Pinasukan must be 500 characters or less."
    ),
  tirahan: Yup.string()
    .required("Nanay - Tirahan is required.")
    .max(500, "Nanay - Tirahan must be 500 characters or less."),
  probinsya: Yup.string()
    .required("Nanay - Probinsya is required.")
    .max(500, "Nanay - Probinsya must be 500 characters or less."),
  trabaho: Yup.string()
    .required("Nanay - Trabaho is required.")
    .max(500, "Nanay - Trabaho must be 500 characters or less."),
  kita: Yup.number()
    .required("Nanay - Kita is required.")
    .positive("Nanay - Kita must be a positive number.")
    .integer("Nanay - Kita must be a number."),
  skillTraining: Yup.string()
    .required("Nanay - Skill Training is required.")
    .max(500, "Nanay - Skill Training must be 500 characters or less."),
  skills: Yup.string()
    .required("Nanay - Skills is required.")
    .max(500, "Nanay - Skills must be 500 characters or less."),
  dokumento: Yup.array().of(Yup.string()),
});

const kapatidSchema = Yup.object().shape({
  kapatidIndex: Yup.number().required(),
  pangalan: Yup.string()
    .required("Kapatid - Pangalan is required.")
    .max(500, "Kapatid - Pangalan must be 500 characters or less."),
  kasarian: Yup.string()
    .required("Kapatid - Kasarian is required.")
    .max(500, "Kapatid - Kasarian must be 500 characters or less."),
  edad: Yup.number()
    .required("Kapatid - Edad is required.")
    .positive("Kapatid - Edad must be a positive number.")
    .integer("Kapatid - Edad must be a number."),
  trabaho: Yup.string()
    .required("Kapatid - Trabaho is required.")
    .max(500, "Kapatid - Trabaho must be 500 characters or less."),
  kita: Yup.number()
    .required("Kapatid - Kita is required.")
    .positive("Kapatid - Kita must be a positive number.")
    .integer("Kapatid - Kita must be a number."),
  antasNgPaaralan: Yup.string()
    .oneOf(["None", "Elementary", "High School", "College", "ALS"])
    .required("Kapatid - Antas ng Paaralan is required."),
});

const childSchema = Yup.object().shape({
  pangalan: Yup.string()
    .required("Pangunahing Impormasyon - Pangalan is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Pangalan must be 500 characters or less."
    ),
  program: Yup.string()
    .oneOf(["Home Care", "Community Based Program"])
    .required("Pangunahing Impormasyon - Program is required."),
  palayaw: Yup.string()
    .required("Pangunahing Impormasyon - Palayaw is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Palayaw must be 500 characters or less."
    ),
  edad: Yup.number()
    .required("Pangunahing Impormasyon - Edad is required.")
    .positive("Pangunahing Impormasyon - Edad must be a positive number.")
    .integer("Pangunahing Impormasyon - Edad must be a number."),
  kasarian: Yup.string()
    .required("Pangunahing Impormasyon - Kasarian is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Kasarian must be 500 characters or less."
    ),
  birthday: Yup.string().required(
    "Pangunahing Impormasyon - Birthday is required."
  ),
  relihiyon: Yup.string()
    .required("Pangunahing Impormasyon - Relihiyon is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Relihiyon must be 500 characters or less."
    ),
  antasNgPaaralan: Yup.string()
    .oneOf(["None", "Elementary", "High School", "College", "ALS"])
    .required("Pangunahing Impormasyon - Antas Ng Paaralan is required."),
  lugarNgKapanganakan: Yup.string()
    .required("Pangunahing Impormasyon - Lugar ng Kapanganakan is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Lugar ng Kapanganakan must be 500 characters or less."
    ),
  problema: Yup.array().of(Yup.string()),
  hulingPaaralangPinasukan: Yup.string()
    .required(
      "Pangunahing Impormasyon - Huling Paaralang Pinasukan is required."
    )
    .max(
      500,
      "Pangunahing Impormasyon - Huling Paaralang Pinasukan must be 500 characters or less."
    ),
  tirahan: Yup.string()
    .required("Pangunahing Impormasyon - Tirahan is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Tirahan must be 500 characters or less."
    ),
  allergy: Yup.string(),
  vaccine: Yup.string(),
  kategorya: Yup.object().shape({
    pangalan: Yup.string()
      .max(
        500,
        "Pangunahing Impormasyon - Kategorya Pangalan must be 500 characters or less."
      )
      .required("Pangunahing Impormasyon - Kategorya Pangalan is required."),
    ngo: Yup.string().max(
      500,
      "Pangunahing Impormasyon - Kategorya NGO Pangalan must be 500 characters or less."
    ),
    lgu: Yup.string().max(
      500,
      "Pangunahing Impormasyon - Kategorya LGU Pangalan must be 500 characters or less."
    ),
  }),
  initialNaItsura: Yup.array().of(Yup.string()),
  nanay: nanaySchema,
  tatay: tataySchema,
  kapatid: Yup.array().of(kapatidSchema),
  dokumento: Yup.array().of(Yup.string()),
  ilanNagaaral: Yup.number()
    .required("Ibang Impormasyon - Ilan Nag-aaral is required.")
    .positive("Ibang Impormasyon - Ilan Nag-aaral must be a positive number.")
    .integer("Ibang Impormasyon - Ilan Nag-aaral must be a number."),
  ilanBaon: Yup.number()
    .required("Ibang Impormasyon - Magkano Baon is required.")
    .positive("Ibang Impormasyon - Magkano Baon must be a positive number.")
    .integer("Ibang Impormasyon - Magkano Baon must be a number."),
  saanGastosBaon: Yup.string()
    .required("Ibang Impormasyon - Saan Ginagastos ang Baon is required.")
    .max(
      500,
      "Ibang Impormasyon - Saan Ginagastos ang Baon must be 500 characters or less."
    ),
  schoolActivity: Yup.array().of(Yup.string()),
  sakit: Yup.array().of(Yup.string()),
  familyPlanningMethod: Yup.string()
    .required("Ibang Impormasyon - Family Planning Method is required.")
    .max(
      500,
      "Ibang Impormasyon - Family Planning Method must be 500 characters or less."
    ),
  saanTubig: Yup.string()
    .required("Ibang Impormasyon - Saan Kumukuha ng Tubig is required.")
    .max(
      500,
      "Ibang Impormasyon - Saan Kumukuha ng Tubig must be 500 characters or less."
    ),
  saanLaba: Yup.string()
    .required("Ibang Impormasyon - Saan Nag-lalaba is required.")
    .max(
      500,
      "Ibang Impormasyon - Saan Nag-lalaba must be 500 characters or less."
    ),
  saanCR: Yup.string()
    .required("Ibang Impormasyon - Saan CR is required.")
    .max(500, "Ibang Impormasyon - Saan CR must be 500 characters or less."),
  ilanKain: Yup.number()
    .required("Ibang Impormasyon - Ilan Kain sa Isang Araw is required.")
    .positive(
      "Ibang Impormasyon - Ilan Kain sa Isang Araw must be a positive number."
    )
    .integer("Ibang Impormasyon - Ilan Kain sa Isang Araw must be a number."),
  ilanLigo: Yup.number()
    .required("Ibang Impormasyon - Ilan Ligo sa Isang Araw is required.")
    .positive(
      "Ibang Impormasyon - Ilan Ligo sa Isang Araw must be a positive number."
    )
    .integer("Ibang Impormasyon - Ilan Ligo sa Isang Araw must be a number."),
  ipon: Yup.boolean(),
  utang: Yup.boolean(),
  dswd: Yup.boolean(),
  kainPasok: Yup.boolean(),
  alsAttend: Yup.boolean(),
  checkup: Yup.boolean(),
});

export const editChildSchema = Yup.object().shape({
  pangalan: Yup.string()
    .required("Pangunahing Impormasyon - Pangalan is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Pangalan must be 500 characters or less."
    ),
  program: Yup.string()
    .oneOf(["Home Care", "Community Based Program"])
    .required("Pangunahing Impormasyon - Program is required."),
  palayaw: Yup.string()
    .required("Pangunahing Impormasyon - Palayaw is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Palayaw must be 500 characters or less."
    ),
  edad: Yup.number()
    .required("Pangunahing Impormasyon - Edad is required.")
    .positive("Pangunahing Impormasyon - Edad must be a positive number.")
    .integer("Pangunahing Impormasyon - Edad must be a number."),
  kasarian: Yup.string()
    .required("Pangunahing Impormasyon - Kasarian is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Kasarian must be 500 characters or less."
    ),
  birthday: Yup.string().required(
    "Pangunahing Impormasyon - Birthday is required."
  ),
  relihiyon: Yup.string()
    .required("Pangunahing Impormasyon - Relihiyon is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Relihiyon must be 500 characters or less."
    ),
  goalsAchieved: Yup.array().of(Yup.string()),
});

export const editParentSchema = Yup.object().shape({
  pangalan: Yup.string()
    .required("Pangunahing Impormasyon - Pangalan is required.")
    .max(500, "Pangunahing Impormasyon - Pangalan must be 500 characters or less."),
  palayaw: Yup.string()
    .required("Pangunahing Impormasyon - Palayaw is required.")
    .max(500, "Pangunahing Impormasyon - Palayaw must be 500 characters or less."),
  kasarian: Yup.string()
    .required("Pangunahing Impormasyon - Kasarian is required.")
    .oneOf(["Male", "Female"], "Pangunahing Impormasyon - Kasarian must be either Male or Female.")
    .max(500, "Pangunahing Impormasyon - Kasarian must be 500 characters or less."),
  edad: Yup.number()
    .required("Pangunahing Impormasyon - Edad is required.")
    .positive("Pangunahing Impormasyon - Edad must be a positive number.")
    .integer("Pangunahing Impormasyon - Edad must be a whole number."),
  birthday: Yup.string()
    .required("Pangunahing Impormasyon - Birthday is required."),
  lugarNgKapanganakan: Yup.string()
    .required("Pangunahing Impormasyon - Lugar ng Kapanganakan is required.")
    .max(500, "Pangunahing Impormasyon - Lugar ng Kapanganakan must be 500 characters or less."),
  relihiyon: Yup.string()
    .required("Pangunahing Impormasyon - Relihiyon is required.")
    .max(500, "Pangunahing Impormasyon - Relihiyon must be 500 characters or less."),
  antasNgPaaralan: Yup.string()
    .required("Pangunahing Impormasyon - Antas ng Paaralan is required.")
    .max(500, "Pangunahing Impormasyon - Antas ng Paaralan must be 500 characters or less."),
  hulingPaaralangPinasukan: Yup.string()
    .required("Pangunahing Impormasyon - Huling Paaralang Pinasukan is required.")
    .max(500, "Pangunahing Impormasyon - Huling Paaralang Pinasukan must be 500 characters or less."),
  tirahan: Yup.string()
    .required("Pangunahing Impormasyon - Tirahan is required.")
    .max(500, "Pangunahing Impormasyon - Tirahan must be 500 characters or less."),
  probinsya: Yup.string()
    .max(500, "Pangunahing Impormasyon - Probinsya must be 500 characters or less."),
  trabaho: Yup.string()
    .max(500, "Pangunahing Impormasyon - Trabaho must be 500 characters or less."),
  kita: Yup.number()
    .positive("Pangunahing Impormasyon - Kita must be a positive number.")
    .integer("Pangunahing Impormasyon - Kita must be a whole number."),
  skillTraining: Yup.string()
    .max(500, "Pangunahing Impormasyon - Skill Training must be 500 characters or less."),
  skills: Yup.string()
    .max(500, "Pangunahing Impormasyon - Skills must be 500 characters or less."),
  dokumento: Yup.array().of(Yup.string().max(500, "Pangunahing Impormasyon - Dokumento must be 500 characters or less."))
});

export const familySchemaServer = Yup.object().shape({
  bata: Yup.string()
    .required("Pangalan ng bata is required.")
    .max(500, "Pangalan ng bata must be 500 characters or less."),
  ilanNagaaral: Yup.number()
    .required("Ilan Nag-aaral is required.")
    .positive("Ilan Nag-aaral must be a positive number.")
    .integer("Ilan Nag-aaral must be a number."),
  ilanBaon: Yup.number()
    .required("Magkano Baon is required.")
    .positive("Magkano Baon must be a positive number.")
    .integer("Magkano Baon must be a number."),
  saanGastosBaon: Yup.string()
    .required("Saan Ginagastos ang Baon is required.")
    .max(500, "Saan Ginagastos ang Baon must be 500 characters or less."),
  schoolActivity: Yup.array().of(Yup.string()),
  sakit: Yup.array().of(Yup.string()),
  familyPlanningMethod: Yup.string()
    .required("Family Planning Method is required.")
    .max(500, "Family Planning Method must be 500 characters or less."),
  saanTubig: Yup.string()
    .required("Saan Kumukuha ng Tubig is required.")
    .max(500, "Saan Kumukuha ng Tubig must be 500 characters or less."),
  saanLaba: Yup.string()
    .required("Saan Nag-lalaba is required.")
    .max(500, "Saan Nag-lalaba must be 500 characters or less."),
  saanCR: Yup.string()
    .required("Saan CR is required.")
    .max(500, "Saan CR must be 500 characters or less."),
  ilanKain: Yup.number()
    .required("Ilan Kain sa Isang Araw is required.")
    .positive("Ilan Kain sa Isang Araw must be a positive number.")
    .integer("Ilan Kain sa Isang Araw must be a number."),
  ilanLigo: Yup.number()
    .required("Ilan Ligo sa Isang Araw is required.")
    .positive("Ilan Ligo sa Isang Araw must be a positive number.")
    .integer("Ilan Ligo sa Isang Araw must be a number."),
  ipon: Yup.boolean(),
  utang: Yup.boolean(),
  dswd: Yup.boolean(),
  kainPasok: Yup.boolean(),
  alsAttend: Yup.boolean(),
  checkup: Yup.boolean(),
});

export const kapatidSchemaServer = Yup.object().shape({
  kapatidIndex: Yup.number().required(),
  pangalan: Yup.string()
    .required("Pangalan is required.")
    .max(500, "Pangalan must be 500 characters or less."),
  kasarian: Yup.string()
    .required("Kasarian is required.")
    .max(500, "Kasarian must be 500 characters or less."),
  edad: Yup.number()
    .required("Edad is required.")
    .positive("Edad must be a positive number.")
    .integer("Edad must be a number."),
  trabaho: Yup.string()
    .required("Trabaho is required.")
    .max(500, "Trabaho must be 500 characters or less."),
  kita: Yup.number()
    .required("Kita is required.")
    .positive("Kita must be a positive number.")
    .integer("Kita must be a number."),
  antasNgPaaralan: Yup.string()
    .oneOf(["None", "Elementary", "High School", "College", "ALS"])
    .required("Antas ng Paaralan is required."),
});

export const parentSchemaServer = Yup.object().shape({
  pangalan: Yup.string()
    .required("Pangalan is required.")
    .max(500, "Pangalan must be 500 characters or less"),
  palayaw: Yup.string()
    .required("Palayaw is required.")
    .max(500, "Palayaw must be 500 characters or less"),
  kasarian: Yup.string()
    .required("Kasarian is required.")
    .max(500, "Kasarian must be 500 characters or less"),
  edad: Yup.number()
    .required("Edad is required.")
    .positive("Edad must be a positive number.")
    .integer("Edad must be a number."),
  birthday: Yup.string().required("Birthday is required."),
  lugarNgKapanganakan: Yup.string()
    .required("Lugar ng Kapanganakan is required.")
    .max(500, "Lugar ng Kapanganakan must be 500 characters or less."),
  relihiyon: Yup.string()
    .required("Relihiyon is required.")
    .max(500, "Relihiyon must be 500 characters or less."),
  antasNgPaaralan: Yup.string()
    .oneOf(["None", "Elementary", "High School", "College", "ALS"])
    .required("Antas ng Paaralan is required."),
  hulingPaaralangPinasukan: Yup.string()
    .required("Huling Paaralang Pinasukan is required.")
    .max(500, "Huling Paaralang Pinasukan must be 500 characters or less."),
  tirahan: Yup.string()
    .required("Tirahan is required.")
    .max(500, "Tirahan must be 500 characters or less."),
  probinsya: Yup.string()
    .required("Probinsya is required.")
    .max(500, "Probinsya must be 500 characters or less."),
  trabaho: Yup.string()
    .required("Trabaho is required.")
    .max(500, "Trabaho must be 500 characters or less."),
  kita: Yup.number()
    .required("Kita is required.")
    .positive("Kita must be a positive number.")
    .integer("Kita must be a number."),
  skillTraining: Yup.string()
    .required("Skill Training is required.")
    .max(500, "Skill Training must be 500 characters or less."),
  skills: Yup.string()
    .required("Skills is required.")
    .max(500, "Skills must be 500 characters or less."),
  dokumento: Yup.array().of(Yup.string()),
});

export const childSchemaServer = Yup.object().shape({
  pangalan: Yup.string()
    .required("Pangunahing Impormasyon - Pangalan is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Pangalan must be 500 characters or less."
    ),
  program: Yup.string()
    .oneOf(["Home Care", "Community Based Program"])
    .required("Pangunahing Impormasyon - Program is required."),
  palayaw: Yup.string()
    .required("Pangunahing Impormasyon - Palayaw is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Palayaw must be 500 characters or less."
    ),
  edad: Yup.number()
    .required("Pangunahing Impormasyon - Edad is required.")
    .positive("Pangunahing Impormasyon - Edad must be a positive number.")
    .integer("Pangunahing Impormasyon - Edad must be a number."),
  kasarian: Yup.string()
    .required("Pangunahing Impormasyon - Kasarian is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Kasarian must be 500 characters or less."
    ),
  birthday: Yup.string().required(
    "Pangunahing Impormasyon - Birthday is required."
  ),
  relihiyon: Yup.string()
    .required("Pangunahing Impormasyon - Relihiyon is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Relihiyon must be 500 characters or less."
    ),
  antasNgPaaralan: Yup.string()
    .oneOf(["None", "Elementary", "High School", "College", "ALS"])
    .required("Pangunahing Impormasyon - Antas Ng Paaralan is required."),
  lugarNgKapanganakan: Yup.string()
    .required("Pangunahing Impormasyon - Lugar ng Kapanganakan is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Lugar ng Kapanganakan must be 500 characters or less."
    ),
  problema: Yup.array().of(Yup.string()),
  hulingPaaralangPinasukan: Yup.string()
    .required(
      "Pangunahing Impormasyon - Huling Paaralang Pinasukan is required."
    )
    .max(
      500,
      "Pangunahing Impormasyon - Huling Paaralang Pinasukan must be 500 characters or less."
    ),
  tirahan: Yup.string()
    .required("Pangunahing Impormasyon - Tirahan is required.")
    .max(
      500,
      "Pangunahing Impormasyon - Tirahan must be 500 characters or less."
    ),
  allergy: Yup.string(),
  vaccine: Yup.string(),
  kategorya: Yup.object()
    .shape({
      pangalan: Yup.string().max(
        500,
        "Pangunahing Impormasyon - Kategorya Pangalan must be 500 characters or less."
      ),
      ngo: Yup.string().max(
        500,
        "Pangunahing Impormasyon - Kategorya NGO Pangalan must be 500 characters or less."
      ),
      lgu: Yup.string().max(
        500,
        "Pangunahing Impormasyon - Kategorya LGU Pangalan must be 500 characters or less."
      ),
    })
    .required("Pangunahing Impormasyon - Kategorya is required."),
  initialNaItsura: Yup.array().of(Yup.string()),
  nanay: Yup.string().required("Nanay is required."),
  tatay: Yup.string().required("Tatay is required."),
  kapatid: Yup.array().of(Yup.string()),
  dokumento: Yup.array().of(Yup.string()),
});

export default childSchema;
