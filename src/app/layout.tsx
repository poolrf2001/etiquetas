import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Etiquetas Escolares",
  description: "Crea e imprime etiquetas para alumnos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
