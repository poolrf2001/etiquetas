"use client";

import { useState } from "react";
import { Student } from "@/types/student";
import LabelCard from "@/components/LabelCard";
import StudentForm from "@/components/StudentForm";

interface DashboardProps {
  students: Student[];
  selectedIds: Set<string>;
  onAdd: (data: Omit<Student, "id" | "createdAt">) => void;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onPrint: () => void;
}

export default function Dashboard({
  students,
  selectedIds,
  onAdd,
  onRemove,
  onToggleSelect,
  onSelectAll,
  onPrint,
}: DashboardProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const allSelected = students.length > 0 && selectedIds.size === students.length;
  const printCount = selectedIds.size > 0 ? selectedIds.size : students.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Etiquetas Escolares</h1>
            <p className="text-sm text-gray-500">
              {students.length} alumno{students.length !== 1 ? "s" : ""} registrado{students.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-3">
            {students.length > 0 && (
              <button
                onClick={onPrint}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimir {selectedIds.size > 0 ? `(${selectedIds.size})` : "todos"}
              </button>
            )}
            <button
              onClick={() => setFormOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Agregar alumno
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-6">
        {students.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white py-20">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="mb-4 h-16 w-16 text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mb-2 text-lg font-medium text-gray-500">No hay alumnos registrados</p>
            <p className="mb-6 text-sm text-gray-400">Agrega tu primer alumno para comenzar a crear etiquetas</p>
            <button
              onClick={() => setFormOpen(true)}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Agregar primer alumno
            </button>
          </div>
        ) : (
          <>
            {/* Select all toolbar */}
            <div className="mb-4 flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {allSelected ? "Deseleccionar todos" : "Seleccionar todos"}
              </label>
              {selectedIds.size > 0 && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  {selectedIds.size} seleccionado{selectedIds.size !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Student grid */}
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {students.map((student) => (
                <div
                  key={student.id}
                  className={`group relative rounded-2xl border-2 bg-white p-4 shadow-sm transition-all ${
                    selectedIds.has(student.id)
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* Checkbox */}
                  <div className="mb-3 flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(student.id)}
                        onChange={() => onToggleSelect(student.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-800">{student.name}</span>
                    </label>
                    <button
                      onClick={() => setDeleteConfirm(student.id)}
                      className="rounded-full p-1 text-gray-300 hover:bg-red-50 hover:text-red-500"
                      title="Eliminar"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Label preview */}
                  <LabelCard student={student} size="preview" />
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteConfirm(null)} />
          <div className="relative z-10 rounded-2xl bg-white p-6 shadow-2xl">
            <p className="mb-4 text-gray-800">¿Eliminar esta etiqueta?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onRemove(deleteConfirm);
                  setDeleteConfirm(null);
                }}
                className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-medium text-white hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <StudentForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onAdd={onAdd}
      />
    </div>
  );
}
