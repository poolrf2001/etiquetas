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

  return (
    <div
      className={`relative flex items-center overflow-hidden ${className}`}
      style={{
        width: isPrint ? "133.22mm" : 340,
        height: isPrint ? "37.27mm" : 110,
        ...(!isPrint && { minWidth: 340, minHeight: 110 }),
        boxSizing: "border-box",
        backgroundColor: "#f5f0e8",
        border: isPrint ? "0.8mm solid #4b5563" : "3px solid #4b5563",
        borderRadius: isPrint ? "3mm" : "0.75rem",
        flexShrink: 0,
      }}
    >
      {/* Decorative oval dots — behind text, vertically centred, same height as photo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: isPrint ? "3mm" : "0.75rem",
          right: isPrint ? "33mm" : 84,
          display: "flex",
          alignItems: "center",
          gap: isPrint ? "1.5mm" : "4px",
          zIndex: 0,
          opacity: 0.55,
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: DOTS_COUNT }).map((_, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: isPrint ? "3mm" : 7,
              height: isPrint ? "31.56mm" : 92,
              borderRadius: "50%",
              backgroundColor: `hsl(${(i * 25) % 360}, 40%, 62%)`,
            }}
          />
        ))}
      </div>

      {/* Name */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: isPrint ? "4mm" : "1rem",
          paddingRight: isPrint ? "2mm" : "0.5rem",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: isPrint ? "4.2rem" : "2.4rem",
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
          width: isPrint ? "27.81mm" : 68,
          height: isPrint ? "31.56mm" : 92,
          marginRight: isPrint ? "2mm" : "0.75rem",
          flexShrink: 0,
          overflow: "hidden",
          border: isPrint ? "0.6mm solid #6b7280" : "1.5px solid #9ca3af",
          borderRadius: isPrint ? "1.5mm" : "0.375rem",
          zIndex: 1,
        }}
      >
        {student.photoDataUrl ? (
          <Image
            src={student.photoDataUrl}
            alt={student.name}
            width={isPrint ? 105 : 68}
            height={isPrint ? 119 : 92}
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
    </div>
  );
}
