
import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { Gamepad, User, Trophy, Share } from "lucide-react";

type TabButton = {
  tab: "game" | "profile" | "leaderboard" | "referral";
  label: string;
  icon: React.ElementType;
};

const tabButtons: TabButton[] = [
  { tab: "game", label: "Game", icon: Gamepad },
  { tab: "profile", label: "Profile", icon: User },
  { tab: "leaderboard", label: "Leaderboard", icon: Trophy },
  { tab: "referral", label: "Referral", icon: Share },
];

const GameHeader = () => {
  const { account, balance, score, highScore, activeTab, setActiveTab, connectToWallet, disconnectFromWallet, isLoading } = useGame();

  return (
    <motion.header 
      className="w-full flex flex-col items-center justify-between gap-4 md:flex-row p-6 rounded-xl mb-8 bg-[#0a0a1a] border-2 border-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.5)]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className="text-xs font-medium uppercase tracking-wider text-[#9d00ff]">Retro Snake</span>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00ffff] to-[#ff00ff] bg-clip-text text-transparent">NEON ARCADE</h1>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tabButtons.map((button) => (
          <Button
            key={button.tab}
            onClick={() => setActiveTab(button.tab)}
            variant="ghost"
            className={`${
              activeTab === button.tab
                ? "bg-[#1a1a3a] text-[#00ffff] border border-[#00ffff]"
                : "text-[#9d00ff] hover:text-[#00ffff]"
            } flex items-center gap-1 px-3 py-1`}
          >
            <button.icon size={16} />
            <span className="hidden sm:inline">{button.label}</span>
          </Button>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium uppercase tracking-wider text-[#9d00ff]">Score</span>
            <span className="text-xl font-bold text-[#00ffff]">{score}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium uppercase tracking-wider text-[#9d00ff]">Best</span>
            <span className="text-xl font-bold text-[#00ffff]">{highScore}</span>
          </div>
          
          {account && (
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium uppercase tracking-wider text-[#9d00ff]">ETH</span>
              <span className="text-xl font-bold text-[#00ffff]">{balance}</span>
            </div>
          )}
        </div>
        
        {!account ? (
          <Button 
            onClick={connectToWallet} 
            disabled={isLoading} 
            className="bg-[#00ffff] hover:bg-[#33ffff] text-black font-bold rounded-full px-6 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
          >
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </Button>
        ) : (
          <div className="flex gap-2 items-center">
            <div className="px-4 py-2 bg-[#1a1a3a] text-[#00ffff] font-medium rounded-full text-sm border border-[#9d00ff]">
              {account.slice(0, 6)}...{account.slice(-4)}
            </div>
            <Button
              onClick={disconnectFromWallet}
              size="sm"
              variant="ghost"
              className="text-[#ff00ff] hover:text-[#ff66ff] hover:bg-[#1a1a3a] p-1 h-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </Button>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default GameHeader;
