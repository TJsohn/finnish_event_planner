import { useEffect } from "react";

const useSpinningFavicon = (
  src = "/logo-flower.svg",
  size = 32,
  speed = 0.05
) => {
  useEffect(() => {
    const img = new Image();
    img.src = src;
    let angle = 0;
    let animationFrameId;
    let lastUpdate = 0;
    const frameDelay = 1000 / 30;
    let currentFaviconUrl = null;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = size;
      canvas.height = size;

      const drawFrame = (timestamp) => {
        if (timestamp - lastUpdate > frameDelay) {
          ctx.clearRect(0, 0, size, size);
          ctx.save();
          ctx.translate(size / 2, size / 2);
          ctx.rotate(angle);
          ctx.drawImage(img, -size / 2, -size / 2, size, size);
          ctx.restore();

          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);

            const existingLink = document.querySelector("link[rel*='icon']");
            const link = existingLink || document.createElement("link");

            link.type = "image/png";
            link.rel = "icon";
            link.href = url;

            if (!existingLink) {
              document.head.appendChild(link);
            }

            if (currentFaviconUrl) {
              URL.revokeObjectURL(currentFaviconUrl);
            }
            currentFaviconUrl = url;
          }, "image/png");

          angle += speed;
          lastUpdate = timestamp;
        }

        animationFrameId = requestAnimationFrame(drawFrame);
      };

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (currentFaviconUrl) {
        URL.revokeObjectURL(currentFaviconUrl);
      }
    };
  }, [src, size, speed]);
};

export default useSpinningFavicon;
