import { useCompactList } from "../../hooks/useCompactList";

function Settings() {
  const [compact, setCompact] = useCompactList();

  return (
    <label>
      <input
        type="checkbox"
        checked={compact}
        onChange={(e) => setCompact(e.target.checked)}
      />{" "}
      Compact list
    </label>
  );
}

export default Settings;
