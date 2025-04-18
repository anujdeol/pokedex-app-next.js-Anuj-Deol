import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const types = [
    "grass",
    "fire",
    "water",
    "electric",
    "bug",
    "normal",
    "poison",
    "flying",
    "ground",
    "fighting",
    "ghost",
    "rock",
    "psychic",
  ];

  const typeMap: Record<string, number> = {};
  for (const typeName of types) {
    const type = await prisma.pokemonType.upsert({
      where: { name: typeName },
      update: {},
      create: { name: typeName },
    });
    typeMap[typeName] = type.id;
  }

  // Pokemon data
  const pokemons = [
    {
      name: "Bulbasaur",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      types: ["grass", "poison"],
    },
    {
      name: "Charmander",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      types: ["fire"],
    },
    {
      name: "Squirtle",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
      types: ["water"],
    },
    {
      name: "Pikachu",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      types: ["electric"],
    },
    {
      name: "Jigglypuff",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
      types: ["normal"],
    },
    {
      name: "Meowth",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
      types: ["normal"],
    },
    {
      name: "Psyduck",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",
      types: ["water"],
    },
    {
      name: "Machop",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png",
      types: ["fighting"],
    },
    {
      name: "Magnemite",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png",
      types: ["electric"],
    },
    {
      name: "Gastly",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png",
      types: ["ghost", "poison"],
    },
    {
      name: "Onix",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png",
      types: ["rock", "ground"],
    },
    {
      name: "Eevee",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
      types: ["normal"],
    },
    {
      name: "Snorlax",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
      types: ["normal"],
    },
    {
      name: "Mewtwo",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
      types: ["psychic"],
    },
  ];

  for (const pokemon of pokemons) {
    const createdPokemon = await prisma.pokemon.create({
      data: {
        name: pokemon.name,
        sprite: pokemon.sprite,
      },
    });

    for (const type of pokemon.types) {
      await prisma.pokemonTypeOnPokemon.create({
        data: {
          pokemonId: createdPokemon.id,
          typeId: typeMap[type],
        },
      });
    }
  }

  console.log("Database seeded!");
}

main()
  .catch((e) => {
    console.error(" Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
