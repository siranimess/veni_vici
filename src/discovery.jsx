export const API_URL = "https://pokeapi.co/api/v2";

export function formatName(name) {
  return name.replaceAll("-", " ");
}

export async function fetchJSON(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(12000),
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}). Please try again.`);
  }

  return response.json();
}

export function formatPokemon(data) {
  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other?.["official-artwork"]?.front_default ||
      data.sprites.front_default,
    types: data.types.map((entry) => entry.type.name),
    abilities: data.abilities.map((entry) => entry.ability.name),
    height: data.height / 10,
    weight: data.weight / 10,
  };
}

export function isBanned(pokemon, bans) {
  return bans.some((ban) => {
    if (ban.category === "type") {
      return pokemon.types.includes(ban.value);
    }

    if (ban.category === "ability") {
      return pokemon.abilities.includes(ban.value);
    }

    return false;
  });
}

export function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const timer = setTimeout(() => {
      reject(new Error("Image loading timed out. Please try again."));
    }, 12000);

    image.onload = () => {
      clearTimeout(timer);
      resolve();
    };

    image.onerror = () => {
      clearTimeout(timer);
      reject(new Error("Unable to load the image. Please try again."));
    };

    image.src = url;
  });
}