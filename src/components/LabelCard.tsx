"use client";

import Image from "next/image";
import { Student } from "@/types/student";

interface LabelCardProps {
  student: Student;
  size?: "preview" | "print";
  className?: string;
}

const DOTS_COUNT = 14;

export default function LabelCard({ student, size = "preview", className = "" }: LabelCardProps) {
  const isPrint = size === "print";
  const width = isPrint ? 400 : 340;
  const height = isPrint ? 160 : 136;
  const photoSize = isPrint ? 90 : 76;
  const nameFontSize = isPrint ? "1.5rem" : "1.25rem";

  return (
    <div
      className={`relative flex items-center overflow-hidden rounded-xl border-2 border-gray-700 bg-[#f5f0e8] ${className}`}
      style={{ width, height, minWidth: width, minHeight: height }}
    >
      {/* Name */}
      <div className="flex flex-1 flex-col justify-center px-4 pb-5">
        <span
          className="font-black leading-tight text-gray-900"
          style={{ fontSize: nameFontSize, wordBreak: "break-word" }}
        >
          {student.name}
        </span>
      </div>

      {/* Photo */}
      <div
        className="mr-3 flex-shrink-0 overflow-hidden rounded-md border border-gray-400"
        style={{ width: photoSize, height: photoSize }}
      >
        {student.photoDataUrl ? (
          <Image
            src={student.photoDataUrl}
            alt={student.name}
            width={photoSize}
            height={photoSize}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        )}
      </div>

      {/* Decorative dots */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-1 px-3 py-1">
        {Array.from({ length: DOTS_COUNT }).map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 flex-shrink-0 rounded-full"
            style={{
              backgroundColor: `hsl(${(i * 25) % 360}, 40%, 65%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
