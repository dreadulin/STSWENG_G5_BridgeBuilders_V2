import Appbar from "@/components/ui/Appbar";
import PangunahingImpormasyon from "@/components/intakeForm/Form1";
import PamilyaProblema from "@/components/intakeForm/Form2";
import Nanay from "@/components/intakeForm/Form3";
import Tatay from "@/components/intakeForm/Form4";
import Kapatid from "@/components/intakeForm/Form5";
import Dokumento from "@/components/intakeForm/Form6";
import IbangImpormasyon from "@/components/intakeForm/Form7";
import Select from "@/components/ui/Select";
import Goal from "@/components/ui/Goal";
import Tooltip from "@/components/ui/Tooltip";
import useProfile from "@/utils/hooks/useProfile";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosInstance.js";
import Status from "@/components/ui/Status.jsx";
import FormError from "@/components/ui/FormError.jsx";
import { editChildSchema } from "../../schemas/FormValidationSchema.js";
import * as Yup from "yup";

const programOptions = [
  { value: "Community Based Program", name: "program" },
  { value: "Home Care", name: "program" },
];

// Placeholder value for edit
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

const Edit = () => {
  const pictureRef = useRef(null);
  const { caseNo } = useParams();
  //const { profileData, setProfileData } = useProfile("Darryl Javier");
  const { profileData, setProfileData, error, loading } = useProfile(caseNo);
  const [childData, setChildData] = useState(initialUser);
  const [image, setImage] = useState(profileData.picture);
  const [formError, setFormError] = useState({ open: false, errors: [] });
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [status, setStatus] = useState({
    open: false,
    message: "",
    type: "info",
  });


  console.log(JSON.stringify(profileData, null, 2));

  const handlePictureClick = () => {
    pictureRef.current.click();
  };

  const handleErrorClose = () => {
    setFormError({ ...formError, open: false });
  };

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, picture: file });
      setImage(URL.createObjectURL(file));
    }
  };

  const handleGoalChange = (event) => {
    if (!profileData.goalsAchieved.includes(event.target.value)) {
      setProfileData({
        ...profileData,
        goalsAchieved: [...profileData.goalsAchieved, event.target.value],
      });
    } else {
      setProfileData({
        ...profileData,
        goalsAchieved: profileData.goalsAchieved.filter(
          (goal) => goal != event.target.value
        ),
      });
    }
  };

  const handleSaveClick = async () => {
    setSubmitDisabled(true);
    setStatus({
      open: true,
      message: "Editing profile data...",
      type: "info",
    });

    try {
      await editChildSchema.validate(profileData, { abortEarly: false });

      // We use formdata instead for the file upload (pfp)
      const formData = new FormData();
      Object.keys(profileData).forEach((key) => {
        if (key === "picture" && profileData[key] instanceof File) {
          formData.append("picture", profileData[key]);
        } else {
          formData.append(key, profileData[key]);
        }
      });

      await axios.post(`/api/editProfile/${caseNo}`, formData);

      setStatus({
        open: true,
        message: "Profile data updated!",
        type: "success",
      });

      setTimeout(() => {
        window.location.href = `/profile/${caseNo}`;
      }, 1000);
    } catch (err) {
      console.log(err.message);
      if (err instanceof Yup.ValidationError) {
        handleErrorClose();
        const newErrors = err.inner.map((error) => error.message);
        setTimeout(() => {
          handleStatusClose();
          setSubmitDisabled(false);
          setFormError({ open: true, errors: newErrors });
        }, 600);
      } else {
        // Handle axios or other errors
        setStatus({
          open: true,
          message: "An error occurred while updating the profile",
          type: "error",
        });
      }
    }
  };

  const handleStatusClose = () => {
    setStatus({ ...status, open: false, message: "" });
  };

  useEffect(() => {
    if (loading) {
      setStatus({
        open: true,
        message: "Loading profile data...",
        type: "info",
      });
    }

    if (!loading) {
      setStatus({
        open: true,
        message: "Profile data loaded!",
        type: "success",
      });

      setTimeout(() => {
        setStatus({
          open: false,
          message: "Profile data loaded!",
          type: "success",
        });
      }, 3000);
    }

    if (error.error) {
      setStatus({ open: true, message: error.errorMessage, type: "error" });
    }
  }, [error, loading]);

  useEffect(() => {
    if (!loading) {
      setImage(profileData.picture);
    }
  }, [loading]);

  return (
    <>
      <div className="w-screen h-max md:h-screen bg-white">
        <Appbar />

        <div className="flex flex-col md:flex-row h-max md:h-[calc(100%-10rem)] mt-8 ml-8 mr-8">
          <div className="flex flex-col h-full w-full md:w-3/4 lg:w-1/3 xl:w-1/4 mr-8">
            <div className="w-full h-full md:h-1/2 lg:h-2/3 xl:h-3/6 bg-bb-light-purple flex align-center justify-center self-center">
              <img src={image} className="object-contain" />
              <span
                onClick={handlePictureClick}
                className="material-symbols-outlined text-bb-white absolute self-center text-4xl lg:text-8xl cursor-pointer hover:text-bb-violet transition-colors duration-300 "
              >
                photo_camera
              </span>
              <input
                ref={pictureRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="flex flex-col mt-4 text-bb-violet">
              <div className="flex items-center mt-4 mb-4">
                <h1 className="text-4xl mr-4">About</h1>
                <div className="flex-grow h-1 bg-bb-violet"></div>
              </div>

              <div className="flex items-center mt-1 mb-1">
                <span className="material-symbols-outlined mr-2 text-4xl">
                  id_card
                </span>
                <h2 className="w-full">
                  <input
                    type="text"
                    name="palayaw"
                    className="w-full border-2 border-bb-purple p-1 rounded-md focus:outline-none transition-colors duration-300 hover:border-bb-violet focus:border-bb-violet"
                    placeholder="Palayaw"
                    value={profileData.palayaw}
                    onChange={handleChange}
                  />
                </h2>
              </div>

              <div className="flex items-center mt-1 mb-1">
                <span className="material-symbols-outlined mr-2 text-4xl">
                  hourglass_empty
                </span>
                <h2 className="w-full">
                  <input
                    type="text"
                    className="w-full border-2 border-bb-purple p-1 rounded-md focus:outline-none transition-colors duration-300 hover:border-bb-violet focus:border-bb-violet"
                    placeholder="Edad"
                    name="edad"
                    value={profileData.edad}
                    onChange={handleChange}
                  />
                </h2>
              </div>

              <div className="flex items-center mt-1 mb-1">
                <span className="material-symbols-outlined mr-2 text-4xl">
                  wc
                </span>
                <h2 className="w-full">
                  <input
                    type="text"
                    className="w-full border-2 border-bb-purple p-1 rounded-md focus:outline-none transition-colors duration-300 hover:border-bb-violet focus:border-bb-violet"
                    placeholder="Kasarian"
                    name="kasarian"
                    value={profileData.kasarian}
                    onChange={handleChange}
                  />
                </h2>
              </div>

              <div className="flex items-center mt-1 mb-1">
                <span className="material-symbols-outlined mr-2 text-4xl">
                  cake
                </span>
                <h2 className="w-full">
                  <input
                    type="text"
                    className="w-full border-2 border-bb-purple p-1 rounded-md focus:outline-none transition-colors duration-300 hover:border-bb-violet focus:border-bb-violet"
                    placeholder="Petsa ng Kapanganakan"
                    name="birthday"
                    value={profileData.birthday}
                    onChange={handleChange}
                  />
                </h2>
              </div>

              <div className="flex items-center mt-1 mb-1">
                <span className="material-symbols-outlined mr-2 text-4xl">
                  church
                </span>
                <h2 className="w-full">
                  <input
                    type="text"
                    className="w-full border-2 border-bb-purple p-1 rounded-md focus:outline-none transition-colors duration-300 hover:border-bb-violet focus:border-bb-violet"
                    placeholder="Relihiyon"
                    name="relihiyon"
                    value={profileData.relihiyon}
                    onChange={handleChange}
                  />
                </h2>
              </div>

              <div className="flex-grow h-1 mt-4 bg-bb-violet"></div>

              <h3 className="mt-2">
                <strong>Case number:</strong> {caseNo}
              </h3>

              <div className="flex-grow h-1 mt-4 mb-4 bg-bb-violet"></div>
            </div>
          </div>

          <div className="flex flex-col h-full flex-grow overflow-auto z-0 text-bb-violet mr-4 xl:mr-28">
            <div className="flex items-center mb-8">
              <h1 className="text-4xl xl:text-7xl flex-grow">
                <input
                  type="text"
                  className="w-full border-2 border-bb-purple p-1 rounded-md focus:outline-none transition-colors duration-300 hover:border-bb-violet focus:border-bb-violet"
                  placeholder="Pangalan"
                  name="pangalan"
                  value={profileData.pangalan}
                  onChange={handleChange}
                />
              </h1>
              <Tooltip tooltipText={"Save"} className=" mr-6 ml-8 ">
                <button onClick={handleSaveClick} disabled={submitDisabled}>
                  <span className="material-symbols-outlined text-3xl md:text-5xl text-center text-bb-purple hover:text-bb-violet cursor-pointer">
                    save_as
                  </span>
                </button>
              </Tooltip>
              <Tooltip tooltipText={"Return"} className=" mr-6 ml-2 ">
                <a href={`/profile/${caseNo}`}>
                  <span className="material-symbols-outlined text-3xl md:text-5xl text-center text-bb-purple hover:text-bb-violet cursor-pointer">
                    keyboard_return
                  </span>
                </a>
              </Tooltip>
            </div>

            <div className="flex items-center">
              <h2 className="text-3xl xl:text-5xl mr-2">Program: </h2>
              <div className="relative flex-grow">
                <Select
                  className="flex items-center h-14 w-full border-2 border-bb-purple pr-4 pl-4 rounded-md transition-colors duration-300 hover:border-bb-violet"
                  optionList={programOptions}
                  optionClassName="text-bb-violet bg-bb-white text-3xl transition-colors duration-300 hover:text-bb-white hover:bg-bb-purple"
                  listHeight=""
                  handleChange={handleChange}
                >
                  <h1 className="text-2xl xl:text-4xl flex-grow text-left">
                    {profileData.program}
                  </h1>
                </Select>
              </div>
            </div>

            <div className="flex items-center mt-12">
              <h1 className="text-4xl mr-4">Intervention</h1>
              <div className="flex-grow h-1 bg-bb-violet"></div>
            </div>

            <div className="flex w-full">
              <div className="flex flex-col">
                <Goal
                  name="goal1"
                  goalsAchieved={profileData.goalsAchieved}
                  editMode
                  handleGoalChange={handleGoalChange}
                  image={"/src/assets/logo.png"}
                  title="Mental"
                  goal={1}
                />
              </div>

              <div className="flex flex-col">
                <Goal
                  name="goal2"
                  goalsAchieved={profileData.goalsAchieved}
                  editMode
                  handleGoalChange={handleGoalChange}
                  image={"/src/assets/logo.png"}
                  title="Physical/Social"
                  goal={2}
                />
              </div>

              <div className="flex flex-col">
                <Goal
                  name="goal3"
                  goalsAchieved={profileData.goalsAchieved}
                  editMode
                  handleGoalChange={handleGoalChange}
                  image={"/src/assets/logo.png"}
                  title="Support to Caregiver"
                  goal={3}
                />
              </div>
            </div>

            <div className="flex items-center mt-8">
              <h1 className="text-4xl mr-4">Intake Form</h1>
              <div className="flex-grow h-1 bg-bb-violet"></div>
            </div><div className="mt-4 space-y-4">
              <PangunahingImpormasyon childData={childData} setChildData={setChildData} />
              <PamilyaProblema childData={childData} setChildData={setChildData} />
              <Nanay childData={childData} setChildData={setChildData} />
              <Tatay childData={childData} setChildData={setChildData} />
              <Kapatid childData={childData} setChildData={setChildData} />
              <Dokumento childData={childData} setChildData={setChildData} />
              <IbangImpormasyon childData={childData} setChildData={setChildData} />
            </div>

          </div>
        </div>
      </div>

      <Status
        isOpen={status.open}
        message={status.message}
        handleClose={handleStatusClose}
        type={status.type}
      />

      <FormError
        isOpen={formError.open}
        errors={formError.errors}
        handleClose={handleErrorClose}
      />
    </>
  );
};

export default Edit;
