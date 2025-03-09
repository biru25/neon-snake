
import React from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const WalletRequired = () => {
  const { connectToWallet, isLoading, isMetaMaskAvailable } = useGame();

  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 px-6 text-center max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
          />
        </svg>
      </div>
      
      <h2 className="text-2xl font-display font-bold mb-2">Connect Your Wallet</h2>
      
      <p className="text-muted-foreground mb-6">
        {isMetaMaskAvailable 
          ? "Connect your Ethereum wallet to start playing and track your progress on the blockchain."
          : "You need MetaMask to play this game. Please install the MetaMask extension and reload the page."}
      </p>
      
      {isMetaMaskAvailable ? (
        <Button
          onClick={connectToWallet}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg"
        >
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-3 text-lg inline-block"
        >
          Install MetaMask
        </a>
      )}
    </motion.div>
  );
};

export default WalletRequired;
