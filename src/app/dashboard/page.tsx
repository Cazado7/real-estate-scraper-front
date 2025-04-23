"use client";

import Grid from "@mui/material/Grid";
import PropertyTable from "@/components/PropertyTable";
import SkeletonGrid from "@/components/SkeletonGrid";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <Grid container spacing={2}>
        {/* bloque de datos reales */}

        <PropertyTable />

        {/* maqueta / placeholders adicionales */}
        <SkeletonGrid />
      </Grid>
    </DashboardShell>
  );
}
