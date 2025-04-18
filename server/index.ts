import { pokemonRouter } from "./routers/pokemonRouter";
import { router } from "./trpc";

export const appRouter = router({
  pokemon: pokemonRouter,
});

export type AppRouter = typeof appRouter;
