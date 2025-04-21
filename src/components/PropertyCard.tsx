// PropertyCard.tsx (o .jsx)
"use client";

import axios from "axios";

export default function PropertyCard({ property }: { property: any }) {
  const handleAddToFavorites = async () => {
    try {
      await axios.post("http://localhost:3001/favorites", {
        property,
      });
      alert("Propiedad guardada en favoritos");
    } catch (err) {
      console.error(err);
      alert("Error guardando la propiedad");
    }
  };

  return (
    <div className="border rounded p-4">
      <h2 className="font-bold text-lg">{property.title}</h2>
      <p>{property.location}</p>
      <p>{property.price}</p>
      <a
        href={property.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Ver Detalles
      </a>

      {/* Botón para guardar en favoritos */}
      <button
        onClick={handleAddToFavorites}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded block"
      >
        Agregar a Favoritos
      </button>
    </div>
  );
}
