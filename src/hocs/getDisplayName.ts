import type { ComponentType } from "react";

export function getDisplayName<P>(Component: ComponentType<P>): string {
  return Component.displayName || Component.name || "Component";
}
