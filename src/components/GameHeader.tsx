
import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";

const GameHeader = () => {
  const { account, balance, score, level, isLoading, connectToWallet } = useGame();

  return (
    <motion.header 
      className="w-full flex flex-col items-center justify-between gap-4 md:flex-row p-6 glass rounded-xl mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className="text-xs font-medium uppercase tracking-wider opacity-70">Web3 Adventure</span>
        <h1 className="text-2xl font-display font-bold">Level {level}</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium uppercase tracking-wider opacity-70">Score</span>
            <span className="text-xl font-bold">{score}</span>
          </div>
          
          {account && (
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium uppercase tracking-wider opacity-70">Balance</span>
              <span className="text-xl font-bold">{balance} ETH</span>
            </div>
          )}
        </div>
        
        {!account ? (
          <Button 
            onClick={connectToWallet} 
            disabled={isLoading} 
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
          >
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </Button>
        ) : (
          <div className="px-4 py-2 bg-secondary rounded-full text-sm">
            {account.slice(0, 6)}...{account.slice(-4)}
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default GameHeader;
