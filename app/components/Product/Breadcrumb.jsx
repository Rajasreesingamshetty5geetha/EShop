'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const segmentMap = {
  product: 'Clothing', // Convert 'product' to 'Clothing'
};

const Breadcrumb = () => {
  const pathname = usePathname(); // Get current path
  const searchParams = useSearchParams(); // Get query parameters
  const category = searchParams.get('category'); // Get 'category' from URL

  if (pathname === '/') return null; // Hide breadcrumb on home page

  const pathSegments = pathname.split('/').filter(Boolean); // Split path into segments

  return (
    <nav aria-label="breadcrumb" className="bg-gray-100 px-4 py-2 rounded-md mb-4">
      <ol className="flex text-sm text-gray-600">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="mx-2">/</span>
        </li>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const displayName = segmentMap[segment.toLowerCase()] || segment; // Convert 'product' to 'Clothing'

          return (
            <li key={href} className="flex items-center">
              <Link href={href} className="text-blue-600 hover:underline capitalize">
                {displayName}
              </Link>
              {index !== pathSegments.length - 1 && <span className="mx-2">/</span>}
            </li>
          );
        })}
        {/* Show category if it exists */}
        {category && (
          <>
            <span className="mx-2">/</span>
            <li className="capitalize">{category}</li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
