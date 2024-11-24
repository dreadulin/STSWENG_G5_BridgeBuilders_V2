import { useEffect, useState, forwardRef, Fragment, useRef } from "react";
import { cn } from "@/lib/utils";
import Dropdown from "./Dropdown";
import axios from "axios";

// Existing goal service arrays
const goal1Services = [
  "Assignment Help",
  "Tutorial",
  "Document Processing",
  "School Visit",
  "Alternative Learning System (ALS)",
  "Provision of School Needs",
  "Mindfulness",
  "Reading Session",
];

const goal2Services = [
  "Provision of Meal",
  "WASH",
  "Health Assistance",
  "Psychological Evaluation",
  "Provisions of Medicines and Vitamins",
  "Reproductive Health Assistance",
  "Recreational Activities",
  "Talent Development",
  "Learning Session",
  "Case Management",
];

const goal3Services = [
  "Skills Training and Job Hunting",
  "Learning Session",
  "Assistance to Family",
  "Parents Capacity Building",
];

const Goal = forwardRef(
  (
    {
      className,
      image,
      title,
      goal,
      goalsAchieved,
      handleGoalChange,
      handleAddSubgoal,
      editMode = false,
      ...props
    },
    ref
  ) => {
    const [achievedGoals, setAchievedGoals] = useState(goalsAchieved);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [newSubgoal, setNewSubgoal] = useState(""); // State to hold the new subgoal input
    const [additionalOptions, setAdditionalOptions] = useState([]); // State for new subgoals
    const progressRef = useRef(null);

    const goalList =
      goal == 1 ? goal1Services : goal == 2 ? goal2Services : goal3Services;

    const goalCompleted = goalList.every((goal) =>
      achievedGoals.includes(goal)
    );

    useEffect(() => {
      const achievedForGoal = goalsAchieved.filter((goal) =>
        goalList.includes(goal)
      );
      setAchievedGoals(achievedForGoal);
    }, [goalsAchieved, goalList]);

    useEffect(() => {
      const percentage = Math.floor(
        (achievedGoals.length / goalList.length) * 100
      );

      if (progressRef.current)
        progressRef.current.style.width = `${percentage}%`;
    }, [achievedGoals, goalList]);

    const handleSaveClick = () => {
      // Add the new subgoal to the additionalOptions state
      if (newSubgoal) {
        setAdditionalOptions((prev) => [...prev, newSubgoal]);
    
        // Pass the new subgoal to the parent component's function
        handleAddSubgoal(newSubgoal);
    
        setNewSubgoal(""); // Clear the input field after saving
        setShowModal(false); // Close the modal
      }
    };
    

    const handleCancel = () => {
      setShowModal(false); // Close the modal without saving
      setNewSubgoal(""); // Clear the input field
    };

    return (
      <div
        ref={ref}
        className={cn(
          `flex flex-col w-72 h-80 mr-4 ml-4 mt-8 mb-4 bg-bb-light-purple flex-none`,
          className
        )}
        {...props}
      >
        {/* Existing Dropdown for Progress */}
        <Dropdown
          title={"Main Goals"}
          className="flex w-full bg-bb-white p-2 text-2xl transition-colors hover:bg-bb-violet hover:text-bb-white"
          optionContainerClass="w-full h-52"
        >
          {goalList.map((goal) => {
            const goalAchieved = achievedGoals.includes(goal);
            return (
              <Fragment key={goal}>
                <span className="m-4 flex items-center">
                  <h1 className="w-3/4 text-xl">{goal}</h1>
                  <span className="w-1/4 flex justify-center">
                    {editMode ? (
                      <input
                        type="checkbox"
                        className="w-8 h-8 ml-4 border-bb-violet border-4 appearance-none outline-none cursor-pointer transition-colors checked:bg-bb-light-purple bridgeBuilderCheckbox relative"
                        checked={goalAchieved}
                        name="goal"
                        value={goal}
                        onChange={handleGoalChange}
                      />
                    ) : (
                      <span
                        className={`material-symbols-outlined ml-4 ${
                          goalAchieved ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {goalAchieved ? "check" : "close"}
                      </span>
                    )}
                  </span>
                </span>
                <hr />
              </Fragment>
            );
          })}
        </Dropdown>

        {/* New Dropdown below Title */}
        <Dropdown
          title={"Subgoals"}
          className="flex w-full bg-bb-white p-2 text-2xl transition-colors hover:bg-bb-violet hover:text-bb-white"
          optionContainerClass="w-full"
        >
          {/* Positioned the Add button above the options with some spacing */}
          <div className="w-full mb-4 flex justify-center items-center h-16">
            <button
              className="bg-bb-violet text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-md hover:bg-bb-dark-purple hover:shadow-lg transition-all duration-200"
              onClick={() => setShowModal(true)} // Show modal when clicked
            >
              Add New Subgoal
            </button>
          </div>

          {/* Displaying the additional options below the "Add" button */}
          <div className="w-full">
            {additionalOptions.map((option, index) => (
              <Fragment key={index}>
                <span className="m-4 flex items-center">
                  <h1 className="w-3/4 text-xl">{option}</h1>
                </span>
                <hr />
              </Fragment>
            ))}
          </div>
        </Dropdown>

        {/* Modal for adding a new subgoal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl mb-4">Add New Subgoal</h2>
              <input
                type="text"
                value={newSubgoal}
                onChange={(e) => setNewSubgoal(e.target.value)}
                placeholder="Enter new subgoal"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClick}
                  className="bg-bb-violet text-white p-2 rounded-md hover:bg-bb-dark-purple"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center w-full flex-grow">
          <img src={image} className="object-contain" />
        </div>

        <h3
          className={`text-center text-3xl flex-grow items-center ${
            goalCompleted ? "text-bb-white" : "text-bb-violet"
          }`}
        >
          {goalCompleted ? "Complete" : "Incomplete"}
        </h3>
        <span
          ref={progressRef}
          className="h-2 w-0 bg-progress-green text-center text-bb-white transition-all duration-200"
        />
        <div className="bg-bb-white">
          <h3 className="text-center text-1xl p-2">{title}</h3>
        </div>
      </div>
    );
  }
);

Goal.displayName = "Goal";

export default Goal;
