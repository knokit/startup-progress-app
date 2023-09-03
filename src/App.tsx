import { useCallback } from "react";
import "./App.css";
import Task from "./components/Task";
import { stages, tasks } from "./data";
import Stage from "./components/Stage";
import { useLocalStorage } from "./hooks";

const tasksIndexedByStage = tasks.reduce<{ [stage: Task["stage"]]: Task[] }>(
  (acc, task) => ({
    ...acc,
    [task.stage]: acc[task.stage] ? [...acc[task.stage], task] : [task],
  }),
  {}
);

function isStageCompleted(stage: Stage, completedIds: Task['id'][]) {
  const stageTasks = tasksIndexedByStage[stage.id];
  return stageTasks.every((task) => completedIds.includes(task.id));
}

function App() {
  const [completedIds, setCompletedIds] = useLocalStorage<Task["id"][]>("completed-tasks", []);

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
    <div className="card">
      <h1 className="card__title">My startup progress</h1>
      <ol className="list-ordered-circle">
        {stages.map((stage) => (
          <Stage
            key={stage.id}
            label={stage.name}
            isCompleted={isStageCompleted(stage, completedIds)}
            className="list-ordered-circle__item"
          >
            {tasksIndexedByStage[stage.id].map((task) => (
              <Task
                key={task.id}
                id={task.id}
                isCompleted={completedIds.includes(task.id)}
                onChange={handleTaskToggle}
              >
                {task.name}
              </Task>
            ))}
          </Stage>
        ))}
      </ol>
    </div>
  );
}

export default App;
