"use client";

import { useState } from "react";
import axios from "axios";
import SearchForm from "@/components/SearchForm";
import styles from "../styles/search.module.css";

interface GoogleResult {
  title: string;
  link: string;
  snippet: string;
}

export default function SearchPage() {
  const [results, setResults] = useState<GoogleResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      // Llamamos a nuestro backend en /search-google
      const { data } = await axios.get<GoogleResult[]>(
        "http://localhost:3001/search-google",
        {
          params: { q: query },
        }
      );
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Error buscando resultados. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Búsqueda</h1>

        {/* Formulario de Búsqueda */}
        <SearchForm onSearch={handleSearch} loading={loading} />

        {/* Mensaje de Error */}
        {error && <p className={styles.errorMessage}>{error}</p>}

        {/* Resultados */}
        <div className={styles.resultsContainer}>
          {loading && (
            <p className={styles.loadingText}>Cargando resultados...</p>
          )}

          {!loading && results.length > 0 ? (
            <div className={styles.resultsGrid}>
              {results.map((item, index) => (
                <div key={index} className={styles.resultCard}>
                  <h2>{item.title}</h2>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    {item.link}
                  </a>
                  <p>{item.snippet}</p>

                  {/* Botón para agregar a favoritos */}
                  <button
                    onClick={async () => {
                      try {
                        await axios.post("http://localhost:3001/favorites", {
                          item, // item es { title, link, snippet }
                        });
                        alert("Guardado en favoritos");
                      } catch (err) {
                        console.error(err);
                        alert("Error al guardar en favoritos");
                      }
                    }}
                    style={{
                      marginTop: "0.5rem",
                      backgroundColor: "#10b981",
                      color: "#fff",
                      borderRadius: "4px",
                      padding: "0.5rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Agregar a Favoritos
                  </button>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <p className={styles.noResults}>No se encontraron resultados</p>
            )
          )}
        </div>
      </div>
    </main>
  );
}
