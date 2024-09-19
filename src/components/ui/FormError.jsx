import { Fragment, useEffect, useState } from "react";

const ErrorSection = ({ section, errors }) => {
  const sectionErrors = errors
    .filter((err) => err.split(" - ")[0] === section)
    .map((err) => err.split(" - ")[1]);

  return (
    <>
      <p className="text-2xl">{section}</p>
      <div className="bg-bb-white w-full h-0.5"></div>
      {sectionErrors.map((err) => (
        <Fragment key={err}>
          <p className="text-xl mt-2 mb-2 text-red-300">{err}</p>
        </Fragment>
      ))}
    </>
  );
};

const FormError = ({ isOpen, errors, handleClose }) => {
  // Only the sections that could be checked for error
  const allSections = [
    "Pangunahing Impormasyon",
    "Nanay",
    "Tatay",
    "Kapatid",
    "Ibang Impormasyon",
  ];

  const [errorSections, setErrorSections] = useState(allSections);

  const closeError = () => {
    handleClose();
    setErrorSections(allSections);
  };

  useEffect(() => {
    const sections = errors.map((err) => err.split(" - ")[0]);
    // We do this to keep the sections in order based on the form.
    const errorSecs = errorSections.filter((sec) => sections.includes(sec));

    if (errors.length > 0) {
      setErrorSections(errorSecs);
    }
  }, [errors]);

  return (
    <>
      <div
        className={`fixed w-1/4 h-1/3 bottom-16 right-16 z-20 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        } transition-opacity duration-500 bg-bb-violet shadow-lg rounded-sm overflow-auto`}
      >
        <span className="flex items-center justify-center mb-1 sticky top-0 bg-bb-white text-bb-violet p-2">
          <p className="text-3xl flex-grow">Form Errors!</p>
          <span
            className="cursor-pointer text-4xl material-symbols-outlined"
            onClick={closeError}
          >
            close
          </span>
        </span>

        <div className="p-2">
          <div className="mt-4">
            {errorSections.map((section) => {
              return (
                <div key={section} className="mb-8">
                  <ErrorSection section={section} errors={errors} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormError;
