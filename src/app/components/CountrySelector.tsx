"use client";

import React from 'react';

const countries = [
  { code: 'us', name: 'United States' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'ca', name: 'Canada' },
  { code: 'au', name: 'Australia' },
  { code: 'in', name: 'India' },
  { code: 'fr', name: 'France' },
  { code: 'de', name: 'Germany' },
];

interface CountrySelectorProps {
  currentCountry: string;
  onCountryChange: (country: string) => void;
}

export default function CountrySelector({ currentCountry, onCountryChange }: CountrySelectorProps) {
  return (
    <div className="flex justify-center mb-6">
      <select
        value={currentCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        className="px-4 py-2 border rounded-md bg-white text-gray-800 shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}