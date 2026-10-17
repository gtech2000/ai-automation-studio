"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import type { ProjectMedia } from "@/data/projects";

interface MediaGalleryProps {
  media: ProjectMedia[];
}

/** Screenshot gallery for a case study — renders image media items. */
export function MediaGallery({ media }: MediaGalleryProps) {
  const images = media.filter((m) => m.type === "image");
  if (images.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img, i) => (
        <motion.figure
          key={img.src}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.35,
            delay: i * 0.06,
            ease: "easeOut",
          }}
          className="card overflow-hidden"
        >
          <div className="bg-grid relative aspect-[4/3] overflow-hidden">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
          {(img.caption || img.alt) && (
            <figcaption className="flex items-center gap-2 border-t border-stroke bg-layer-1 px-3 py-2.5 text-xs text-text-secondary">
              <Camera className="h-3.5 w-3.5 shrink-0 text-grey" aria-hidden="true" />
              {img.caption ?? img.alt}
            </figcaption>
          )}
        </motion.figure>
      ))}
    </div>
  );
}
