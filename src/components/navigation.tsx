import * as React from "react";
import RealEstateAgentIcon from "@mui/icons-material/RealEstateAgent";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import { Navigation } from "@toolpad/core/AppProvider";
import SearchIcon from "@mui/icons-material/Search";

export const NAVIGATION: Navigation = [
  { kind: "header", title: "Buscar propiedades" },
  { segment: "search", title: "Search", icon: <SearchIcon /> },
  { kind: "divider" },
  { kind: "header", title: "Main items" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },

  {
    segment: "propiedades",
    title: "Propiedades",
    icon: <RealEstateAgentIcon />,
    children: [
      { segment: "favoritos", title: "Favoritos", icon: <DescriptionIcon /> },
      {
        segment: "ultimas busquedas",
        title: "Ultimas busquedas",
        icon: <DescriptionIcon />,
      },
    ],
  },
  /* { segment: "integrations", title: "Integrations", icon: <LayersIcon /> }, */
];
