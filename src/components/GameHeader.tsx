
import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";

const GameHeader = () => {
  const { account, balance, score, level, isLoading, connectToWallet } = useGame();

  return (
    <motion.header 
      className="w-full flex flex-col items-center justify-between gap-4 md:flex-row p-6 glass rounded-xl mb-8 border-[#8B5CF6]/20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className="text-xs font-medium uppercase tracking-wider text-[#8B5CF6]">Web3 Adventure</span>
        <h1 className="text-2xl font-display font-bold text-gradient">Level {level}</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium uppercase tracking-wider text-[#8B5CF6]">Score</span>
            <span className="text-xl font-bold">{score}</span>
          </div>
          
          {account && (
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium uppercase tracking-wider text-[#8B5CF6]">Balance</span>
              <span className="text-xl font-bold">{balance} ETH</span>
            </div>
          )}
        </div>
        
        {!account ? (
          <Button 
            onClick={connectToWallet} 
            disabled={isLoading} 
            className="bg-[#8B5CF6] hover:bg-[#9D71FB] text-white rounded-full px-6 shadow-lg shadow-[#8B5CF6]/20"
          >
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </Button>
        ) : (
          <div className="px-4 py-2 bg-[#FCE2F2] text-[#8B5CF6] font-medium rounded-full text-sm shadow-md">
            {account.slice(0, 6)}...{account.slice(-4)}
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default GameHeader;
