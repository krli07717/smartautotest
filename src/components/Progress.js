function ProgressBar({ value }) {
  return (
    <div className="flex gap-2 items-center">
      <span>{value}%</span>
      <progress className="flex-1" value={value} max="100"></progress>
    </div>
  );
}

export { ProgressBar };
