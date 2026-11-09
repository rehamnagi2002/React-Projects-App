import { STATUS_LABELS } from "../../projectStatus";
import type { Project } from "../../types";

const dateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "UTC", // dates are YYYY-MM-DD, parsed as UTC
});

function formatDate(value: string) {
  return dateFormat.format(new Date(value));
}

export default function ProjectDetails({
  project,
}: {
  project: Project | null;
}) {
  if (!project) {
    return <p>Project not found</p>;
  }

  return (
    <article>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <dl>
        <dt>Status</dt>
        <dd>{STATUS_LABELS[project.status]}</dd>
        <dt>Owner</dt>
        <dd>{project.ownerName}</dd>
        <dt>Start date</dt>
        <dd>{formatDate(project.startDate)}</dd>
        <dt>Due date</dt>
        <dd>{formatDate(project.dueDate)}</dd>
      </dl>
    </article>
  );
}
