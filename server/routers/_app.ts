import { router } from "../trpc";
import { pokemonRouter } from "./pokemonRouter";

// Create the tRPC app router by combining individual routers
export const appRouter = router({
  pokemon: pokemonRouter,
});

// Export the type of the app router
export type AppRouter = typeof appRouter;
