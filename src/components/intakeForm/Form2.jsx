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

const PamilyaProblema = ({ childData, setChildData, formFields, setFormFields, sectionActive }) => {
  // Handling checkbox
  const handleCheckbox = (event) => {
    const field = event.currentTarget.name;
    const value = event.currentTarget.value;

    setChildData({
      ...childData,
      [field]: event.currentTarget.checked
        ? [...childData[field], value]
        : childData[field].filter((data) => data !== value),
    });
  };

  

  const handleFieldChange = (fieldName, newValue) => {

    const updatedFields = formFields[sectionActive]
      ? formFields[sectionActive].map((field) => {
          if (field.fieldName === fieldName) {
            return { ...field, fieldValue: newValue }; // Update the fieldValue if fieldName matches
          }
          return field;
        })
      : [];
  
    // If the field doesn't exist in the array, add it
    if (!updatedFields.some(field => field.fieldName === fieldName)) {
      updatedFields.push({ fieldName, fieldValue: newValue });
    }
  
    // Update formFields correctly
    setFormFields({
      ...formFields,
      [sectionActive]: updatedFields,
    });
  
    //Debug
    console.log("updated fields: ", updatedFields); 
  };

  return (
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

        {/* Render input fields */}
        {formFields[sectionActive] &&
          formFields[sectionActive].map((field) => (
            <div
              key={field.fieldName} 
              className="flex items-center w-full"
              style={{ fontSize: "18px" }}
            >
              <div className="flex flex-col w-1/2 mr-2">
                <label htmlFor={field.fieldName} className="text-sm mb-1 ml-1">
                  {field.fieldName}
                </label>
                <input
                  type="text"
                  placeholder={field.fieldName}
                  name={`${sectionActive}_${field.fieldName}`} 
                  className="p-2 border-bb-violet border-2 rounded-lg w-full"
                  id={`${sectionActive}_${field.fieldName}`} 
                  value={field.fieldValue || ""}
                  onChange={(e) => handleFieldChange(field.fieldName, e.target.value)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PamilyaProblema;
