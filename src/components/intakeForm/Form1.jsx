import { useRef, useState } from "react";
import Select from "@/components/ui/Select";

const antasList = [
  { value: "None", name: "antasNgPaaralan" },
  { value: "Elementary", name: "antasNgPaaralan" },
  { value: "High School", name: "antasNgPaaralan" },
  { value: "College", name: "antasNgPaaralan" },
  { value: "ALS", name: "antasNgPaaralan" },
];

const programList = [
  { value: "Home Care", name: "program" },
  { value: "Community Based Program", name: "program" },
];

const featureList = [
  "Madumi at punit na damit",
  "May sugat/galis sa katawan",
  "Payat na pangangatawan",
  "Maduming kuko",
  "Magulong buhok",
  "Malaki ang tiyan",
  "May sirang ngipin",
  "Nakayapak/walang tsinelas",
  "May hindi magandang amoy",
];

const PangunahingImpormasyon = ({ childData, setChildData }) => {
  const otherKasarianRef = useRef(null);
  const [otherFeatures, setOtherFeatures] = useState([]);
  const [showNGOandLGU, setShowNGOandLGU] = useState(false);

  // Handling Kategorya radio buttons
  const handleCategory = (event) => {
    const value = event.currentTarget.value;
    const isReferral = value === "Referral";

    if (isReferral) {
      setShowNGOandLGU(true);
    } else setShowNGOandLGU(false);

    setChildData({
      ...childData,
      kategorya: {
        ...childData.kategorya,
        pangalan: event.currentTarget.value,
        ngo: isReferral ? childData.kategorya.ngo : "",
        lgu: isReferral ? childData.kategorya.lgu : "",
      },
    });
  };

  // Handling Referral category textfield change
  const handleReferral = (event) => {
    const isNgo = event.target.name === "ngo";
    const isLgu = event.target.name === "lgu";
    setChildData({
      ...childData,
      kategorya: {
        ...childData.kategorya,
        ...(isNgo ? { ngo: event.currentTarget.value } : {}),
        ...(isLgu ? { lgu: event.currentTarget.value } : {}),
      },
    });
  };

  // Handling textfield, number input, radio, and date input fields
  const handleChange = (event) => {
    setChildData({
      ...childData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  // Handling checkbox
  const handleCheckbox = (event) => {
    const field = event.currentTarget.name;
    const value = event.currentTarget.value;

    setChildData({
      ...childData,
      [field]: event.currentTarget.checked
        ? [...childData[field], value]
        : childData[field].filter((data) => data != value),
    });
  };

  // Handling other kasarian input
  const handleOtherKasarian = () => {
    const kasarian = otherKasarianRef.current.value;
    setChildData({ ...childData, kasarian });
  };

  const handleOtherFeatures = (event) => {
    const value = event.currentTarget.value;
    const featureList = value
      .trim()
      .split(/\s*,\s*/)
      .filter((feature) => feature !== "");

    const updatedInitialItsura = childData.initialNaItsura.filter(
      (feature) => !otherFeatures.includes(feature)
    );

    const newInitialItsura = [...updatedInitialItsura, ...featureList];

    setChildData((prevChildData) => ({
      ...prevChildData,
      initialNaItsura: newInitialItsura,
    }));

    setOtherFeatures(featureList);
  };

  return (
    <>
    <div className="mt-4 space-y-4">
      <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
        <div className="flex flex-col w-1/2 mr-2">
          <label htmlFor="pangalan" className="text-sm mb-1 ml-1">
            Pangalan / Name
          </label>
          <input
            type="text"
            placeholder="Pangalan"
            name="pangalan"
            className="p-2 border-bb-violet border-2 rounded-lg w-full"
            id="pangalan"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-1/2 ml-2">
          <label htmlFor="palayaw" className="text-sm mb-1 ml-1">
            Palayaw/Nickname
          </label>
          <input
            type="text"
            placeholder="Palayaw"
            name="palayaw"
            className="p-2 border-bb-violet border-2 rounded-lg w-full"
            id="palayaw"
            onChange={handleChange}
          />
        </div>
      </div>

        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
        <div className="flex flex-col w-full mr-2">
          <label htmlFor="programa" className="text-sm mb-1 ml-1">
            Programa / Program
          </label>
          <Select
            id="programa"
            className="flex items-center overflow-auto h-14 w-full border-2 border-bb-violet pr-2 pl-2 rounded-md transition-colors duration-300 hover:border-bb-purple"
            optionClassName="text-bb-violet bg-bb-white text-2xl transition-colors duration-300 hover:text-bb-white hover:bg-bb-purple"
            optionList={programList}
            handleChange={handleChange}
            listHeight=""
          >
            <h1 className="text-2xl flex-grow text-left">
              {childData?.program ?? "Program"}
            </h1>
          </Select>
        </div>
        </div>
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
          <span className="flex items-center w-1/2 mr-2">
            <label className="text-2xl mr-4 flex">
              <input
                type="radio"
                checked={childData?.kasarian == "Lalaki"}
                name="kasarian"
                value={"Lalaki"}
                onChange={handleChange}
              />
              <p className="ml-2">Lalaki</p>
            </label>
            <label className="text-2xl mr-4 flex">
              <input
                type="radio"
                name="kasarian"
                checked={childData?.kasarian == "Babae"}
                value={"Babae"}
                onChange={handleChange}
              />
              <p className="ml-2">Babae</p>
            </label>
            <label className="text-2xl flex-grow flex items-center">
              <input
                type="radio"
                name="kasarian"
                checked={
                  childData?.kasarian != "Babae" &&
                  childData?.kasarian != "Lalaki"
                }
                onChange={handleOtherKasarian}
              />
              <p className="ml-2">Other: </p>
              <input
                ref={otherKasarianRef}
                type="text"
                onChange={handleOtherKasarian}
                placeholder="Kasarian"
                className="p-2 bg-inherit outline-none border-bb-violet border-b-2 text-2xl w-1/2"
                name="kasarian-other"
              />
            </label>
          </span>
          <div className="flex flex-col w-1/2 mr-2">
            <label htmlFor="edad" className="text-sm mb-1 ml-1">
              Edad / Age
            </label>
            <input
              type="number"
              min="1"
              max="100"
              placeholder="Edad"
              className="p-2 border-bb-violet border-2 rounded-lg bg-inherit w-full outline-none text-2xl"
              name="edad"
              id="edad"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2 mr-2">
            <label htmlFor="birthday" className="text-sm mb-1 ml-1">
              Birthday
            </label>
            <input
              type="date"
              placeholder="Petsa ng Kapanganakan"
              className="p-2 border-bb-violet border-2 rounded-lg w-full"
              name="birthday"
              id="birthday"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2 mr-2">
            <label htmlFor="lugarNgKapanganakan" className="text-sm mb-1 ml-1">
              Lugar ng Kapanganakan / Birthplace
            </label>
            <input
              type="text"
              placeholder="Lugar ng Kapanganakan"
              className="p-2 border-bb-violet border-2 rounded-lg w-full"
              name="lugarNgKapanganakan"
              id="lugarNgKapanganakan"
              onChange={handleChange}
            />
          </div>
        </div>
        </div>
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2 mr-2">
            <label htmlFor="relihiyon" className="text-sm mb-1 ml-1">
              Relihiyon / Religion
            </label>
            <input
              type="text"
              placeholder="Relihiyon"
              className="p-2 border-bb-violet border-2 rounded-lg w-full"
              name="relihiyon"
              id="relihiyon"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2 mr-2">
            <label htmlFor="antasNgPaaralan" className="text-sm mb-1 ml-1">
              Antas ng Paaralan / Education Level
            </label>
            <Select
              id="antasNgPaaralan"
              className="flex items-center overflow-auto h-14 w-full border-2 border-bb-violet pr-2 pl-2 rounded-md transition-colors duration-300 hover:border-bb-purple"
              optionClassName="text-bb-violet bg-bb-white text-2xl transition-colors duration-300 hover:text-bb-white hover:bg-bb-purple"
              optionList={antasList}
              handleChange={handleChange}
              name="antasNgPaaralan"
              listHeight=""
            >
              <h1 className="text-2xl flex-grow text-left">
                {childData?.antasNgPaaralan ?? "Naabot na Antas ng Paaralan"}
              </h1>
            </Select>
          </div>
        </div>
        </div>
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2 mr-2">
            <label htmlFor="hulingPaaralangPinasukan" className="text-sm mb-1 ml-1">
              Huling Paaralang Pinasukan / Last School Attended
            </label>
            <input
              type="text"
              placeholder="Huling Paaralang Pinasukan"
              className="p-2 border-bb-violet border-2 rounded-lg w-full"
              name="hulingPaaralangPinasukan"
              id="hulingPaaralangPinasukan"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2 mr-2">
            <label htmlFor="tirahan" className="text-sm mb-1 ml-1">
              Tirahan / Home
            </label>
            <input
              type="text"
              placeholder="Tirahan"
              className="p-2 border-bb-violet border-2 rounded-lg w-full"
              name="tirahan"
              id="tirahan"
              onChange={handleChange}
            />
          </div>
        </div>
        </div>
        <div className="flex items-center w-full" style={{ fontSize: "18px" }}>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2 mr-2">
            <label htmlFor="allergy" className="text-sm mb-1 ml-1">
              Allergy
            </label>
            <input
              type="text"
              placeholder="Allergy"
              className="p-2 border-bb-violet border-2 rounded-lg w-full"
              name="allergy"
              id="allergy"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2 mr-2">
            <label htmlFor="vaccine" className="text-sm mb-1 ml-1">
              Vaccine
            </label>
            <input
              type="text"
              placeholder="Vaccine"
              className="p-2 border-bb-violet border-2 rounded-lg w-full"
              name="vaccine"
              id="vaccine"
              onChange={handleChange}
            />
          </div>
        </div>
        </div>
        <p style={{ fontSize: "24px" }}>
          <b>Inisyal na Itsurang Pisikal ng Bata:</b>
        </p>
        <div className="flex flex-col">
          {featureList.map((feature) => (
            <label
              className="flex items-center mb-2"
              style={{ fontSize: "18px" }}
              key={feature}
            >
              <input
                type="checkbox"
                className="w-8 h-8 mr-4 border-bb-violet border-4 appearance-none outline-none cursor-pointer transition-colors checked:bg-bb-light-purple bridgeBuilderCheckbox relative"
                name="initialNaItsura"
                value={feature}
                onChange={handleCheckbox}
              />
              {feature}
            </label>
          ))}
          <span className="flex flex-col w-1/2">
            <p>Iba pa: (Paghiwalayin ang mga itsura gamit ng comma)</p>
            <input
              type="text"
              placeholder="Iba pang mga itsura"
              onBlur={handleOtherFeatures}
              className="p-2 border-bb-violet border-b-2 text-2xl outline-none"
            />
          </span>
        </div>
        <p style={{ fontSize: "24px" }}>
          <b>Kategoryang Kinapapalooban:</b>
        </p>
        <div className="flex flex-wrap space-x-4 items-center">
          <label className="flex items-center" style={{ fontSize: "18px" }}>
            <input
              type="radio"
              className="mr-2"
              value={"Kusang Lumapit"}
              checked={childData.kategorya.pangalan == "Kusang Lumapit"}
              onChange={handleCategory}
            />
            Kusang Lumapit
          </label>
          <label className="flex items-center" style={{ fontSize: "18px" }}>
            <input
              type="radio"
              className="mr-2"
              value={"Naisama sa Survey"}
              checked={childData.kategorya.pangalan == "Naisama sa Survey"}
              onChange={handleCategory}
            />
            Naisama sa Survey
          </label>
          <label className="flex items-center" style={{ fontSize: "18px" }}>
            <input
              type="radio"
              className="mr-2"
              value={"Referral"}
              checked={childData.kategorya.pangalan == "Referral"}
              onChange={handleCategory}
            />
            Referral
          </label>
        </div>
        {showNGOandLGU && (
          <>
            <input
              type="text"
              placeholder="NGO"
              style={{ fontSize: "18px" }}
              className="p-2 border-bb-violet border-2 rounded-lg w-full"
              name="ngo"
              onChange={handleReferral}
            />
            <input
              type="text"
              placeholder="LGU"
              style={{ fontSize: "18px" }}
              className="p-2 border-bb-violet border-2 rounded-lg w-full"
              name="lgu"
              onChange={handleReferral}
            />
          </>
        )}
      </div>
    </>
  );
};

export default PangunahingImpormasyon;
