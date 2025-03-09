
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { connectWallet, getWalletBalance, isMetaMaskInstalled, listenToAccountChanges } from "@/lib/web3";
import { toast } from "@/components/ui/use-toast";

interface GameContextType {
  account: string | null;
  balance: string;
  score: number;
  level: number;
  isLoading: boolean;
  isMetaMaskAvailable: boolean;
  connectToWallet: () => Promise<void>;
  incrementScore: (points: number) => void;
  resetGame: () => void;
  completeLevel: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState<boolean>(false);

  // Check for MetaMask availability
  useEffect(() => {
    setIsMetaMaskAvailable(isMetaMaskInstalled());
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (!account) return;
    
    const cleanup = listenToAccountChanges((accounts: string[]) => {
      if (accounts.length === 0) {
        setAccount(null);
        toast({
          title: "Wallet disconnected",
          description: "Your wallet has been disconnected",
        });
      } else if (accounts[0] !== account) {
        setAccount(accounts[0]);
        updateBalance(accounts[0]);
        toast({
          title: "Account changed",
          description: `Connected to: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
      }
    });
    
    return cleanup;
  }, [account]);

  // Update balance when account changes
  useEffect(() => {
    if (account) {
      updateBalance(account);
    }
  }, [account]);

  const updateBalance = async (address: string) => {
    const newBalance = await getWalletBalance(address);
    setBalance(newBalance);
  };

  const connectToWallet = async () => {
    setIsLoading(true);
    try {
      const address = await connectWallet();
      setAccount(address);
    } finally {
      setIsLoading(false);
    }
  };

  const incrementScore = (points: number) => {
    setScore(prev => prev + points);
  };

  const completeLevel = () => {
    setLevel(prev => prev + 1);
    toast({
      title: `Level ${level} completed!`,
      description: `You've advanced to level ${level + 1}`,
    });
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    toast({
      title: "Game reset",
      description: "Your progress has been reset",
    });
  };

  return (
    <GameContext.Provider
      value={{
        account,
        balance,
        score,
        level,
        isLoading,
        isMetaMaskAvailable,
        connectToWallet,
        incrementScore,
        resetGame,
        completeLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
