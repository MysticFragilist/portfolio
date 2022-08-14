import { motion } from "framer-motion";
import useWindowSize from "../hooks/use-windows";

export default function SpecialOrb(props) {
  const sizes = useWindowSize();

  // diameter, x, y, time
  return (
    <div>
      <motion.div
        animate={{ y: [sizes.height, (-sizes.height - props.y)] }}
        transition={{ duration: props.time, repeat: Infinity }}
      >
        <div className="special-orb"></div>
      </motion.div>
      <style jsx>{`
      .special-orb {
        position: relative;
        left: ${props.x}px;
        top: ${props.y}px;
        width: ${props.diameter}px;
        height: ${props.diameter}px;
        border-radius: 50%;
        box-shadow:
          inset 0 0 ${props.diameter / 6}px #fff,      /* inner white */
          inset ${props.diameter / 15}px 0 ${props.diameter / 3}px #f0f,   /* inner left magenta short */
          inset -${props.diameter / 15}px 0 ${props.diameter / 3}px #0ff,  /* inner right cyan short */
          inset ${props.diameter / 15}px 0 ${props.diameter}px #f0f,  /* inner left magenta broad */
          inset -${props.diameter / 15}px 0 ${props.diameter}px #0ff, /* inner right cyan broad */
          0 0 ${props.diameter / 6}px #fff,            /* outer white */
          -${props.diameter / 30}px 0 ${props.diameter / 3}px #f0f,        /* outer left magenta */
          ${props.diameter / 30}px 0 ${props.diameter / 3}px #0ff;         /* outer right cyan */
      }
      `}</style>
    </div>
  )
}
