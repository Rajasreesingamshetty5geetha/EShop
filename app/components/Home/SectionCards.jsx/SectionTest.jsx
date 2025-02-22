import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { sections } from './SectionCardData';

export default function SectionTest() {
    return (
        <div>
            {sections.map((section) => (
                <div key={section.sectionName}>
                    <h1 className='mt-10 p-1 px-12 mb-2 text-black font-bold text-3xl'>{section.sectionName}</h1>
                    <SectionSlider products={section.products} />
                </div>
            ))}
        </div>
    );
}

const SectionSlider = ({ products }) => {
    const containerRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const scroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = 900;
            containerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                setIsScrolled(containerRef.current.scrollLeft > 0);
            }
        };

        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <div className='relative w-full px-12 py-6'>

            {/* Left Arrow */}
            {isScrolled && (
                <button
                    onClick={() => scroll("left")}
                    className='absolute ml-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-800 text-white 
                      p-2 rounded-full shadow-lg shadow-white/50 z-10 sm:block md:block'
                >
                    <ArrowLeft size={24} />
                </button>
            )}

            {/* Product Cards */}
            <div
                ref={containerRef}
                className="flex overflow-hidden gap-4 scroll-smooth py-10 px-8 bg-gray-400 rounded-lg"
            >
                {products.map((product) => (
                    <div key={product.id} className='min-w-[200px] w-[200px] h-[300px] bg-white p-4 rounded-lg shadow-md object-top cursor-pointer flex flex-col justify-center '>
                        <img
                            src={product.image}
                            alt={product.brand}
                            className='w-full h-full object-cover rounded-md aspect-square object-top'
                        />
                        <div className='flex flex-grow flex-col justify-end hover:h-96 hover:shadow-md hover:rounded-b-lg'>
                            <h3 className='text-lg font-medium text-gray-900 mt-2'>{product.brand}</h3>
                            <p className="desc">{product.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={() => scroll("right")}
                className='absolute lg:right-16 right-14 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-800 text-white 
                  p-2 rounded-full shadow-lg shadow-white/50 z-10 sm:block md:block '
            >
                <ArrowRight size={24} />
            </button>

        </div>
    );
};