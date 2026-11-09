import type { ProjectStatus } from "./types";

export const PROJECT_STATUSES: ProjectStatus[] = [
  "active",
  "on_hold",
  "completed",
];

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  active: "Active",
  on_hold: "On hold",
  completed: "Completed",
};

export function isProjectStatus(value: string | null): value is ProjectStatus {
  return PROJECT_STATUSES.some((status) => status === value);
}
