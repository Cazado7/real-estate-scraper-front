"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const Block = styled("div")<{ h: number }>(({ theme, h }) => ({
  height: h,
  background: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
}));

export default function SkeletonGrid() {
  return (
    <>
      <Grid item xs={12}>
        <Block h={14} />
      </Grid>
      <Grid item xs={12}>
        <Block h={14} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Block h={100} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Block h={100} />
      </Grid>
      <Grid item xs={12}>
        <Block h={150} />
      </Grid>
      <Grid item xs={12}>
        <Block h={14} />
      </Grid>
      {[...Array(4)].map((_, i) => (
        <Grid item xs={6} md={3} key={i}>
          <Block h={100} />
        </Grid>
      ))}
    </>
  );
}
