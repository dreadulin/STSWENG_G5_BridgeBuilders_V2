const problemList = [
  "Abandoned",
  "Neglected",
  "Ran away from home",
  "Gang involvement",
  "Suffered physical abuse",
  "Suffered sexual abuse",
  "Roaming in the street",
  "Sleeping on the street",
  "Hygiene",
  "School drop-out",
  "Academic problem",
  "Not studying",
];

const PamilyaProblema = ({ childData, setChildData }) => {
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
  return (
    <>
      <div className="mt-4 space-y-4">
        <p style={{ fontSize: "24px" }}>
          <b>Problema:</b>
        </p>
        <div className="flex flex-col">
          {problemList.map((problem) => (
            <label
              className="flex items-center mb-2"
              style={{ fontSize: "18px" }}
              key={problem}
            >
              <input
                type="checkbox"
                className="w-8 h-8 mr-4 border-bb-violet border-4 appearance-none outline-none cursor-pointer transition-colors checked:bg-bb-light-purple bridgeBuilderCheckbox relative"
                name="problema"
                value={problem}
                onChange={handleCheckbox}
              />
              {problem}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default PamilyaProblema;
