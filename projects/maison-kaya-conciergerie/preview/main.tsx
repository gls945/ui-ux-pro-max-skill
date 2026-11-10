/**
 * Aperçu statique (sans serveur) : même code que le site, rendu côté navigateur,
 * navigation interne (sans changer l adresse) pour fonctionner sur n'importe quel hébergement de fichiers.
 * Les formulaires n'y sont pas branchés à la base de données.
 */
import { createRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createRouter, createMemoryHistory } from "@tanstack/react-router";
import { routeTree } from "../src/routeTree.gen";
import "../src/styles.css";

const router = createRouter({
  routeTree,
  history: createMemoryHistory({ initialEntries: ["/"] }),
  context: { queryClient: new QueryClient() },
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
