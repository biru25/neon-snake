
import React from "react";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";

// Mock data for the leaderboard
const mockLeaderboard = [
  { address: "0x1a2b...3c4d", score: 250, rank: 1 },
  { address: "0x5e6f...7g8h", score: 220, rank: 2 },
  { address: "0x9i0j...1k2l", score: 180, rank: 3 },
  { address: "0x3m4n...5o6p", score: 150, rank: 4 },
  { address: "0x7q8r...9s0t", score: 120, rank: 5 },
];

const LeaderboardTab = () => {
  const { account, highScore } = useGame();
  
  // Find the player's position if they're connected
  const playerPosition = account ? mockLeaderboard.findIndex(entry => 
    entry.score < highScore
  ) : -1;
  
  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-6">
        <Trophy size={30} className="text-[#ff00ff] mr-3" />
        <h2 className="text-2xl font-bold text-[#00ffff]">Leaderboard</h2>
      </div>
      
      <div className="bg-[#0a0a1a] border-2 border-[#00ffff] rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.5)] overflow-hidden">
        <div className="grid grid-cols-3 bg-[#1a1a3a] p-4 border-b border-[#00ffff]">
          <h3 className="text-[#9d00ff] font-bold">Rank</h3>
          <h3 className="text-[#9d00ff] font-bold">Player</h3>
          <h3 className="text-[#9d00ff] font-bold text-right">Score</h3>
        </div>
        
        {mockLeaderboard.map((entry, index) => (
          <motion.div
            key={index}
            className={`grid grid-cols-3 p-4 ${
              index % 2 === 0 ? "bg-[#0a0a1a]" : "bg-[#1a1a3a]"
            } border-b border-[#1a1a3a]`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <span className="text-[#ff00ff] font-bold">#{entry.rank}</span>
            <span className="text-[#00ffff] font-mono">{entry.address}</span>
            <span className="text-[#00ffff] text-right font-mono">{entry.score}</span>
          </motion.div>
        ))}
        
        {account && highScore > 0 && (
          <motion.div
            className="grid grid-cols-3 p-4 bg-[#1a1a3a] border-t-2 border-[#ff00ff]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="text-[#ff00ff] font-bold">
              {playerPosition >= 0 ? `#${playerPosition + 1}` : "N/A"}
            </span>
            <span className="text-[#00ffff] font-mono">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            <span className="text-[#00ffff] text-right font-mono">{highScore}</span>
          </motion.div>
        )}
      </div>
      
      <p className="text-[#9d00ff] text-center mt-4 text-sm">
        Connect your wallet and play games to appear on the leaderboard!
      </p>
    </motion.div>
  );
};

export default LeaderboardTab;
