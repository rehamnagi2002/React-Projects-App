import { Link } from "react-router-dom";
import {
  isProjectStatus,
  PROJECT_STATUSES,
  STATUS_LABELS,
} from "../../projectStatus";
import type { Project, ProjectStatus } from "../../types";

interface ProjectListProps {
  projects: Project[];
  status: ProjectStatus | "";
  query: string;
  compact: boolean;
  onStatusChange: (status: ProjectStatus | "") => void;
  onQueryChange: (query: string) => void;
}

export default function ProjectList({
  projects,
  status,
  query,
  compact,
  onStatusChange,
  onQueryChange,
}: ProjectListProps) {
  const needle = query.trim().toLowerCase();
  const visible = projects.filter(
    (p) =>
      (!status || p.status === status) && p.name.toLowerCase().includes(needle),
  );

  return (
    <div>
      <div>
        <input
          type="search"
          aria-label="Search projects by name"
          placeholder="Search by name"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <select
          aria-label="Filter by status"
          value={status}
          onChange={(e) =>
            onStatusChange(
              isProjectStatus(e.target.value) ? e.target.value : "",
            )
          }
        >
          <option value="">All statuses</option>
          {PROJECT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      {visible.length === 0 ? (
        <p>No projects match.</p>
      ) : (
        <ul>
          {visible.map((p) => (
            <li key={p.id}>
              <Link to={`/dashboard/projects/${p.id}`}>{p.name}</Link>
              {compact ? (
                <span> ({STATUS_LABELS[p.status]})</span>
              ) : (
                <div>
                  <p>{p.description}</p>
                  <p>
                    {STATUS_LABELS[p.status]} · Owner: {p.ownerName}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
