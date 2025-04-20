"use client";

interface Property {
  title: string;
  location: string;
  type: string;
  mode: string;
  price: number;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col justify-between">
      <h2 className="font-bold text-lg mb-2">{property.title}</h2>
      <p className="text-gray-600">Ubicación: {property.location}</p>
      <p className="text-gray-600">Tipo: {property.type}</p>
      <p className="text-gray-600">Modalidad: {property.mode}</p>
      <p className="font-semibold mt-2">Precio: ${property.price}</p>
    </div>
  );
}
