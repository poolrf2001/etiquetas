"use client";

import { useState, useRef, ChangeEvent } from "react";
import Modal from "@/components/ui/Modal";
import { Student } from "@/types/student";
import Image from "next/image";

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Omit<Student, "id" | "createdAt">) => void;
}

function centerCropToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const SIZE = 200;
        const canvas = document.createElement("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext("2d")!;
        const { width: w, height: h } = img;
        const side = Math.min(w, h);
        const sx = (w - side) / 2;
        const sy = (h - side) / 2;
        ctx.drawImage(img, sx, sy, side, side, 0, 0, SIZE, SIZE);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function StudentForm({ isOpen, onClose, onAdd }: StudentFormProps) {
  const [name, setName] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const dataUrl = await centerCropToBase64(file);
      setPhotoDataUrl(dataUrl);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), photoDataUrl });
    setName("");
    setPhotoDataUrl("");
    if (fileRef.current) fileRef.current.value = "";
    onClose();
  };

  const handleClose = () => {
    setName("");
    setPhotoDataUrl("");
    if (fileRef.current) fileRef.current.value = "";
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Agregar Alumno">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nombre del alumno <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            placeholder="Ej: María González"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Photo */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Foto del alumno</label>
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 hover:border-blue-400 hover:bg-blue-50"
            onClick={() => fileRef.current?.click()}
          >
            {photoDataUrl ? (
              <div className="relative h-24 w-24 overflow-hidden rounded-lg">
                <Image
                  src={photoDataUrl}
                  alt="Preview"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-sm text-gray-500">Haz clic para subir una foto</span>
              </>
            )}
            {loading && <span className="text-sm text-blue-500">Procesando imagen...</span>}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          {photoDataUrl && (
            <button
              type="button"
              onClick={() => {
                setPhotoDataUrl("");
                if (fileRef.current) fileRef.current.value = "";
              }}
              className="mt-1 text-xs text-red-500 hover:underline"
            >
              Quitar foto
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!name.trim() || loading}
            className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Guardar etiqueta
          </button>
        </div>
      </form>
    </Modal>
  );
}
