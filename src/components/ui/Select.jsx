import { forwardRef, Fragment, useRef } from "react";
import { cn } from "@/lib/utils";

const Select = forwardRef(
  (
    {
      className,
      optionClassName,
      handleChange,
      optionList,
      listHeight = "h-full",
      children,
      ...props
    },
    ref
  ) => {
    const selectRef = useRef(null);

    const handleOpen = () => {
      selectRef.current.style.display = "block";
    };

    const handleClose = () => {
      selectRef.current.style.display = "none";
    };

    const handleBlur = () => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.relatedTarget)
      ) {
        handleClose();
      }
    };

    const handleSelectChange = (event) => {
      handleChange(event);
      handleClose();
    };

    return (
      <div className="relative">
        <button
          ref={ref}
          onFocus={handleOpen}
          onBlur={handleBlur}
          className={cn(className)}
          {...props}
        >
          {children}
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </button>

        <div
          ref={selectRef}
          className={`hidden absolute bg-bb-white w-full ${listHeight} shadow-lg z-10 flex-col overflow-auto`}
        >
          {optionList.map((option) => (
            <Fragment key={option.value}>
              <button
                className={cn("w-full p-4 text-left", optionClassName)}
                value={option.value}
                name={option.name}
                onClick={handleSelectChange}
              >
                {option.value}
              </button>
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
