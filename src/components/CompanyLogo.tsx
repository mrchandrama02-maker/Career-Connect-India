import React, { useState, useEffect } from "react";

interface CompanyLogoProps {
  logoUrl?: string;
  logoEmoji?: string;
  name: string;
  className?: string; // Outer container styles
  imgClassName?: string; // Image-specific styles
  sizeClassName?: string; // Text size for emoji fallback (e.g. text-3xl)
}

export default function CompanyLogo({
  logoUrl,
  logoEmoji,
  name,
  className = "w-16 h-16 bg-white p-2 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden shrink-0",
  imgClassName = "w-full h-full object-contain",
  sizeClassName = "text-3xl"
}: CompanyLogoProps) {
  const [hasError, setHasError] = useState(false);

  // Sync / reset error state when logoUrl changes so it tries loading the new URL
  useEffect(() => {
    setHasError(false);
  }, [logoUrl]);

  return (
    <div className={className}>
      {logoUrl && !hasError ? (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className={imgClassName}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className={`fallback-emoji ${sizeClassName}`}>{logoEmoji || "🏢"}</span>
      )}
    </div>
  );
}
