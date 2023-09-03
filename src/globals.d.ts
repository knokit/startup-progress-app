interface Task {
  id: string;
  name: string;
  stage: Stage["id"];
}

interface Stage {
  id: string;
  name: string;
}