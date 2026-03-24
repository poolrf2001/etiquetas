"use client";

import { useRef } from "react";
import { Student } from "@/types/student";
import LabelCard from "@/components/LabelCard";

interface PrintSheetProps {
  students: Student[];
  onClose: () => void;
  onExportPdf: (ref: HTMLElement) => void;
  isExporting: boolean;
}

export default function PrintSheet({ students, onClose, onExportPdf, isExporting }: PrintSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    if (sheetRef.current) onExportPdf(sheetRef.current);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-gray-100">
      {/* Toolbar — hidden on print */}
      <div className="no-print flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
          <span className="text-sm text-gray-500">
            {students.length} etiqueta{students.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isExporting ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
                </svg>
                Exportando...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Exportar PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scrollable preview */}
      <div className="no-print flex-1 overflow-auto p-6">
        <div className="mx-auto w-fit">
          <PrintableContent ref={sheetRef} students={students} />
        </div>
      </div>

      {/* The actual print target */}
      <div className="print-only">
        <PrintableContent students={students} />
      </div>
    </div>
  );
}

// Separate component so we can ref it for html2canvas and also render it for print
import { forwardRef } from "react";

const LABELS_PER_PAGE = 7;

const PrintableContent = forwardRef<HTMLDivElement, { students: Student[] }>(
  ({ students }, ref) => {
    // Chunk students into pages of 7
    const pages: Student[][] = [];
    for (let i = 0; i < students.length; i += LABELS_PER_PAGE) {
      pages.push(students.slice(i, i + LABELS_PER_PAGE));
    }

    return (
      <div ref={ref} id="print-sheet">
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            style={{
              width: "210mm",
              height: "297mm",
              paddingTop: "9mm",
              paddingBottom: "9mm",
              paddingLeft: "0",
              paddingRight: "0",
              boxSizing: "border-box",
              backgroundColor: "white",
              pageBreakAfter: pageIndex < pages.length - 1 ? "always" : "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3mm",
            }}
          >
            {page.map((student) => (
              <LabelCard key={student.id} student={student} size="print" />
            ))}
          </div>
        ))}
      </div>
    );
  }
);
PrintableContent.displayName = "PrintableContent";
