import { useCallback } from "react";
import "./App.css";
import Task from "./components/Task";
import { stages } from "./data";
import Stage from "./components/Stage";
import { useLocalStorage } from "./hooks";
import { getStageTasks, isAllTasksCompleted, isStageCompleted } from "./utils";
import RandomFact from "./components/RandomFact";

function App() {
  const [completedIds, setCompletedIds] = useLocalStorage<Task["id"][]>(
    "completed-tasks",
    []
  );

  const isAllCompleted = isAllTasksCompleted(completedIds);

  const handleTaskToggle = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    ({ currentTarget }) =>
      setCompletedIds((prevState) =>
        currentTarget.checked
          ? [...prevState, currentTarget.value]
          : prevState.filter((id) => id !== currentTarget.value)
      ),
    [setCompletedIds]
  );

  return (
    <>
      <div className="card">
        <h1 className="card__title">My startup progress</h1>
        <ol className="list-ordered-circle">
          {stages.map((stage, index) => {
            const isPrevStageCompleted =
              index === 0 || isStageCompleted(stages[index - 1], completedIds);
            const isNextStageCompleted =
              index < stages.length - 1 &&
              isStageCompleted(stages[index + 1], completedIds);

            return (
              <Stage
                key={stage.id}
                label={stage.name}
                isCompleted={isStageCompleted(stage, completedIds)}
                className="list-ordered-circle__item"
              >
                {getStageTasks(stage).map((task) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    isCompleted={completedIds.includes(task.id)}
                    isDisabled={
                      isAllCompleted ||
                      !isPrevStageCompleted ||
                      isNextStageCompleted
                    }
                    onChange={handleTaskToggle}
                  >
                    {task.name}
                  </Task>
                ))}
              </Stage>
            );
          })}
        </ol>
      </div>
      {isAllCompleted ? (
        <div className="text-center">
          <h2>Congrats, all done! Here's a random fact:</h2>
          <RandomFact />
        </div>
      ) : null}
    </>
  );
}

export default App;
