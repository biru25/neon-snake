
import React from "react";
import { useGame } from "@/context/GameContext";
import GameHeader from "@/components/GameHeader";
import TabContainer from "@/components/TabContainer";
import WalletRequired from "@/components/WalletRequired";

const Index = () => {
  const { account, isMetaMaskAvailable, activeTab } = useGame();
  
  // Only show the wallet required screen if:
  // 1. MetaMask is not available, OR
  // 2. User is not connected AND they're trying to access profile, leaderboard, or referral tabs
  const showWalletRequired = !isMetaMaskAvailable || 
    (!account && (activeTab === "profile" || activeTab === "leaderboard" || activeTab === "referral"));

  return (
    <div className="container mx-auto px-4 py-8">
      <GameHeader />
      
      <div className="scanlines crt-flicker">
        {showWalletRequired ? <WalletRequired /> : <TabContainer />}
      </div>
      
      <footer className="mt-16 text-center text-xs text-[#9d00ff]">
        <p>© 2023 Neon Snake Arcade • A Web3 Retro Game</p>
      </footer>
    </div>
  );
};

export default Index;
