import { fetchProjects } from "../../api/mockApi";
import { useFetch } from "../../hooks/useFetch";
import { withLoading } from "../../hocs/withLoading";
import { PROJECT_STATUSES, STATUS_LABELS } from "../../projectStatus";
import type { Project } from "../../types";
import ErrorMessage from "../common/ErrorMessage";

function StatusCounts({ projects }: { projects: Project[] }) {
  return (
    <ul>
      {PROJECT_STATUSES.map((status) => (
        <li key={status}>
          {STATUS_LABELS[status]}:{" "}
          {projects.filter((p) => p.status === status).length}
        </li>
      ))}
    </ul>
  );
}

const StatusCountsWithLoading = withLoading(StatusCounts);

function Overview() {
  const [state, retry] = useFetch(fetchProjects);

  if (state.status === "error") {
    return <ErrorMessage message={state.error} onRetry={retry} />;
  }

  return (
    <StatusCountsWithLoading
      isLoading={state.status === "loading"}
      projects={state.status === "ready" ? state.data : []}
    />
  );
}

export default Overview;
