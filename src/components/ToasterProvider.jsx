"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "rgba(15,23,42,.92)",
          color: "#f8fafc",
          border: "1px solid rgba(167,139,250,.35)",
          backdropFilter: "blur(8px)",
          padding: "12px 16px",
          borderRadius: "12px",
          fontWeight: 500,
        },
      }}
    />
  );
}
