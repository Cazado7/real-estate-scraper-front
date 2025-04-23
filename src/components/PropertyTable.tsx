"use client";
import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";

interface PropertyItem {
  id: number;
  title: string;
  location: string;
  price?: number;
  link: string;
}

export default function PropertyTable() {
  const [properties, setProperties] = React.useState<PropertyItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get<PropertyItem[]>("http://localhost:3001/properties")
      .then((res) => setProperties(res.data))
      .catch((err) => console.error("Error al obtener propiedades:", err))
      .finally(() => setLoading(false));
  }, []);

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "title", headerName: "Título", flex: 1.5, minWidth: 180 },
      { field: "location", headerName: "Ubicación", flex: 1, minWidth: 140 },
      {
        field: "price",
        headerName: "Precio",
        flex: 0.8,
        minWidth: 120,
        type: "number",
        valueFormatter: ({ value }) =>
          value ? `$ ${value.toLocaleString()}` : "",
      },
      {
        field: "link",
        headerName: "Enlace",
        flex: 1.2,
        minWidth: 180,
        renderCell: (params) => (
          <a
            href={params.value as string}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Ver propiedad
          </a>
        ),
      },
    ],
    []
  );

  const averagePrice = React.useMemo(() => {
    if (properties.length === 0) return 0;
    const sum = properties.reduce((acc, p) => acc + (p.price || 0), 0);
    return Math.round(sum / properties.length);
  }, [properties]);

  if (loading) return <CircularProgress />;

  return (
    <>
      <p>
        Precio promedio: <strong>${averagePrice.toLocaleString()}</strong>
      </p>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          bgcolor: "#005ba6",
          borderRadius: 2,
          [`& .${gridClasses.columnHeader}`]: { bgcolor: "#f5f5f5" },
        }}
      >
        <DataGrid
          rows={properties}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
          paginationModel={{ pageSize: 5, page: 0 }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          initialState={{
            filter: { filterModel: { items: [], quickFilterValues: [] } },
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
          }}
        />
      </Box>
    </>
  );
}
