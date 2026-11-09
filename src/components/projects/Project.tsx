import { useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchProject } from "../../api/mockApi";
import { useFetch } from "../../hooks/useFetch";
import { withLoading } from "../../hocs/withLoading";
import ErrorMessage from "../common/ErrorMessage";
import ProjectDetails from "./ProjectDetails";

const ProjectDetailsWithLoading = withLoading(ProjectDetails);

function Project() {
  const { projectId = "" } = useParams();
  const fetcher = useCallback(() => fetchProject(projectId), [projectId]);
  const [state, retry] = useFetch(fetcher);
  const navigate = useNavigate();
  const location = useLocation();

  function handleBack() {
    // "default" key means this was the first entry in the session.
    if (location.key !== "default") navigate(-1);
    else navigate("/dashboard/projects");
  }

  return (
    <div>
      <button type="button" onClick={handleBack}>
        Back
      </button>
      {state.status === "error" ? (
        <ErrorMessage message={state.error} onRetry={retry} />
      ) : (
        <ProjectDetailsWithLoading
          isLoading={state.status === "loading"}
          project={state.status === "ready" ? state.data : null}
        />
      )}
    </div>
  );
}

export default Project;
