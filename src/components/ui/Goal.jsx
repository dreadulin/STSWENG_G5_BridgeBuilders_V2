import { useEffect, useState, forwardRef, Fragment, useRef } from "react";
import { cn } from "@/lib/utils";
import Dropdown from "./Dropdown";

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
      editMode = false,
      ...props
    },
    ref
  ) => {
    const [achievedGoals, setAchievedGoals] = useState(goalsAchieved);
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

    return (
      <div
        ref={ref}
        className={cn(
          `flex flex-col w-72 h-80 mr-4 ml-4 mt-8 mb-4 bg-bb-light-purple flex-none`,
          className
        )}
        {...props}
      >
        <Dropdown
          title={"Progress"}
          className="flex w-full bg-bb-white p-2 text-2xl transition-colors hover:bg-bb-violet hover:text-bb-white"
          optionContainerClass="w-full h-52 "
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
