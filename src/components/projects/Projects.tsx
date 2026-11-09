import { useSearchParams } from "react-router-dom";
import { fetchProjects } from "../../api/mockApi";
import { useCompactList } from "../../hooks/useCompactList";
import { useFetch } from "../../hooks/useFetch";
import { withLoading } from "../../hocs/withLoading";
import { isProjectStatus } from "../../projectStatus";
import ErrorMessage from "../common/ErrorMessage";
import ProjectList from "./ProjectList";

const ProjectListWithLoading = withLoading(ProjectList);

function Projects() {
  const [state, retry] = useFetch(fetchProjects);
  const [searchParams, setSearchParams] = useSearchParams();
  const [compact] = useCompactList();

  const statusParam = searchParams.get("status");
  const status = isProjectStatus(statusParam) ? statusParam : "";
  const query = searchParams.get("q") ?? "";

  // Updates one param and keeps the others.
  function setParam(key: "status" | "q", value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  }

  if (state.status === "error") {
    return <ErrorMessage message={state.error} onRetry={retry} />;
  }

  return (
    <ProjectListWithLoading
      isLoading={state.status === "loading"}
      projects={state.status === "ready" ? state.data : []}
      status={status}
      query={query}
      compact={compact}
      onStatusChange={(value) => setParam("status", value)}
      onQueryChange={(value) => setParam("q", value)}
    />
  );
}

export default Projects;
