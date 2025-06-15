import { useAccount } from 'wagmi';

// BRX Token contract ABI (simplified for demo)
const BRX_TOKEN_ABI = [
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// Property investment contract ABI for BRX tokens
const PROPERTY_CONTRACT_ABI = [
  {
    inputs: [
      { name: 'propertyId', type: 'uint256' },
      { name: 'brxAmount', type: 'uint256' }
    ],
    name: 'investWithBRX',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'propertyId', type: 'uint256' },
      { name: 'tokenAmount', type: 'uint256' }
    ],
    name: 'withdrawBRX',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'propertyId', type: 'uint256' },
      { name: 'user', type: 'address' }
    ],
    name: 'getUserInvestment',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const BRX_TOKEN_ADDRESS = '0x2234567890123456789012345678901234567890';
const PROPERTY_CONTRACT_ADDRESS = '0x3234567890123456789012345678901234567890';

// Local storage keys for wallet simulation
const BRX_BALANCE_KEY = 'brx_wallet_balance';
const WALLET_TRANSACTIONS_KEY = 'brx_wallet_transactions';

// Add in-memory map for user investments, keyed by address and propertyId
const USER_INVESTMENTS_KEY = 'brx_user_investments'; // localStorage key for all investments

function getUserInvestments(address: string) {
  const data = localStorage.getItem(`${USER_INVESTMENTS_KEY}_${address}`);
  return data ? JSON.parse(data) : {};
}
function setUserInvestments(address: string, investments: any) {
  localStorage.setItem(`${USER_INVESTMENTS_KEY}_${address}`, JSON.stringify(investments));
}

export interface InvestmentParams {
  propertyId: number;
  amount: number; // in BRX tokens
}

export interface WithdrawParams {
  propertyId: number;
  amount: number; // in property tokens
}

export interface BRXPurchaseParams {
  usdAmount: number; // USD amount to spend (1 USD = 1 BRX)
}

export interface WalletTransaction {
  id: string;
  type: 'purchase' | 'investment' | 'withdrawal';
  amount: number;
  timestamp: number;
  propertyId?: number;
  propertyName?: string;
  status: 'completed' | 'pending' | 'failed';
}

// Wallet simulation functions
const getWalletBalance = (address: string): number => {
  const balanceData = localStorage.getItem(`${BRX_BALANCE_KEY}_${address}`);
  return balanceData ? parseFloat(balanceData) : 0;
};

const setWalletBalance = (address: string, balance: number): void => {
  localStorage.setItem(`${BRX_BALANCE_KEY}_${address}`, balance.toString());
};

const addWalletTransaction = (address: string, transaction: WalletTransaction): void => {
  const transactionsData = localStorage.getItem(`${WALLET_TRANSACTIONS_KEY}_${address}`);
  const transactions: WalletTransaction[] = transactionsData ? JSON.parse(transactionsData) : [];
  transactions.unshift(transaction); // Add to beginning
  localStorage.setItem(`${WALLET_TRANSACTIONS_KEY}_${address}`, JSON.stringify(transactions));
};

const getWalletTransactions = (address: string): WalletTransaction[] => {
  const transactionsData = localStorage.getItem(`${WALLET_TRANSACTIONS_KEY}_${address}`);
  return transactionsData ? JSON.parse(transactionsData) : [];
};

// Hook for BRX token operations
export const useBRXToken = () => {
  const { address } = useAccount();

  const buyBRX = async (usdAmount: number) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    console.log(`Processing BRX purchase: $${usdAmount} USD for ${usdAmount} BRX tokens`);
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add BRX tokens to wallet (zero gas fees)
    const currentBalance = getWalletBalance(address);
    const newBalance = currentBalance + usdAmount;
    setWalletBalance(address, newBalance);
    
    // Record transaction
    const transaction: WalletTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(16).substr(2, 8)}`,
      type: 'purchase',
      amount: usdAmount,
      timestamp: Date.now(),
      status: 'completed'
    };
    addWalletTransaction(address, transaction);
    
    console.log(`BRX tokens transferred to wallet. New balance: ${newBalance} BRX`);
    
    return {
      success: true,
      amount: usdAmount,
      txHash: transaction.id,
      newBalance: newBalance,
      gasUsed: 0, // Zero gas fees
    };
  };

  const getBRXBalance = async (): Promise<number> => {
    if (!address) return 0;
    
    // Simulate slight delay for blockchain query
    await new Promise(resolve => setTimeout(resolve, 500));
    return getWalletBalance(address);
  };

  const transferBRX = async (toAddress: string, amount: number) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    const currentBalance = getWalletBalance(address);
    if (currentBalance < amount) {
      throw new Error('Insufficient BRX balance');
    }

    // Simulate transfer delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update sender balance
    setWalletBalance(address, currentBalance - amount);
    
    // Record transaction
    const transaction: WalletTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(16).substr(2, 8)}`,
      type: 'investment',
      amount: amount,
      timestamp: Date.now(),
      status: 'completed'
    };
    addWalletTransaction(address, transaction);
    
    return {
      success: true,
      txHash: transaction.id,
      gasUsed: 0,
    };
  };

  const getTransactionHistory = (): WalletTransaction[] => {
    if (!address) return [];
    return getWalletTransactions(address);
  };

  return {
    buyBRX,
    getBRXBalance,
    transferBRX,
    getTransactionHistory,
    isConnected: !!address,
  };
};

// Hook for property investments with BRX
export const useInvestmentContract = () => {
  const { address } = useAccount();
  const { transferBRX } = useBRXToken();

  const investInProperty = async (propertyId: number, brxAmount: number) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    try {
      console.log(`Investing ${brxAmount} BRX in property ${propertyId} with zero gas fees`);
      
      // Transfer BRX tokens from wallet to investment pool (zero gas)
      const transferResult = await transferBRX(PROPERTY_CONTRACT_ADDRESS, brxAmount);
      
      // Update the static user investments for demo mode
      const investments = getUserInvestments(address);
      const current = investments[propertyId] || { userInvestmentBRX: 0, userPropertyTokens: 0 };
      const tokenPrice = 100; // fallback for token price if no actual, read from prop in modal
      current.userInvestmentBRX = (current.userInvestmentBRX || 0) + brxAmount;
      current.userPropertyTokens = (current.userPropertyTokens || 0) + (brxAmount / tokenPrice);
      investments[propertyId] = current;
      setUserInvestments(address, investments);
      
      // Record investment transaction
      const transaction: WalletTransaction = {
        id: transferResult.txHash,
        type: 'investment',
        amount: brxAmount,
        timestamp: Date.now(),
        propertyId: propertyId,
        status: 'completed'
      };
      
      if (address) {
        addWalletTransaction(address, transaction);
      }
      
      return {
        success: true,
        propertyId,
        brxAmount,
        txHash: transferResult.txHash,
        gasUsed: 0,
      };
    } catch (error) {
      console.error('Investment failed:', error);
      throw error;
    }
  };

  const withdrawFromProperty = async (propertyId: number, tokenAmount: number) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    try {
      console.log(`Withdrawing ${tokenAmount} tokens from property ${propertyId} with zero gas fees`);
      
      // Simulate withdrawal delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Calculate BRX equivalent using tokenPrice
      const tokenPrice = 100; // Default price, update if dynamic pricing is required
      const brxEquivalent = tokenAmount * tokenPrice;
      const currentBalance = getWalletBalance(address);
      setWalletBalance(address, currentBalance + brxEquivalent);
      
      // Update static user investments
      const investments = getUserInvestments(address);
      const current = investments[propertyId] || { userInvestmentBRX: 0, userPropertyTokens: 0 };
      current.userInvestmentBRX = Math.max(0, (current.userInvestmentBRX || 0) - brxEquivalent);
      current.userPropertyTokens = Math.max(0, (current.userPropertyTokens || 0) - tokenAmount);
      investments[propertyId] = current;
      setUserInvestments(address, investments);
      
      // Record withdrawal transaction
      const transaction: WalletTransaction = {
        id: `tx_${Date.now()}_${Math.random().toString(16).substr(2, 8)}`,
        type: 'withdrawal',
        amount: brxEquivalent,
        timestamp: Date.now(),
        propertyId: propertyId,
        status: 'completed'
      };
      addWalletTransaction(address, transaction);
      
      return {
        success: true,
        propertyId,
        tokenAmount,
        brxEquivalent,
        txHash: transaction.id,
        gasUsed: 0,
      };
    } catch (error) {
      console.error('Withdrawal failed:', error);
      throw error;
    }
  };

  return {
    investInProperty,
    withdrawFromProperty,
    isLoading: false,
    error: null,
    isConnected: !!address,
  };
};

// Hook to get investment data for a property
export const useInvestmentData = (propertyId: number, tokenPrice?: number) => {
  const { address } = useAccount();
  // Get real data from localStorage for this user + property
  let userInvestmentBRX = 0;
  let userPropertyTokens = 0;
  if (address) {
    const investments = getUserInvestments(address);
    if (investments && investments[propertyId]) {
      userInvestmentBRX = investments[propertyId].userInvestmentBRX || 0;
      userPropertyTokens = investments[propertyId].userPropertyTokens || 0;
    }
  }
  // Fallback for totalPoolValueBRX as static mock
  const totalPoolValueBRX = 15000;
  return {
    userInvestmentBRX: userInvestmentBRX.toString(),
    totalPoolValueBRX: totalPoolValueBRX.toString(),
    userPropertyTokens: userPropertyTokens.toString(),
  };
};

// Mock functions for demonstration
export const getTokenPrice = async (propertyId: number): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockPrices: { [key: number]: number } = {
    1: 85,
    2: 120,
    3: 150,
  };
  
  return mockPrices[propertyId] || 100;
};

export const getUserInvestment = async (propertyId: number, userAddress: string): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return Math.floor(Math.random() * 200) + 50;
};
