"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Importa componentes de MUI
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// Estilos del dashboard (si usas .module.css ajusta según tu proyecto)
import styles from "../styles/dash.module.css";

interface FavoriteItem {
  title: string;
  link: string;
  snippet?: string;
  location?: string;
  price?: number;
}

export default function DashboardPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const [loadingProps, setLoadingProps] = useState(true);
  const [loadingSearches, setLoadingSearches] = useState(true);

  // Fetch de favoritos
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get<FavoriteItem[]>(
          "http://localhost:3001/favorites"
        );
        setFavorites(data);
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      } finally {
        setLoadingFavs(false);
      }
    };
    fetchFavorites();
  }, []);

  // Fetch de propiedades
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get<any[]>(
          "http://localhost:3001/properties"
        );
        setProperties(data);
      } catch (error) {
        console.error("Error al obtener propiedades:", error);
      } finally {
        setLoadingProps(false);
      }
    };
    fetchProperties();
  }, []);

  // Fetch de últimas 5 búsquedas
  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const { data } = await axios.get<string[]>(
          "http://localhost:3001/recent-searches"
        );
        setRecentSearches(data);
      } catch (error) {
        console.error("Error al obtener últimas búsquedas:", error);
      } finally {
        setLoadingSearches(false);
      }
    };
    fetchRecentSearches();
  }, []);

  // Eliminar favorito
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

  // Columnas para el DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, sortable: false },
    { field: "title", headerName: "Título", width: 200, sortable: false },
    { field: "location", headerName: "Ubicación", width: 150, sortable: false },
    {
      field: "price",
      headerName: "Precio",
      width: 120,
      sortable: true, // permitimos ordenar por precio
      valueFormatter: (params) => {
        const value = params.value as number;
        return value ? `$ ${value.toLocaleString()}` : "";
      },
    },
    {
      field: "link",
      headerName: "Enlace",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const linkVal = params.value as string;
        return (
          <a
            href={linkVal}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Ver Propiedad
          </a>
        );
      },
    },
  ];

  // Cálculo del precio promedio
  const averagePrice = React.useMemo(() => {
    if (properties.length === 0) return 0;
    const sum = properties.reduce((acc, prop) => acc + (prop.price || 0), 0);
    return Math.round(sum / properties.length);
  }, [properties]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.description}>Bienvenido(a) a tu panel de control.</p>

      {/* BLOQUE DE PROPIEDADES */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>Lista de Propiedades</h2>
        {loadingProps ? (
          <CircularProgress />
        ) : (
          <>
            <p>
              Precio promedio: <strong>${averagePrice.toLocaleString()}</strong>
            </p>
            <Box sx={{ height: 400, width: "100%", backgroundColor: "#fff" }}>
              <DataGrid
                rows={properties}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.id}
              />
            </Box>
          </>
        )}
      </section>

      {/* BLOQUE DE ULTIMAS BUSQUEDAS */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>Últimas 5 Búsquedas</h2>
        {loadingSearches ? (
          <CircularProgress />
        ) : recentSearches.length > 0 ? (
          <ul>
            {recentSearches.map((search, idx) => (
              <li key={idx}>
                <strong>{search}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay búsquedas recientes</p>
        )}
      </section>

      {/* BLOQUE DE FAVORITOS */}
      <section>
        <h2>Tus Favoritos</h2>
        {loadingFavs ? (
          <p>Cargando favoritos...</p>
        ) : favorites.length > 0 ? (
          <div className={styles.favsGrid}>
            {favorites.map((fav, i) => (
              <div key={i} className={styles.card}>
                <h3>{fav.title}</h3>
                <a
                  href={fav.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  {fav.link}
                </a>
                {/* Podrías condicionar si fav.snippet existe o si es propiedad */}
                {fav.snippet && <p>{fav.snippet}</p>}
                {fav.price && (
                  <p>
                    Precio: <strong>${fav.price.toLocaleString()}</strong>
                  </p>
                )}
                <button onClick={() => handleRemove(fav.link)}>Eliminar</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No tienes favoritos guardados</p>
        )}
      </section>
    </main>
  );
}
