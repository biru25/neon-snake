
import React from "react";
import { useGame } from "@/context/GameContext";
import GameHeader from "@/components/GameHeader";
import WalletRequired from "@/components/WalletRequired";
import GameBoard from "@/components/GameBoard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const { account, score, level, resetGame } = useGame();

  return (
    <div className="min-h-screen flex flex-col py-8 px-4 bg-gradient-to-b from-background to-slate-50">
      <div className="container mx-auto max-w-5xl flex flex-col flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="absolute top-0 left-0 w-full h-96 -z-10 overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-blue-300 opacity-10 w-96 h-96 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
          <div className="absolute top-40 left-20 bg-indigo-300 opacity-10 w-96 h-96 rounded-full blur-3xl -translate-x-1/4" />
        </motion.div>

        <div className="mb-4 flex justify-end">
          <div className="glass text-xs px-3 py-1 rounded-full">
            Web3 Adventure Game
          </div>
        </div>

        <GameHeader />

        <div className="flex-1 flex flex-col items-center justify-center">
          {!account ? (
            <WalletRequired />
          ) : (
            <div className="w-full">
              <GameBoard />
            </div>
          )}
        </div>

        {account && score > 0 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={resetGame}
              className="text-sm opacity-70 hover:opacity-100"
            >
              Reset Game
            </Button>
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Connect your wallet to track your progress on the blockchain</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
