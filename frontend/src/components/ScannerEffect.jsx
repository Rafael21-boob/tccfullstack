import { motion } from "framer-motion";

export default function ScannerEffect() {
  return (
    <div className="scanner-box">
      <motion.div
        className="scanner-line"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="scanner-grid" />
      <div className="scanner-corners" />
    </div>
  );
}