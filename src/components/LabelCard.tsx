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

  // Preview dimensions (px)
  const previewWidth = 340;
  const previewHeight = 110;
  const previewPhotoW = 68;
  const previewPhotoH = 68;
  const previewFontSize = "2.4rem";
  const previewDotSize = 8;

  // Print dimensions (exact mm from design)
  // Card: 133.22mm × 37.27mm
  // Photo: 27.81mm × 31.56mm
  // Name cap-height: 12.62mm → font-size ~16mm → 1rem≈3.78mm → ~4.2rem

  return (
    <div
      className={`relative flex items-center overflow-hidden ${className}`}
      style={{
        width: isPrint ? "133.22mm" : previewWidth,
        height: isPrint ? "37.27mm" : previewHeight,
        ...(!isPrint && { minWidth: previewWidth, minHeight: previewHeight }),
        backgroundColor: "#f5f0e8",
        border: isPrint ? "1.5px solid #4b5563" : "2px solid #374151",
        borderRadius: isPrint ? "3mm" : "0.75rem",
        flexShrink: 0,
      }}
    >
      {/* Name */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: isPrint ? "4mm" : "1rem",
          paddingRight: isPrint ? "2mm" : "0.5rem",
          paddingBottom: isPrint ? "3mm" : "1rem",
        }}
      >
        <span
          style={{
            fontSize: isPrint ? "4.2rem" : previewFontSize,
            fontWeight: 900,
            lineHeight: isPrint ? "12.62mm" : 1.15,
            wordBreak: "break-word",
            color: "#111827",
          }}
        >
          {student.name}
        </span>
      </div>

      {/* Photo */}
      <div
        style={{
          width: isPrint ? "27.81mm" : previewPhotoW,
          height: isPrint ? "31.56mm" : previewPhotoH,
          marginRight: isPrint ? "2mm" : "0.75rem",
          flexShrink: 0,
          overflow: "hidden",
          border: "1px solid #9ca3af",
          borderRadius: isPrint ? "1.5mm" : "0.375rem",
        }}
      >
        {student.photoDataUrl ? (
          <Image
            src={student.photoDataUrl}
            alt={student.name}
            width={isPrint ? 105 : previewPhotoW}
            height={isPrint ? 119 : previewPhotoH}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ backgroundColor: "#e5e7eb", color: "#9ca3af" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        )}
      </div>

      {/* Decorative dots */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          gap: isPrint ? "1mm" : "4px",
          paddingLeft: isPrint ? "3mm" : "0.75rem",
          paddingBottom: isPrint ? "1mm" : "4px",
        }}
      >
        {Array.from({ length: DOTS_COUNT }).map((_, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: isPrint ? "2.5mm" : previewDotSize,
              height: isPrint ? "2.5mm" : previewDotSize,
              borderRadius: "50%",
              backgroundColor: `hsl(${(i * 25) % 360}, 40%, 65%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
