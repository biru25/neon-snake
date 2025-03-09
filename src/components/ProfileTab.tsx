
import React from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { LogOut, Trophy, User } from "lucide-react";
import { motion } from "framer-motion";

const ProfileTab = () => {
  const { account, balance, highScore, connectToWallet, disconnectFromWallet, isLoading } = useGame();

  return (
    <motion.div
      className="w-full max-w-md mx-auto p-6 bg-[#0a0a1a] border-2 border-[#00ffff] rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.5)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#1a1a3a] flex items-center justify-center border-2 border-[#ff00ff] shadow-[0_0_10px_rgba(255,0,255,0.5)]">
          <User size={40} className="text-[#00ffff]" />
        </div>
        
        <h2 className="text-2xl font-bold text-[#00ffff]">
          {account ? "Your Profile" : "Connect Wallet"}
        </h2>
        
        {account ? (
          <div className="w-full space-y-4">
            <div className="bg-[#1a1a3a] p-4 rounded-lg border border-[#9d00ff]">
              <p className="text-sm text-[#9d00ff] mb-1">Wallet Address</p>
              <p className="text-[#00ffff] font-mono">
                {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            </div>
            
            <div className="bg-[#1a1a3a] p-4 rounded-lg border border-[#9d00ff]">
              <p className="text-sm text-[#9d00ff] mb-1">Balance</p>
              <p className="text-[#00ffff] font-mono">{balance} ETH</p>
            </div>
            
            <div className="bg-[#1a1a3a] p-4 rounded-lg border border-[#9d00ff] flex items-center space-x-3">
              <Trophy size={24} className="text-[#ff00ff]" />
              <div>
                <p className="text-sm text-[#9d00ff] mb-1">High Score</p>
                <p className="text-[#00ffff] font-mono">{highScore}</p>
              </div>
            </div>
            
            <Button
              onClick={disconnectFromWallet}
              className="w-full mt-6 bg-[#ff00ff] hover:bg-[#ff33ff] text-white shadow-[0_0_10px_rgba(255,0,255,0.5)] flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <div className="w-full text-center">
            <p className="text-[#9d00ff] mb-6">
              Connect your wallet to view your profile and track your high scores.
            </p>
            
            <Button
              onClick={connectToWallet}
              disabled={isLoading}
              className="w-full bg-[#00ffff] hover:bg-[#33ffff] text-black font-bold shadow-[0_0_10px_rgba(0,255,255,0.5)]"
            >
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileTab;
