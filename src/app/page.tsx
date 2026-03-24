"use client";

import { useState } from "react";
import { useStudents } from "@/hooks/useStudents";
import { usePrint } from "@/hooks/usePrint";
import Dashboard from "@/components/Dashboard";
import PrintSheet from "@/components/PrintSheet";

export default function Home() {
  const { students, addStudent, removeStudent, selectedIds, toggleSelect, selectAll, selectedStudents } =
    useStudents();
  const { isExporting, handleExportPdf } = usePrint();
  const [showPrint, setShowPrint] = useState(false);

  const studentsForPrint = selectedStudents.length > 0 ? selectedStudents : students;

  return (
    <>
      {showPrint ? (
        <PrintSheet
          students={studentsForPrint}
          onClose={() => setShowPrint(false)}
          onExportPdf={handleExportPdf}
          isExporting={isExporting}
        />
      ) : (
        <Dashboard
          students={students}
          selectedIds={selectedIds}
          onAdd={addStudent}
          onRemove={removeStudent}
          onToggleSelect={toggleSelect}
          onSelectAll={selectAll}
          onPrint={() => setShowPrint(true)}
        />
      )}
    </>
  );
}
