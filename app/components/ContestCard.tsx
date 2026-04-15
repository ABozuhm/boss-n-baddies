
"use client";
import { motion } from "framer-motion";

export default function ContestCard({ user }) {
  return (
    <motion.div 
      className="relative w-full h-[80vh] rounded-2xl overflow-hidden shadow-xl"
      whileHover={{ scale: 1.02 }}
    >
      <img src={user.image} className="w-full h-full object-cover" />

      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h2 className="text-white text-2xl font-bold">{user.name}</h2>
        <p className="text-pink-400">🔥 Rank #{user.rank}</p>
        <p className="text-yellow-400">${user.votes} votes</p>
      </div>
    </motion.div>
  );
}
