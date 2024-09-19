import { useState } from "react";

const documentList = [
  "School Report Card",
  "Baptismal",
  "ID Picture",
  "Birth Certificate",
  "Health Card",
];

const Dokumento = ({ childData, setChildData }) => {
  const [otherDocuments, setOtherDocuments] = useState([]);

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

  const handleOtherDocuments = (event) => {
    const value = event.currentTarget.value;
    const documentList = value
      .trim()
      .split(/\s*,\s*/)
      .filter((feature) => feature !== "");

    const updatedDocuments = childData.dokumento.filter(
      (document) => !otherDocuments.includes(document)
    );

    const newDocuments = [...updatedDocuments, ...documentList];

    setChildData((prevChildData) => ({
      ...prevChildData,
      dokumento: newDocuments,
    }));

    setOtherDocuments(documentList);
  };

  return (
    <>
      <p>Required documents.</p>
      {documentList.map((document, index) => (
        <span className="flex items-center" key={index}>
          <input
            type="checkbox"
            className="w-8 h-8 mr-4 border-bb-violet border-4 appearance-none outline-none cursor-pointer transition-colors checked:bg-bb-light-purple bridgeBuilderCheckbox relative"
            name="dokumento"
            value={document}
            onChange={handleCheckbox}
          />
          <p className="text-2xl">{document}</p>
        </span>
      ))}

      <span className="flex flex-col w-1/2">
        <p>Iba pa: (Paghiwalayin ang mga dokumento gamit ng comma)</p>
        <input
          type="text"
          placeholder="Iba pang mga dokumento"
          onBlur={handleOtherDocuments}
          className="p-2 border-bb-violet border-b-2 text-2xl outline-none"
        />
      </span>
    </>
  );
};

export default Dokumento;
