import PangunahingImpormasyon from "@/components/intakeForm/Form1";
import PamilyaProblema from "@/components/intakeForm/Form2";
import Nanay from "@/components/intakeForm/Form3";
import Tatay from "@/components/intakeForm/Form4";
import Kapatid from "@/components/intakeForm/Form5";
import Dokumento from "@/components/intakeForm/Form6";
import IbangImpormasyon from "@/components/intakeForm/Form7";
import Appbar from "@/components/ui/Appbar";
import { useState } from "react";
import { Waypoint } from "react-waypoint";
import axios from "../axiosInstance.js";
import childSchema from "../../schemas/FormValidationSchema.js";
import FormError from "@/components/ui/FormError.jsx";
import * as Yup from "yup";
import Status from "@/components/ui/Status.jsx";

const initialUser = {
  pangalan: "",
  program: "Home Care",
  palayaw: "",
  edad: null,
  kasarian: "",
  birthday: "",
  relihiyon: "",
  antasNgPaaralan: "None",
  lugarNgKapanganakan: "",
  problema: [],
  hulingPaaralangPinasukan: "",
  tirahan: "",
  allergy: [],
  vaccine: [],
  kategorya: {
    pangalan: "",
    ngo: "",
    lgu: "",
  },
  initialNaItsura: [],
  nanay: {
    pangalan: "",
    palayaw: "",
    kasarian: "",
    edad: null,
    birthday: "",
    lugarNgKapanganakan: "",
    relihiyon: "",
    antasNgPaaralan: "None",
    hulingPaaralangPinasukan: "",
    tirahan: "",
    probinsya: "",
    trabaho: "",
    kita: null,
    skillTraining: "",
    skills: "",
    dokumento: [],
  },
  tatay: {
    pangalan: "",
    palayaw: "",
    kasarian: "",
    edad: null,
    birthday: "",
    lugarNgKapanganakan: "",
    relihiyon: "",
    antasNgPaaralan: "None",
    hulingPaaralangPinasukan: "",
    tirahan: "",
    probinsya: "",
    trabaho: "",
    kita: null,
    skillTraining: "",
    skills: "",
    dokumento: [],
  },
  kapatid: [],
  dokumento: [],
  ilanNagaaral: null,
  ilanBaon: null,
  saanGastosBaon: "",
  schoolActivity: [],
  sakit: [],
  familyPlanningMethod: "",
  saanTubig: "",
  saanLaba: "",
  saanCR: "",
  ilanKain: null,
  ilanLigo: null,
  ipon: false,
  utang: false,
  dswd: false,
  kainPasok: false,
  alsAttend: false,
  checkup: false,
};

const sections = [
  "Pangunahing Impormasyon",
  "Problemang Inihain ng Pamilya",
  "Nanay",
  "Tatay",
  "Kapatid",
  "Dokumento/Requirements",
  "Ibang Impormasyon",
];

const Forms = () => {
  const [childData, setChildData] = useState(initialUser);
  const [sectionActive, setSectionActive] = useState("s1");
  const [error, setError] = useState({ open: false, errors: [] });
  const [status, setStatus] = useState({
    open: false,
    message: "",
    type: "info",
  });
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const navigateSection = (event) => {
    const targetDiv = event.currentTarget.id.split("-")[0];
    const targetElement = document.getElementById(targetDiv);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStatusOpen = (message, type) => {
    setStatus({ open: true, message, type });
  };

  const handleStatusClose = () => {
    setStatus({ ...status, open: false, message: "" });
  };

  const handleErrorClose = () => {
    setError({ ...error, open: false });
  };

  // Creating parents
  const handleSubmitParentInformation = async () => {
    try {
      await axios.post("/api/intakeParent", {
        pangalan: childData.nanay.pangalan,
        palayaw: childData.nanay.palayaw,
        kasarian: childData.nanay.kasarian,
        edad: childData.nanay.edad,
        birthday: childData.nanay.birthday,
        lugarNgKapanganakan: childData.nanay.lugarNgKapanganakan,
        relihiyon: childData.nanay.relihiyon,
        antasNgPaaralan: childData.nanay.antasNgPaaralan,
        hulingPaaralangPinasukan: childData.nanay.hulingPaaralangPinasukan,
        tirahan: childData.nanay.tirahan,
        probinsya: childData.nanay.probinsya,
        trabaho: childData.nanay.trabaho,
        kita: childData.nanay.kita,
        skillTraining: childData.nanay.skillTraining,
        skills: childData.nanay.skills,
        dokumento: childData.nanay.dokumento,
      });

      await axios.post("/api/intakeParent", {
        pangalan: childData.tatay.pangalan,
        palayaw: childData.tatay.palayaw,
        kasarian: childData.tatay.kasarian,
        edad: childData.tatay.edad,
        birthday: childData.tatay.birthday,
        lugarNgKapanganakan: childData.tatay.lugarNgKapanganakan,
        relihiyon: childData.tatay.relihiyon,
        antasNgPaaralan: childData.tatay.antasNgPaaralan,
        hulingPaaralangPinasukan: childData.tatay.hulingPaaralangPinasukan,
        tirahan: childData.tatay.tirahan,
        probinsya: childData.tatay.probinsya,
        trabaho: childData.tatay.trabaho,
        kita: childData.tatay.kita,
        skillTraining: childData.tatay.skillTraining,
        skills: childData.tatay.skills,
        dokumento: childData.tatay.dokumento,
      });
      return true;
    } catch (error) {
      if (error.response) {
        handleStatusOpen(
          `Error adding parent: ${
            error.response.data.error || error.response.data.message
          }`,
          "error"
        );
      } else if (error.request) {
        handleStatusOpen(
          "Error adding parent: No response from server",
          "error"
        );
      } else {
        handleStatusOpen(`Error adding parent: ${error.message}`, "error");
      }

      setTimeout(() => {
        handleStatusClose();
      }, 1000);

      return false;
    }
  };

  // Creating siblings
  const handleSubmitKapatidInformation = async () => {
    for (let i = 0; i < childData.kapatid.length; ++i) {
      try {
        await axios.post("/api/intakeSibling", {
          kapatidIndex: childData.kapatid[i].kapatidIndex,
          pangalan: childData.kapatid[i].pangalan,
          kasarian: childData.kapatid[i].kasarian, //male or female
          edad: childData.kapatid[i].edad,
          antasNgPaaralan: childData.kapatid[i].antasNgPaaralan, //antas ng edukasyon + list
          trabaho: childData.kapatid[i].trabaho,
          kita: childData.kapatid[i].kita,
          //with birth certificate, boolean or file upload
        });
        return true;
      } catch (error) {
        if (error.response) {
          handleStatusOpen(
            `Error adding kapatid: ${
              error.response.data.error || error.response.data.message
            }`,
            "error"
          );
        } else if (error.request) {
          handleStatusOpen(
            "Error adding kapatid: No response from server",
            "error"
          );
        } else {
          handleStatusOpen(`Error adding kapatid: ${error.message}`, "error");
        }

        setTimeout(() => {
          handleStatusClose();
        }, 1000);

        return false;
      }
    }
  };

  // Creating child
  const handleSubmitChildInformation = async () => {
    try {
      const childInfo = {
        program: childData.program, // program input status missing
        pangalan: childData.pangalan,
        edad: childData.edad,
        birthday: childData.birthday,
        relihiyon: childData.relihiyon,
        antasNgPaaralan: childData.antasNgPaaralan,
        palayaw: childData.palayaw,
        kasarian: childData.kasarian,
        problema: childData.problema,
        lugarNgKapanganakan: childData.lugarNgKapanganakan,
        hulingPaaralangPinasukan: childData.hulingPaaralangPinasukan,
        tirahan: childData.tirahan,
        allergy: childData.allergy,
        vaccine: childData.vaccine,
        initialNaItsura: childData.initialNaItsura,
        kategorya: childData.kategorya,
        dokumento: childData.dokumento,
        nanay: childData.nanay.pangalan,
        tatay: childData.tatay.pangalan,
        kapatid: childData.kapatid
          ? childData.kapatid.map((k) => k.pangalan)
          : [],
      };

      await axios.post("/api/intakeChild", { childInfo });
      return true;
    } catch (error) {
      if (error.response) {
        handleStatusOpen(
          `Error adding child: ${
            error.response.data.error || error.response.data.message
          }`,
          "error"
        );
      } else if (error.request) {
        handleStatusOpen(
          "Error adding child: No response from server",
          "error"
        );
      } else {
        handleStatusOpen(`Error adding child: ${error.message}`, "error");
      }

      setTimeout(() => {
        handleStatusClose();
      }, 1000);

      return false;
    }
  };

  // Creating family
  const handleSubmitFamilyInformation = async () => {
    try {
      const familyInfo = {
        bata: childData.pangalan,
        //education
        ilanNagaaral: childData.ilanNagaaral,
        ilanBaon: childData.ilanBaon,
        saanGastosBaon: childData.saanGastosBaon,
        schoolActivity: childData.schoolActivity,
        kainPasok: childData.kainPasok,
        alsAttend: childData.alsAttend,
        //health
        checkup: childData.checkup,
        familyPlanningMethod: childData.familyPlanningMethod,
        saanTubig: childData.saanTubig,
        saanLaba: childData.saanLaba,
        saanCR: childData.saanCR,
        sakit: childData.sakit,
        ilanKain: childData.ilanKain,
        ilanLigo: childData.ilanLigo,
        //socio-economic
        ipon: childData.ipon,
        utang: childData.utang,
        dswd: childData.dswd,
      };

      await axios.post("/api/intakeFamilyInfo", { familyInfo });
      return true;
    } catch (error) {
      if (error.response) {
        handleStatusOpen(
          `Error adding family info: ${
            error.response.data.error || error.response.data.message
          }`,
          "error"
        );
      } else if (error.request) {
        handleStatusOpen(
          "Error adding family info: No response from server",
          "error"
        );
      } else {
        handleStatusOpen(`Error adding family info: ${error.message}`, "error");
      }

      setTimeout(() => {
        handleStatusClose();
      }, 1000);

      return false;
    }
  };

  const handleIntakeForm = async () => {
    setSubmitDisabled(true);
    handleErrorClose();
    handleStatusOpen("Saving...", "info");
    childSchema
      .validate(childData, { abortEarly: false })
      .then(() => {
        const submitChildSuccess = handleSubmitChildInformation();
        const submitParentSuccess = handleSubmitParentInformation();
        const submitKapatiduccess = handleSubmitKapatidInformation();
        const submitFamilyInfoSuccess = handleSubmitFamilyInformation();
        if (
          submitChildSuccess &&
          submitParentSuccess &&
          submitKapatiduccess &&
          submitFamilyInfoSuccess
        ) {
          setSubmitDisabled(false);
          handleStatusOpen("Child Creation Sucessful!", "success");
          window.location.href = "/overview";
        }
      })
      .catch((err) => {
        if (err instanceof Yup.ValidationError) {
          handleErrorClose();
          const newErrors = err.inner.map((error) => error.message);
          setTimeout(() => {
            handleStatusClose();
            setSubmitDisabled(false);
            setError({ open: true, errors: newErrors });
          }, 600);
        }
      });
  };

  return (
    <>
      <Appbar />
      <div className="flex h-[calc(100vh-7rem)]">
        <div className="md:w-1/3 lg:w-1/4 bg-bb-purple p-4 space-y-8 overflow-auto">
          <h1 className="text-6xl mb-16">Intake Form</h1>

          {sections.map((section, index) => (
            <div
              key={section}
              id={`s${index + 1}-nav`}
              className={`transition-colors duration-200 cursor-pointer flex items-center p-4 rounded-lg ${
                sectionActive === `s${index + 1}`
                  ? "bg-bb-violet text-bb-white"
                  : "bg-bb-white text-bb-violet"
              }`}
              onClick={navigateSection}
            >
              <h2 className="text-2xl">{section}</h2>
            </div>
          ))}

          <button
            className={`flex items-center justify-center p-4 ${
              submitDisabled
                ? "bg-bb-light-purple text-bb-violet"
                : "bg-bb-violet text-bb-white"
            } w-full rounded-lg transition-colors duration-200 ${
              !submitDisabled && "hover:bg-bb-white hover:text-bb-violet"
            }`}
            onClick={handleIntakeForm}
            disabled={submitDisabled}
          >
            {submitDisabled ? (
              <span className="flex items-center">
                <h1 className="text-2xl">Saving...</h1>
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
              </span>
            ) : (
              <>
                <span className="material-symbols-outlined text-3xl mr-2">
                  save_as
                </span>
                <h1 className="text-2xl">Save</h1>
              </>
            )}
          </button>
        </div>

        <div className="flex-grow p-8 overflow-y-auto text-bb-violet">
          {sections.map((sectionTitle, index) => (
            <Waypoint
              key={index}
              onEnter={() => setSectionActive(`s${index + 1}`)}
              topOffset={"25%"}
              bottomOffset={"25%"}
            >
              <div
                id={`s${index + 1}`}
                className="mb-32 max-h-screen overflow-auto"
              >
                <h1 className="text-4xl mb-4">{sectionTitle}</h1>
                <div className="mt-4 space-y-4">
                  {index === 0 && (
                    <PangunahingImpormasyon
                      childData={childData}
                      setChildData={setChildData}
                    />
                  )}
                  {index === 1 && (
                    <PamilyaProblema
                      childData={childData}
                      setChildData={setChildData}
                    />
                  )}
                  {index === 2 && (
                    <Nanay childData={childData} setChildData={setChildData} />
                  )}
                  {index === 3 && (
                    <Tatay childData={childData} setChildData={setChildData} />
                  )}
                  {index === 4 && (
                    <Kapatid
                      childData={childData}
                      setChildData={setChildData}
                    />
                  )}
                  {index === 5 && (
                    <Dokumento
                      childData={childData}
                      setChildData={setChildData}
                    />
                  )}
                  {index === 6 && (
                    <IbangImpormasyon
                      childData={childData}
                      setChildData={setChildData}
                    />
                  )}
                </div>
              </div>
            </Waypoint>
          ))}
        </div>
      </div>
      <FormError
        isOpen={error.open}
        errors={error.errors}
        handleClose={handleErrorClose}
      />

      <Status
        isOpen={status.open}
        message={status.message}
        handleClose={handleStatusClose}
        type={status.type}
      />
    </>
  );
};

export default Forms;
