interface TaskProps {
  id: Task["id"];
  children: React.ReactNode;
  isCompleted: boolean;
  isDisabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Task({
  id,
  isCompleted,
  isDisabled,
  onChange,
  children: label,
}: TaskProps) {
  return (
    <li>
      <input
        id={id}
        type="checkbox"
        checked={isCompleted}
        value={id}
        onChange={onChange}
        disabled={isDisabled}
      />
      <label htmlFor={id}>{label}</label>
    </li>
  );
}

export default Task;
