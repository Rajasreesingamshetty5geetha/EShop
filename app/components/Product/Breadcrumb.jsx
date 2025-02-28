'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

// Map your path segments to user-friendly labels
const segmentMap = {
  product: 'Clothing',
  accessories: 'Accessories'
};

const Breadcrumb = () => {
  const pathname = usePathname();       // e.g. "/product" or "/accessories"
  const searchParams = useSearchParams(); 
  const category = searchParams.get('category'); // e.g. "?category=kurti"

  if (pathname === '/') return null; // Hide breadcrumb on home page

  // Split path into segments, ignoring empty strings
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className="bg-gray-100 px-4 py-2 rounded-md mb-4">
      <ol className="flex text-sm text-gray-600">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="mx-2">/</span>
        </li>

        {pathSegments.map((segment, index) => {
          // Construct the href for each segment
          const href = '/' + pathSegments.slice(0, index + 1).join('/');

          // Convert segment to a friendly name if found in segmentMap
          const displayName = segmentMap[segment.toLowerCase()] || segment;

          return (
            <li key={href} className="flex items-center">
              <Link href={href} className="text-blue-600 hover:underline capitalize">
                {displayName}
              </Link>
              {/* If not the last segment, show the slash separator */}
              {index !== pathSegments.length - 1 && <span className="mx-2">/</span>}
            </li>
          );
        })}

        {/* Show category if it exists in the query params */}
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
