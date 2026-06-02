/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface CareerConnectLogoProps {
  className?: string;
  size?: number;
}

export default function CareerConnectLogo({ className = "h-10 w-10", size }: CareerConnectLogoProps) {
  return (
    <svg
      id="cci-logo-element"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Large Navy Blue Sweeping Left-Side Arc */}
      <path
        d="M55 182C22 153 10 110 22 72C33 39 60 16 93 10C125 4 158 17 180 37C152 24 114 22 82 34C50 47 31 77 37 115C43 153 69 183 98 195C82 195 67 190 55 182Z"
        fill="#0A2540"
      />

      {/* Saffron (Orange) Indian Flag Top Swish */}
      <path
        d="M68 46C100 24 133 20 166 38C138 16 102 16 70 35C53 45 42 58 37 70C40 59 51 52 68 46Z"
        fill="#FF9933"
      />

      {/* Dynamic Green Indian Flag Top Swish */}
      <path
        d="M74 57C106 37 139 35 169 51C143 31 108 29 76 46C62 54 53 66 49 77C51 68 62 62 74 57Z"
        fill="#128807"
      />

      {/* Navy Blue Chakra-Inspired Core Dot */}
      <circle cx="120" cy="40" r="5" fill="#000080" />

      {/* Strong Upward Navy Blue Progress Arrow */}
      <path
        d="M48 200C80 200 115 182 140 150L142 148C142 148 145 145 148 142L120 130L180 102L190 168L164 155L159 161C131 193 92 208 48 200Z"
        fill="#0A2540"
      />

      {/* Leaping Triumphant Business Professional in Sky Blue */}
      {/* Head */}
      <circle cx="94" cy="85" r="12" fill="#3BA3DB" />
      {/* Body / Arms / Legs Detail */}
      <path
        d="M94 99C85 99 76 104 67 111C55 120 45 129 37 138C35 141 38 144 41 142C49 137 60 130 68 125C76 119 79 117 81 121C79 139 74 158 70 176C66 195 59 213 49 228C48 230 52 232 54 229C67 210 77 190 85 170C93 150 98 137 104 141C108 145 113 149 117 153C119 155 122 153 120 150C115 143 109 135 104 128C102 125 104 124 106 122C115 115 124 106 133 97C137 92 142 86 145 79C147 75 143 73 140 76C131 86 122 96 113 105C104 114 102 117 98 113C98 109 97 105 95 100C95 99 94 99 94 99Z"
        fill="#3BA3DB"
      />
      {/* Suit Inner Collar Accent */}
      <path
        d="M94 99L91.5 105H96.5L94 99Z"
        fill="#FFFFFF"
      />
      {/* Navy Professional Tie Accent */}
      <path
        d="M94 102V111L94.5 113L93.5 111V102H94Z"
        fill="#0A2540"
      />
    </svg>
  );
}
