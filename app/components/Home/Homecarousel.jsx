import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HomecarouselData } from "./HomecarouselData";


const Homecarousel = () => {
  return (
    <div className="w-full bg-white mt-2 mx-auto max-w-[1600px] overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        swipeable
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
        showArrows={false}
      >
        {HomecarouselData.map((item, index) => (
          <a key={index} href={item.href} className="block">
            <img
              alt={item.imageAlt}
              src={item.imageSrc}
              className="w-full h-auto max-h-[500px] md:max-h-[600px] lg:max-h-[700px] object-cover rounded-lg"
            />
          </a>
        ))}
      </Carousel>
    </div>
  );
};

export default Homecarousel;
