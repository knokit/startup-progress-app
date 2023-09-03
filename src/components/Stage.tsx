interface StageProps {
  label: Stage["name"];
  isCompleted: boolean;
  children: React.ReactNode;
}

function Stage({ label, isCompleted, children: tasks }: StageProps) {
  return (
    <li>
      <h3>
        {label} {isCompleted ? <>&#x2714;</> : null}
      </h3>
      <ul className="list-unstyled">{tasks}</ul>
    </li>
  );
}

export default Stage;
