interface StageProps {
  label: Stage["name"];
  isCompleted: boolean;
  children: React.ReactNode;
  className?: string;
}

function Stage({ label, isCompleted, className, children: tasks }: StageProps) {
  return (
    <li className={className}>
      <h3 className="stage__title">
        {label} {isCompleted ? <div className="checkmark" /> : null}
      </h3>
      <ul className="list-unstyled">{tasks}</ul>
    </li>
  );
}

export default Stage;
