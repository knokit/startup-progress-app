import "./App.css";
import { stages, tasks } from "./data";

const tasksIndexedByStage = tasks.reduce<{ [stage: Task["stage"]]: Task[] }>(
  (acc, task) => ({
    ...acc,
    [task.stage]: acc[task.stage] ? [...acc[task.stage], task] : [task],
  }),
  {}
);

function App() {
  return (
    <div className="card">
      <h1 className="card__title">My startup progress</h1>
      <ul>
        {stages.map((stage) => (
          <li key={stage.id}>
            <h3>{stage.name}</h3>
            <ul>
              {tasksIndexedByStage[stage.id].map((task) => (
                <li key={task.id}>{task.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
