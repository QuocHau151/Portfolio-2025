// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { motion } from "framer-motion";

import "@splidejs/react-splide/css";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const SlideShow = ({ images }: { images: string[] }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <Splide
      options={{
        autoplay: "true",
        perPage: 3,
        start: 0,
        rewind: true,
        padding: { left: "3rem", right: "3rem" },
        gap: "1rem",
      }}
      hasTrack={false}
    >
      <SplideTrack>
        {images.map((image, idx) => (
          <SplideSlide key={idx} className="flex items-center">
            <Dialog>
              <DialogTrigger
                className="relative max-h-[140px] overflow-hidden"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <Image
                  src={image}
                  alt="screenshot"
                  width={1000}
                  height={1000}
                  className="h-auto w-full rounded-lg"
                />
                <AnimatePresence>
                  {hovering && (
                    <motion.div
                      className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/50 text-white backdrop-blur-[1px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Click to zoom
                    </motion.div>
                  )}
                </AnimatePresence>
              </DialogTrigger>
              <DialogContent className="m-0 h-[90vh] min-w-[90vw] border-none bg-transparent p-0 outline-none">
                <DialogTitle className="sr-only">Image Preview</DialogTitle>
                <DialogHeader className="w-full">
                  {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
                  <DialogDescription>
                    {image.split("/").pop()}
                  </DialogDescription>
                </DialogHeader>
                <Image
                  src={image}
                  alt="screenshot"
                  width={1000}
                  height={1000}
                  className="w-full"
                  style={{ objectFit: "contain", width: "100vw" }}
                />
              </DialogContent>
            </Dialog>
          </SplideSlide>
        ))}
      </SplideTrack>
      <div className="splide__progress">
        <div className="splide__progress__bar"></div>
      </div>
    </Splide>
  );
};
export default SlideShow;
