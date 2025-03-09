
import { toast } from "@/components/ui/use-toast";

export interface EthereumWindow extends Window {
  ethereum?: any;
}

export const connectWallet = async (): Promise<string | null> => {
  try {
    const { ethereum } = window as EthereumWindow;
    
    if (!ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask extension and reload the page",
        variant: "destructive",
      });
      return null;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
    if (accounts.length === 0) {
      return null;
    }
    
    // Get the current network ID
    const chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Connected to chain:", chainId);
    
    toast({
      title: "Wallet connected!",
      description: `Connected to address: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
    });
    
    return accounts[0];
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    toast({
      title: "Connection error",
      description: "There was an error connecting to your wallet",
      variant: "destructive",
    });
    return null;
  }
};

export const getWalletBalance = async (address: string): Promise<string> => {
  try {
    const { ethereum } = window as EthereumWindow;
    
    if (!ethereum) {
      return "0";
    }
    
    const balance = await ethereum.request({ 
      method: "eth_getBalance", 
      params: [address, "latest"]
    });
    
    // Convert from wei to ether
    const etherValue = parseInt(balance, 16) / 1e18;
    return etherValue.toFixed(4);
  } catch (error) {
    console.error("Error getting wallet balance:", error);
    return "0";
  }
};

export const listenToAccountChanges = (callback: (accounts: string[]) => void) => {
  const { ethereum } = window as EthereumWindow;
  
  if (!ethereum) {
    return;
  }
  
  ethereum.on("accountsChanged", callback);
  
  // Return cleanup function
  return () => {
    ethereum.removeListener("accountsChanged", callback);
  };
};

export const isMetaMaskInstalled = (): boolean => {
  const { ethereum } = window as EthereumWindow;
  return !!ethereum && !!ethereum.isMetaMask;
};
