import { useCallback, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import { stages, tasks } from "./data";
import Stage from "./components/Stage";

const tasksIndexedByStage = tasks.reduce<{ [stage: Task["stage"]]: Task[] }>(
  (acc, task) => ({
    ...acc,
    [task.stage]: acc[task.stage] ? [...acc[task.stage], task] : [task],
  }),
  {}
);

function App() {
  const [completedIds, setCompletedIds] = useState<Task["id"][]>([]);

  const handleTaskToggle = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    ({ currentTarget }) =>
      setCompletedIds((prevState) =>
        currentTarget.checked
          ? [...prevState, currentTarget.value]
          : prevState.filter((id) => id !== currentTarget.value)
      ),
    []
  );

  return (
    <div className="card">
      <h1 className="card__title">My startup progress</h1>
      <ol className="list-ordered-circle">
        {stages.map((stage) => (
          <Stage
            key={stage.id}
            label={stage.name}
            isCompleted={false}
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
