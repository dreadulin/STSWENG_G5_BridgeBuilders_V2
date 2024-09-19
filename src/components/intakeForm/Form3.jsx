import { useRef, useState } from "react";
import Select from "@/components/ui/Select";

const documentList = [
  "National I.D",
  "Barangay I.D",
  "SSS",
  "PhilHealth",
  "HDMF",
  "Birth Certificate",
  "DSWD I.D",
  "",
];

const antasList = [
  { value: "None", name: "antasNgPaaralan" },
  { value: "Elementary", name: "antasNgPaaralan" },
  { value: "High School", name: "antasNgPaaralan" },
  { value: "College", name: "antasNgPaaralan" },
  { value: "ALS", name: "antasNgPaaralan" },
];

const Nanay = ({ childData, setChildData }) => {
  const [otherDocuments, setOtherDocuments] = useState([]);
  const otherKasarianRef = useRef(null);

  const handleChange = (event) => {
    setChildData({
      ...childData,
      nanay: {
        ...childData.nanay,
        [event.currentTarget.name]: event.currentTarget.value,
      },
    });
  };

  const handleKasarian = (event) => {
    setChildData({
      ...childData,
      nanay: {
        ...childData.nanay,
        kasarian: event.currentTarget.value,
      },
    });
  };

  const handleOtherKasarian = () => {
    const kasarian = otherKasarianRef.current.value;
    setChildData({ ...childData, nanay: { ...childData.nanay, kasarian } });
  };

  const handleCheckbox = (event) => {
    const field = event.currentTarget.name;
    const value = event.currentTarget.value;

    setChildData({
      ...childData,
      nanay: {
        ...childData.nanay,
        [field]: event.currentTarget.checked
          ? [...childData.nanay[field], value]
          : childData.nanay[field].filter((data) => data != value),
      },
    });
  };

  const handleOtherDocuments = (event) => {
    const value = event.currentTarget.value;
    const documentList = value
      .trim()
      .split(/\s*,\s*/)
      .filter((feature) => feature !== "");

    const updatedDocuments = childData.nanay.dokumento.filter(
      (document) => !otherDocuments.includes(document)
    );

    const newDocuments = [...updatedDocuments, ...documentList];

    setChildData((prevChildData) => ({
      ...prevChildData,
      nanay: {
        ...prevChildData.nanay,
        dokumento: newDocuments,
      },
    }));

    setOtherDocuments(documentList);
  };

  return (
    <>
      <div className="mt-4 space-y-4">
        <p style={{ fontSize: "24px" }}>
          <b>Impormasyon ng Nanay:</b>
        </p>
        
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Pangalan / Name</span>
            <input
              type="text"
              placeholder="Pangalan"
              name="pangalan"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              id="pangalan"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Palayaw / Nickname</span>
            <input
              type="text"
              placeholder="Palayaw"
              name="palayaw"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              id="palayaw"
              onChange={handleChange}
            />
          </label>
        </div>
        
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
          <span className="flex items-center w-1/2 mr-2">
            <label className="mr-4 flex">
              <input
                type="radio"
                name="nanay"
                checked={childData.nanay.kasarian == "Lalaki"}
                value={"Lalaki"}
                onChange={handleKasarian}
              />
              <p className="ml-2">Lalaki</p>
            </label>
            <label className="mr-4 flex">
              <input
                type="radio"
                name="nanay"
                checked={childData.nanay.kasarian == "Babae"}
                value={"Babae"}
                onChange={handleKasarian}
              />
              <p className="ml-2">Babae</p>
            </label>
            <label className="flex-grow flex items-center">
              <input
                type="radio"
                name="nanay"
                checked={
                  childData.nanay.kasarian != "Babae" &&
                  childData.nanay.kasarian != "Lalaki"
                }
                onChange={handleOtherKasarian}
              />
              <p className="ml-2">Other: </p>
              <input
                ref={otherKasarianRef}
                type="text"
                onChange={handleOtherKasarian}
                placeholder="Kasarian"
                className="p-2 bg-inherit outline-none border-bb-violet border-b-2 w-1/2"
                name="kasarian-other"
              />
            </label>
          </span>
          <span className="w-1/2 mr-2">
            <label className="flex flex-col">
              <span className="text-sm mb-1">Edad / Age</span>
              <input
                type="number"
                min="1"
                max="100"
                placeholder="Edad"
                className="p-2 border-bb-violet border-2 rounded-lg bg-inherit outline-none"
                name="edad"
                onChange={handleChange}
              />
            </label>
          </span>
        </div>
        
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Petsa ng Kapanganakan / Date of Birth</span>
            <input
              type="date"
              placeholder="Petsa ng Kapanganakan"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              name="birthday"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Lugar ng Kapanganakan / Birthplace</span>
            <input
              type="text"
              placeholder="Lugar ng Kapanganakan"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              name="lugarNgKapanganakan"
              onChange={handleChange}
            />
          </label>
        </div>
        
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Relihiyon / Religion</span>
            <input
              type="text"
              placeholder="Relihiyon"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              name="relihiyon"
              onChange={handleChange}
            />
          </label>
          <div className="w-1/2 mr-2">
            <label className="flex flex-col">
              <span className="text-sm mb-1">Antas ng Paaralan / Education Level</span>
              <Select
                className="flex items-center overflow-auto h-14 w-full border-2 border-bb-violet pr-2 pl-2 rounded-md transition-colors duration-300 hover:border-bb-purple"
                optionClassName="text-bb-violet bg-bb-white transition-colors duration-300 hover:text-bb-white hover:bg-bb-purple"
                optionList={antasList}
                handleChange={handleChange}
                listHeight=""
              >
                <h1 className="flex-grow text-left">
                  {childData?.nanay?.antasNgPaaralan ??
                    "Naabot na Antas ng Paaralan"}
                </h1>
              </Select>
            </label>
          </div>
        </div>
        
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Huling Paaralang Pinasukan / Last School Attended</span>
            <input
              type="text"
              placeholder="Huling Paaralang Pinasukan"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              name="hulingPaaralangPinasukan"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Tirahan / Home</span>
            <input
              type="text"
              placeholder="Tirahan"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              name="tirahan"
              onChange={handleChange}
            />
          </label>
        </div>
        
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Probinsya</span>
            <input
              type="text"
              placeholder="Probinsya"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              id="probinsya-tatay"
              name="probinsya"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Trabaho</span>
            <input
              type="text"
              placeholder="Trabaho"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              id="trabaho-tatay"
              name="trabaho"
              onChange={handleChange}
            />
          </label>
        </div>
        
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Kita / Income</span>
            <input
              type="number"
              placeholder="Kita"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              id="kita-tatay"
              name="kita"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Skill Training Attended</span>
            <input
              type="text"
              placeholder="Skill Training Attended"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              id="skill-training-tatay"
              name="skillTraining"
              onChange={handleChange}
            />
          </label>
        </div>
        
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
          <label className="flex flex-col w-1/2 mr-2">
            <span className="text-sm mb-1">Skills</span>
            <input
              type="text"
              placeholder="Skills"
              className="p-2 border-bb-violet border-2 rounded-lg outline-none"
              id="skills-tatay"
              name="skills"
              onChange={handleChange}
            />
          </label>
        </div>
        
        <p style={{ fontSize: "24px" }}>
          <b>Available documents/I.D:</b>
        </p>
        
        <div className="flex flex-col">
          {documentList.map((document) => (
            <label
              className="flex items-center mb-2"
              style={{ fontSize: "18px" }}
              key={document}
            >
              <input
                type="checkbox"
                className="w-8 h-8 mr-4 border-bb-violet border-4 appearance-none outline-none cursor-pointer transition-colors checked:bg-bb-light-purple bridgeBuilderCheckbox relative"
                name="dokumento"
                value={document}
                onChange={handleCheckbox}
              />
              {document}
            </label>
          ))}
          <span className="flex flex-col w-1/2">
            <p className="text-sm mb-2">Iba pa: (Paghiwalayin ang mga dokumento gamit ng comma)</p>
            <input
              type="text"
              placeholder="Iba pang mga dokumento"
              onBlur={handleOtherDocuments}
              className="p-2 border-bb-violet border-b-2 text-sm outline-none"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default Nanay;