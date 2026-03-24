"use client";

import { useState, useEffect, useCallback } from "react";
import { Student } from "@/types/student";
import { getStudents, saveStudents } from "@/lib/storage";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const addStudent = useCallback((data: Omit<Student, "id" | "createdAt">) => {
    const newStudent: Student = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setStudents((prev) => {
      const updated = [...prev, newStudent];
      saveStudents(updated);
      return updated;
    });
  }, []);

  const removeStudent = useCallback((id: string) => {
    setStudents((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveStudents(updated);
      return updated;
    });
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === students.length) return new Set();
      return new Set(students.map((s) => s.id));
    });
  }, [students]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectedStudents = students.filter((s) => selectedIds.has(s.id));

  return {
    students,
    addStudent,
    removeStudent,
    selectedIds,
    toggleSelect,
    selectAll,
    clearSelection,
    selectedStudents,
  };
}
