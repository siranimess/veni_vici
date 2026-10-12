import { useRef, useState } from "react";

import {
  API_URL,
  fetchJSON,
  formatName,
  formatPokemon,
  isBanned,
  preloadImage,
  shuffle,
} from "./discovery.jsx";

import "./App.css";

export default function VeniVici() {
  const [pokemon, setPokemon] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);
  const [collectionSize, setCollectionSize] = useState(151);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cache = useRef(new Map());
  const requestInProgress = useRef(false);

  function toggleBan(category, value) {
    setBanList((previous) => {
      const exists = previous.some(
        (ban) => ban.category === category && ban.value === value
      );

      if (exists) {
        return previous.filter(
          (ban) => !(ban.category === category && ban.value === value)
        );
      }

      return [...previous, { category, value }];
    });
  }

  async function discoverPokemon() {
    if (requestInProgress.current) return;

    requestInProgress.current = true;
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        limit: String(collectionSize),
        offset: "0",
      });

      // Every Discover click makes a fetch request.
      const catalogue = await fetchJSON(`${API_URL}/pokemon?${params}`);

      const recentIds = new Set(
        history.slice(0, 15).map((item) => item.id)
      );

      const candidates = shuffle(catalogue.results).filter((entry) => {
        const saved = cache.current.get(entry.url);

        return (
          !saved ||
          (saved.id !== pokemon?.id && !isBanned(saved, banList))
        );
      });

      // Prefer Pokémon outside the latest 15 discoveries.
      candidates.sort((a, b) => {
        const firstId = cache.current.get(a.url)?.id;
        const secondId = cache.current.get(b.url)?.id;

        return (
          Number(recentIds.has(firstId)) -
          Number(recentIds.has(secondId))
        );
      });

      // Stop after 40 candidates to avoid an endless search.
      for (const entry of candidates.slice(0, 40)) {
        let nextPokemon = cache.current.get(entry.url);

        if (!nextPokemon) {
          const details = await fetchJSON(entry.url);
          nextPokemon = formatPokemon(details);
          cache.current.set(entry.url, nextPokemon);
        }

        if (
          !nextPokemon.image ||
          nextPokemon.id === pokemon?.id ||
          isBanned(nextPokemon, banList)
        ) {
          continue;
        }

        // Only display the result when its image has loaded.
        await preloadImage(nextPokemon.image);

        setPokemon(nextPokemon);
        setHistory((previous) => [nextPokemon, ...previous]);

        return;
      }

      setError(
        "No match found in this search. Remove a ban, expand the collection, or try again."
      );
    } catch (err) {
      setError(
        err.name === "TimeoutError"
          ? "The request timed out. Please try again."
          : err.message || "Unable to connect. Please try again."
      );
    } finally {
      requestInProgress.current = false;
      setLoading(false);
    }
  }

  function renderAttribute(category, value) {
    const banned = banList.some(
      (ban) => ban.category === category && ban.value === value
    );

    return (
      <button
        key={`${category}-${value}`}
        className={`attribute-button ${banned ? "banned" : ""}`}
        onClick={() => toggleBan(category, value)}
        disabled={loading}
        aria-pressed={banned}
        aria-label={`${banned ? "Unban" : "Ban"} ${category}: ${formatName(value)}`}
      >
        {formatName(value)}
        <span aria-hidden="true">{banned ? " ×" : " +"}</span>
      </button>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-icon">V.</span>
          <span>Veni Vici</span>
        </div>

        <span className="header-label">POKÉMON FIELD NOTES</span>
      </header>

      <section className="intro">
        <p className="eyebrow">EXPLORE SOMETHING NEW</p>

        <h1>
          Meet your next
          <br />
          <em>unexpected discovery.</em>
        </h1>

        <p>
          Discover random Pokémon and learn about their attributes.
          Click a type or ability to filter it out of future discoveries.
        </p>
      </section>

      <main className="main-layout">
        <section
          className="discovery-card"
          aria-label="Current discovery"
          aria-busy={loading}
        >
          <div className="card-heading">
            <p className="eyebrow">YOUR DISCOVERY</p>
            <span>{history.length} discoveries</span>
          </div>

          {pokemon ? (
            <>
              <div className="image-container">
                <span className="pokemon-number">
                  #{String(pokemon.id).padStart(3, "0")}
                </span>

                <img
                  className="pokemon-image"
                  src={pokemon.image}
                  alt={formatName(pokemon.name)}
                />
              </div>

              <h2 className="pokemon-name">
                {formatName(pokemon.name)}
              </h2>

              <div className="attributes">
                <div>
                  <h3>Type</h3>

                  <div className="attribute-list">
                    {pokemon.types.map((type) =>
                      renderAttribute("type", type)
                    )}
                  </div>
                </div>

                <div>
                  <h3>Ability</h3>

                  <div className="attribute-list">
                    {pokemon.abilities.map((ability) =>
                      renderAttribute("ability", ability)
                    )}
                  </div>
                </div>
              </div>

              <div className="measurements">
                <div>
                  <span>Height</span>
                  <strong>{pokemon.height} m</strong>
                </div>

                <div>
                  <span>Weight</span>
                  <strong>{pokemon.weight} kg</strong>
                </div>
              </div>
            </>
          ) : (
            <div className="welcome">
              <div className="question-mark">?</div>
              <h2>A world of possibilities</h2>
              <p>Click Discover to meet your first Pokémon.</p>
            </div>
          )}

          <div className="controls">
            <label htmlFor="collection">
              Collection

              <select
                id="collection"
                value={collectionSize}
                onChange={(event) =>
                  setCollectionSize(Number(event.target.value))
                }
                disabled={loading}
              >
                <option value={151}>Original 151</option>
                <option value={386}>First 386</option>
                <option value={1010}>First 1,010</option>
              </select>
            </label>

            <button
              className="discover-button"
              onClick={discoverPokemon}
              disabled={loading}
            >
              {loading ? "Discovering..." : "Discover ↗"}
            </button>
          </div>

          <p className="helper-text" role="status">
            {loading
              ? "Searching for a Pokémon that matches your filters..."
              : "Click a type or ability to add it to your ban list."}
          </p>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
        </section>

        <aside className="ban-card">
          <p className="eyebrow">MAKE IT YOURS</p>

          <div className="ban-heading">
            <h2>Ban list</h2>
            <span className="ban-count">{banList.length}</span>
          </div>

          <p>
            Future discoveries will skip Pokémon with these types
            or abilities.
          </p>

          {banList.length === 0 ? (
            <div className="empty-bans">
              <span>＋</span>
              <h3>Nothing banned yet</h3>
              <p>Click an attribute on a discovery to add it here.</p>
            </div>
          ) : (
            <>
              <div className="ban-list">
                {banList.map((ban) => (
                  <button
                    key={`${ban.category}-${ban.value}`}
                    className="ban-item"
                    onClick={() => toggleBan(ban.category, ban.value)}
                    disabled={loading}
                    aria-label={`Remove ${ban.category}: ${formatName(ban.value)}`}
                  >
                    <span>
                      <small>{ban.category}</small>
                      {formatName(ban.value)}
                    </span>

                    <span aria-hidden="true">×</span>
                  </button>
                ))}
              </div>

              <button
                className="clear-button"
                onClick={() => setBanList([])}
                disabled={loading}
              >
                Clear all bans
              </button>
            </>
          )}

          <p className="ban-note">
            Click a banned value to remove it. Existing discoveries
            stay in your history.
          </p>
        </aside>
      </main>

      <section className="history-section">
        <div className="history-heading">
          <div>
            <p className="eyebrow">COLLECTED ALONG THE WAY</p>
            <h2>Your discovery history</h2>
          </div>

          <span>This session only</span>
        </div>

        {history.length < 2 ? (
          <p className="empty-history">
            Previous discoveries will appear here as you explore.
          </p>
        ) : (
          <div className="history-grid">
            {history.slice(1).map((item, index) => (
              <article
                className="history-card"
                key={`${item.id}-${index}`}
              >
                <img
                  src={item.image}
                  alt={formatName(item.name)}
                  loading="lazy"
                />

                <div>
                  <h3>{formatName(item.name)}</h3>
                  <p>{item.types.map(formatName).join(" · ")}</p>
                  <p>
                    {item.height} m · {item.weight} kg
                  </p>
                  <p>{item.abilities.map(formatName).join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer>
        <span>Veni Vici · CodePath WEB102</span>

        <a
          href="https://pokeapi.co/"
          target="_blank"
          rel="noreferrer"
        >
          Powered by PokéAPI
        </a>
      </footer>
    </div>
  );
}