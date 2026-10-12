import { motion, type HTMLMotionProps } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ delay = 0, y = 24, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease, delay }}
      {...props}
    />
  );
}

/** Image with a subtle mask reveal from bottom. */
export function MaskImage({ src, alt, className = "", imgClassName = "", eager = false, width, height }: {
  src: string; alt: string; className?: string; imgClassName?: string; eager?: boolean; width?: number; height?: number;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(12% 0 0 0)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.4, ease }}
    >
      <img src={src} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`} />
    </motion.div>
  );
}
