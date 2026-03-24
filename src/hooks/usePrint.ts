"use client";

import { useState, useCallback } from "react";
import { exportToPdf } from "@/lib/pdf";

export function usePrint() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPdf = useCallback(async (element: HTMLElement) => {
    setIsExporting(true);
    try {
      await exportToPdf(element, "etiquetas-escolares.pdf");
    } finally {
      setIsExporting(false);
    }
  }, []);

  return { isExporting, handleExportPdf };
}
