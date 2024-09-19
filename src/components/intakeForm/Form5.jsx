import Accordion from "@/components/ui/Accordion";
import Select from "@/components/ui/Select";
import { useState } from "react";

const antasList = [
  { value: "None", name: "antasNgPaaralan" },
  { value: "Elementary", name: "antasNgPaaralan" },
  { value: "High School", name: "antasNgPaaralan" },
  { value: "College", name: "antasNgPaaralan" },
  { value: "ALS", name: "antasNgPaaralan" },
];

const Kapatid = ({ childData, setChildData }) => {
  const [otherKasarianList, setOtherKasarianList] = useState([]);

  // This is for the other kasarian textfield
  const handleOtherKasarianChange = (event) => {
    const kapatidIndex = event.currentTarget.id;
    const kapatidKasarian = childData.kapatid.find(
      (k) => k.kapatidIndex == kapatidIndex
    )?.kasarian;

    const newKasarianList = otherKasarianList.map((kapatid) => {
      if (kapatid.kapatidIndex == kapatidIndex) {
        return { ...kapatid, kasarian: event.currentTarget.value };
      }
      return kapatid;
    });

    setOtherKasarianList(newKasarianList);

    if (kapatidKasarian != "Lalaki" && kapatidKasarian != "Babae") {
      const updatedKapatid = childData.kapatid.map((k) => {
        if (k.kapatidIndex == kapatidIndex) {
          return { ...k, kasarian: event.currentTarget.value };
        }
        return k;
      });

      setChildData({ ...childData, kapatid: updatedKapatid });
    }
  };

  // This is for the other kasarian radio button
  const handleOtherKasarian = (event) => {
    const kapatidIndex = event.currentTarget.name;
    const kapatidOtherKasarian = otherKasarianList.find(
      (kapatid) => kapatid.kapatidIndex == kapatidIndex
    )?.kasarian;

    if (!kapatidOtherKasarian) return;

    const newKapatidList = childData.kapatid.map((kapatid) => {
      if (kapatid.kapatidIndex == kapatidIndex) {
        return { ...kapatid, kasarian: kapatidOtherKasarian };
      }
      return kapatid;
    });

    setChildData({ ...childData, kapatid: newKapatidList });
  };

  const addSibling = () => {
    const lastIndex =
      childData.kapatid[childData.kapatid.length - 1]?.kapatidIndex ?? 0;
    setChildData({
      ...childData,
      kapatid: [
        ...childData.kapatid,
        {
          kapatidIndex: lastIndex + 1,
          pangalan: "",
          palayaw: "",
          kasarian: "",
          edad: 0,
          trabaho: "",
          kita: 0,
          antasNgPaaralan: "None",
        },
      ],
    });

    setOtherKasarianList([
      ...otherKasarianList,
      { kapatidIndex: lastIndex + 1, otherKasarian: "" },
    ]);
  };

  const removeSibling = (event) => {
    const targetIndex = event.target.value;
    const newKapatidList = childData.kapatid.filter(
      (kapatid) => kapatid.kapatidIndex != targetIndex
    );
    const newOtherKasarianList = otherKasarianList.filter(
      (kapatid) => kapatid.kapatidIndex != targetIndex
    );
    setChildData({ ...childData, kapatid: newKapatidList });
    setOtherKasarianList(newOtherKasarianList);
  };

  const handleChange = (event) => {
    const values = event.target.name.split("-");
    const field = values[0];
    const kapatidIndex = values[1];

    const updatedKapatid = childData.kapatid.map((k) => {
      if (k.kapatidIndex == kapatidIndex) {
        return { ...k, [field]: event.currentTarget.value };
      } else return k;
    });

    setChildData((prevData) => ({
      ...prevData,
      kapatid: updatedKapatid,
    }));
  };

  return (
    <>
      <p>Information about siblings.</p>
      <button
        className="border-dashed border-2 border-bb-violet h-16 w-full flex items-center p-2 hover:bg-bb-violet hover:text-bb-white hover:border-bb-white transition-colors duration-200"
        onClick={addSibling}
      >
        <h1 className="flex-grow text-4xl text-left">Magdagdag ng Kapatid</h1>
        <span className="material-symbols-outlined text-5xl self-end">add</span>
      </button>

      {childData.kapatid.map((kapatid) => (
        <Accordion
          title={kapatid.pangalan == "" ? "Unnamed sibling" : kapatid.pangalan}
          accordionOpenColor="bg-bb-violet text-bb-white"
          className="bg-bb-white text-4xl"
          containerClassName="bg-bb-white text-2xl"
          key={kapatid.kapatidIndex}
        >
          <div className="flex items-center w-full flex-col">
            <div className="flex w-full items-center">
              <input
                type="text"
                placeholder="Pangalan"
                className="p-2 border-bb-violet border-b-2 bg-inherit w-1/3 mr-8 outline-none text-2xl"
                name={`pangalan-${kapatid.kapatidIndex}`}
                onChange={handleChange}
              />

              <input
                type="number"
                min="1"
                max="100"
                placeholder="Edad"
                className="p-2 border-bb-violet border-2 rounded-lg bg-inherit w-1/6 outline-none mr-8 text-2xl"
                name={`edad-${kapatid.kapatidIndex}`}
                onChange={handleChange}
              />

              <label className="text-2xl mr-8 flex">
                <input
                  type="radio"
                  checked={kapatid.kasarian == "Lalaki"}
                  value={"Lalaki"}
                  name={`kasarian-${kapatid.kapatidIndex}`}
                  onChange={handleChange}
                />
                <p className="ml-2">Lalaki</p>
              </label>
              <label className="text-2xl mr-8 flex">
                <input
                  type="radio"
                  checked={kapatid.kasarian == "Babae"}
                  value={"Babae"}
                  name={`kasarian-${kapatid.kapatidIndex}`}
                  onChange={handleChange}
                />
                <p className="ml-2">Babae</p>
              </label>
              <label className="text-2xl flex-grow flex items-center">
                <input
                  type="radio"
                  checked={
                    kapatid.kasarian != "Lalaki" && kapatid.kasarian != "Babae"
                  }
                  name={kapatid.kapatidIndex}
                  onChange={handleOtherKasarian}
                />
                <p className="ml-2">Other: </p>
                <input
                  type="text"
                  placeholder="Kasarian"
                  className="p-2 bg-inherit outline-none border-bb-violet border-b-2 text-2xl"
                  id={kapatid.kapatidIndex}
                  onChange={handleOtherKasarianChange}
                />
              </label>
            </div>

            <div className="w-full flex items-center mt-4">
              <input
                type="text"
                placeholder="Trabaho"
                className="p-2 border-bb-violet border-b-2 bg-inherit w-1/2 mr-8 outline-none text-2xl"
                name={`trabaho-${kapatid.kapatidIndex}`}
                onChange={handleChange}
              />

              <span className="flex-grow" />
              <p className="text-4xl">&#8369;</p>
              <input
                type="number"
                min="1"
                placeholder="Kita"
                className="p-2 border-bb-violet border-b-2 bg-inherit w-1/4 outline-none text-2xl"
                name={`kita-${kapatid.kapatidIndex}`}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <Select
                className="flex items-center overflow-auto h-14 w-full border-2 border-bb-purple pr-4 pl-4 rounded-md transition-colors duration-300 hover:border-bb-violet mt-4"
                optionClassName="text-bb-violet bg-bb-white text-3xl transition-colors duration-300 hover:text-bb-white hover:bg-bb-purple"
                optionList={antasList.map((antas) => {
                  return {
                    ...antas,
                    name: `antasNgPaaralan-${kapatid.kapatidIndex}`,
                  };
                })}
                handleChange={handleChange}
              >
                <h1 className="text-2xl xl:text-4xl flex-grow text-left">
                  {kapatid.antasNgPaaralan ?? "Naabot na Antas ng Paaralan"}
                </h1>
              </Select>
            </div>

            <div className="w-full h-16 flex items-center justify-end mt-2 mb-2">
              <button
                value={kapatid.kapatidIndex}
                onClick={removeSibling}
                className="w-64 h-12 rounded-lg text-2xl bg-bb-violet text-bb-white hover:bg-bb-light-purple hover:text-bb-violet transition-colors duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        </Accordion>
      ))}
    </>
  );
};

export default Kapatid;
