import { tasks } from "./data";

const tasksIndexedByStage = tasks.reduce<{ [stage: Task["stage"]]: Task[] }>(
  (acc, task) => ({
    ...acc,
    [task.stage]: acc[task.stage] ? [...acc[task.stage], task] : [task],
  }),
  {}
);

const isStageCompleted = (stage: Stage, completedIds: Task["id"][]) =>
  getStageTasks(stage).every((task) => completedIds.includes(task.id));

const getStageTasks = (stage: Stage) => tasksIndexedByStage[stage.id];

const isAllTasksCompleted = (completedIds: Task["id"][]) =>
  Object.values(tasks)
    .flat()
    .every((task) => completedIds.includes(task.id));

export { isStageCompleted, getStageTasks, isAllTasksCompleted };
