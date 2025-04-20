// src/app/page.tsx
import { redirect } from "next/navigation";
import { REDIRECT_PATH } from "@/config/appConfig";

export default function HomePage() {
  redirect(REDIRECT_PATH);
}
