/* Lightweight wrapper around <model-viewer>.
   Requires @google/model-viewer script to be loaded in index.html. */

import { useEffect, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

interface ModelViewerCardProps {
  src: string;
  alt?: string;
}

const ModelViewerCard = ({ src, alt = "3D model" }: ModelViewerCardProps) => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Only attempt to render on client
    if (typeof window !== "undefined") {
      setCanRender(true);
    }
  }, []);

  if (!canRender) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background/95 via-card/90 to-background/95 overflow-hidden shadow-[0_18px_45px_rgba(88,28,135,0.35)]">
      <model-viewer
        src={src}
        alt={alt}
        autoplay
        camera-controls
        disable-zoom
        exposure="1"
        style={{ width: "100%", height: "260px", background: "transparent" }}
      />
    </div>
  );
};

export default ModelViewerCard;

