
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { useGame } from "@/context/GameContext";

const ReferralTab = () => {
  const { account } = useGame();
  const [copied, setCopied] = useState(false);
  
  // Generate a referral link based on the user's account
  const referralLink = account 
    ? `${window.location.origin}?ref=${account.slice(0, 8)}`
    : "";
  
  const handleCopyLink = () => {
    if (!referralLink) {
      toast({
        title: "Cannot copy referral link",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    toast({
      title: "Referral link copied!",
      description: "Share it with your friends to earn rewards",
    });
    
    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-6">
        <Share size={30} className="text-[#ff00ff] mr-3" />
        <h2 className="text-2xl font-bold text-[#00ffff]">Refer Friends</h2>
      </div>
      
      <div className="bg-[#0a0a1a] border-2 border-[#00ffff] rounded-xl p-6 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-[#9d00ff] mb-4">
              Invite friends to play and earn rewards when they connect their wallets!
            </p>
            
            <motion.div
              className="w-24 h-24 rounded-full mx-auto bg-[#1a1a3a] flex items-center justify-center border-2 border-[#ff00ff] shadow-[0_0_10px_rgba(255,0,255,0.5)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-4xl">🎮</span>
            </motion.div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[#00ffff] text-sm font-medium">Your Referral Link</label>
            <div className="flex items-stretch">
              <Input
                value={referralLink}
                readOnly
                placeholder="Connect wallet to get your referral link"
                className="bg-[#1a1a3a] border-[#9d00ff] text-[#00ffff] font-mono rounded-r-none"
              />
              <Button
                onClick={handleCopyLink}
                disabled={!account}
                className={`rounded-l-none ${
                  copied 
                    ? "bg-[#00ffff] text-black" 
                    : "bg-[#ff00ff] hover:bg-[#ff33ff] text-white"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          
          <div className="bg-[#1a1a3a] p-4 rounded-lg border border-[#9d00ff]">
            <h3 className="text-[#00ffff] font-bold mb-2">Rewards</h3>
            <ul className="text-[#9d00ff] space-y-2 text-sm list-disc pl-5">
              <li>Earn 50 bonus points for each friend who joins</li>
              <li>Get special power-ups in the game</li>
              <li>Unlock exclusive neon snake skins</li>
            </ul>
          </div>
          
          {!account && (
            <p className="text-center text-[#ff00ff] text-sm">
              Connect your wallet to get your unique referral link!
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReferralTab;
