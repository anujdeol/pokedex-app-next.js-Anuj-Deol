import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "../prisma";
export const pokemonRouter = router({
  // Get a single Pokémon by name
  get: publicProcedure.input(z.string()).query(async ({ input: name }) => {
    try {
      const pokemon = await prisma.pokemon.findUnique({
        where: { name },
        include: {
          types: { include: { type: true } },
        },
      });

      if (!pokemon) return null;

      return {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprite,
        types: pokemon.types.map((t) => t.type.name),
      };
    } catch (error) {
      console.error("Error fetching single Pokémon: ", error);
      throw new Error("Failed to fetch Pokémon data");
    }
  }),

  // Get multiple Pokémon by names
  getMany: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ input: names }) => {
      console.log("Querying pokemons with names:", names);
      const pokemons = await prisma.pokemon.findMany({
        where: { name: { in: names } },
        include: { types: { include: { type: true } } },
      });

      console.log("Fetched Pokemons1:", names);
      return pokemons.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprite,
        types: pokemon.types.map((t) => t.type.name),
      }));
    }),

  getTypes: publicProcedure.query(async () => {
    const types = await prisma.pokemonType.findMany({
      select: { name: true },
    });
    return types.map((t) => t.name);
  }),

  // Inside tRPC router
  getPaginated: publicProcedure
    .input(z.object({ page: z.number(), pageSize: z.number() }))
    .query(async ({ input }) => {
      const { page, pageSize } = input;
      const [pokemons, totalCount] = await Promise.all([
        prisma.pokemon.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: { types: { include: { type: true } } },
        }),
        prisma.pokemon.count(),
      ]);

      return {
        pokemons: pokemons.map((p) => ({
          id: p.id,
          name: p.name,
          sprite: p.sprite,
          types: p.types.map((t) => t.type.name),
        })),
        totalCount,
      };
    }),

  // Get Pokémon by type or get all available types if no type is selected
  getByType: publicProcedure
    .input(z.string().optional())
    .query(async ({ input: selectedType }) => {
      if (!selectedType || selectedType === "all") {
        const pokemons = await prisma.pokemon.findMany({
          include: { types: { include: { type: true } } },
        });

        return pokemons.map((p) => ({
          id: p.id,
          name: p.name,
          sprite: p.sprite,
          types: p.types.map((t) => t.type.name),
        }));
      }

      const pokemons = await prisma.pokemon.findMany({
        where: { types: { some: { type: { name: selectedType } } } },
        include: { types: { include: { type: true } } },
      });

      return pokemons.map((p) => ({
        id: p.id,
        name: p.name,
        sprite: p.sprite,
        types: p.types.map((t) => t.type.name),
      }));
    }),
});
