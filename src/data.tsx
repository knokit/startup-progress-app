import { Stage, Task } from "./types";


const stages: Stage[] = [
  {
    id: "stage-1",
    name: "Foundation",
  },
  {
    id: "stage-2",
    name: "Discovery",
  },
  {
    id: "stage-3",
    name: "Delivery",
  },
];

const tasks: Task[] = [
  {
    id: "stage-1-task-1",
    stage: "stage-1",
    name: "Setup virtual office",
  },
  {
    id: "stage-1-task-2",
    stage: "stage-1",
    name: "Set mission & vision",
  },
  {
    id: "stage-1-task-3",
    stage: "stage-1",
    name: "Select business name",
  },
  {
    id: "stage-1-task-4",
    stage: "stage-1",
    name: "Buy domains",
  },
  {
    id: "stage-2-task-1",
    stage: "stage-2",
    name: "Create roadmap",
  },
  {
    id: "stage-2-task-2",
    stage: "stage-2",
    name: "Competitor analysis",
  },
  {
    id: "stage-3-task-1",
    stage: "stage-3",
    name: "Release marketing website",
  },
  {
    id: "stage-3-task-2",
    stage: "stage-3",
    name: "Release MVP",
  },
];

export { stages, tasks };