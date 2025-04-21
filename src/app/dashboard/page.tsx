"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/dash.module.css";

interface FavoriteItem {
  title: string;
  link: string;
  snippet: string;
}

export default function DashboardPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get<FavoriteItem[]>(
          "http://localhost:3001/favorites"
        );
        setFavorites(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleRemove = async (link: string) => {
    try {
      await axios.delete("http://localhost:3001/favorites", {
        params: { link },
      });
      setFavorites((prev) => prev.filter((fav) => fav.link !== link));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar favorito");
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.description}>Tus búsquedas favoritas de Google.</p>

      {loading ? (
        <p>Cargando favoritos...</p>
      ) : favorites.length > 0 ? (
        <div className={styles.favsGrid}>
          {favorites.map((fav, i) => (
            <div key={i} className={styles.card}>
              <h2>{fav.title}</h2>
              <a
                href={fav.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                {fav.link}
              </a>
              <p>{fav.snippet}</p>
              <button onClick={() => handleRemove(fav.link)}>Eliminar</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes favoritos guardados</p>
      )}
    </main>
  );
}
