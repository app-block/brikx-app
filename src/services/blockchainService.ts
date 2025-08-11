import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther, parseUnits, formatUnits } from 'viem';
import { toast } from 'sonner';

// USDT Contract Addresses (mainnet)
export const USDT_ADDRESSES = {
  ethereum: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  bsc: '0x55d398326f99059fF775485246999027B3197955',
  polygon: '0xc2132D05D31c914a87C6611C10748AEBb07C0C39',
  arbitrum: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
} as const;

// BRX Token Contract Address (deployed)
export const BRX_TOKEN_ADDRESS = '0x1234567890123456789012345678901234567890'; // Replace with actual deployed contract

// USDT-BRX Exchange Contract Address
export const EXCHANGE_CONTRACT_ADDRESS = '0x2345678901234567890123456789012345678901'; // Replace with actual deployed contract

// USDT Token ABI (ERC20 standard)
export const USDT_ABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
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
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// BRX Token ABI
export const BRX_TOKEN_ABI = [
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
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// USDT-BRX Exchange Contract ABI
export const EXCHANGE_ABI = [
  {
    inputs: [{ name: 'usdtAmount', type: 'uint256' }],
    name: 'exchangeUSDTForBRX',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'exchangeRate',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'user', type: 'address' },
      { indexed: false, name: 'usdtAmount', type: 'uint256' },
      { indexed: false, name: 'brxAmount', type: 'uint256' },
      { indexed: false, name: 'timestamp', type: 'uint256' }
    ],
    name: 'TokenExchange',
    type: 'event',
  },
] as const;

// Property Investment Contract ABI
export const PROPERTY_INVESTMENT_ABI = [
  {
    inputs: [
      { name: 'propertyId', type: 'uint256' },
      { name: 'brxAmount', type: 'uint256' }
    ],
    name: 'investInProperty',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'propertyId', type: 'uint256' },
      { name: 'tokenAmount', type: 'uint256' }
    ],
    name: 'withdrawFromProperty',
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

export interface USDTPaymentResult {
  success: boolean;
  txHash: string;
  brxAmount: number;
  gasUsed: string;
  blockNumber?: number;
}

export interface BlockchainTransaction {
  hash: string;
  blockNumber: number;
  timestamp: number;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  status: 'success' | 'failed' | 'pending';
}

// Hook for USDT operations
export const useUSDTContract = (chainId: number = 1) => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const getUSDTAddress = (chainId: number) => {
    switch (chainId) {
      case 1: return USDT_ADDRESSES.ethereum;
      case 56: return USDT_ADDRESSES.bsc;
      case 137: return USDT_ADDRESSES.polygon;
      case 42161: return USDT_ADDRESSES.arbitrum;
      default: return USDT_ADDRESSES.ethereum;
    }
  };

  // Read USDT balance
  const { data: usdtBalance } = useReadContract({
    address: getUSDTAddress(chainId),
    abi: USDT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Read USDT allowance for exchange contract
  const { data: usdtAllowance } = useReadContract({
    address: getUSDTAddress(chainId),
    abi: USDT_ABI,
    functionName: 'allowance',
    args: address ? [address, EXCHANGE_CONTRACT_ADDRESS] : undefined,
  });

  const approveUSDT = async (amount: bigint) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: getUSDTAddress(chainId),
      abi: USDT_ABI,
      functionName: 'approve',
      args: [EXCHANGE_CONTRACT_ADDRESS, amount],
    });
  };

  return {
    usdtBalance: usdtBalance ? formatUnits(usdtBalance, 6) : '0', // USDT has 6 decimals
    usdtAllowance: usdtAllowance ? formatUnits(usdtAllowance, 6) : '0',
    approveUSDT,
    usdtAddress: getUSDTAddress(chainId),
  };
};

// Hook for BRX token operations
export const useBRXContract = () => {
  const { address } = useAccount();

  // Read BRX balance
  const { data: brxBalance, refetch: refetchBRXBalance } = useReadContract({
    address: BRX_TOKEN_ADDRESS,
    abi: BRX_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  return {
    brxBalance: brxBalance ? formatEther(brxBalance) : '0',
    refetchBRXBalance,
  };
};

// Hook for USDT to BRX exchange
export const useUSDTToBRXExchange = () => {
  const { address, chainId } = useAccount();
  const { writeContract } = useWriteContract();
  const { usdtAllowance, approveUSDT } = useUSDTContract(chainId);
  const { refetchBRXBalance } = useBRXContract();

  // Read exchange rate
  const { data: exchangeRate } = useReadContract({
    address: EXCHANGE_CONTRACT_ADDRESS,
    abi: EXCHANGE_ABI,
    functionName: 'exchangeRate',
  });

  const exchangeUSDTForBRX = async (usdtAmount: number): Promise<USDTPaymentResult> => {
    if (!address) throw new Error('Wallet not connected');

    try {
      const usdtAmountWei = parseUnits(usdtAmount.toString(), 6); // USDT has 6 decimals
      const currentAllowance = parseUnits(usdtAllowance, 6);

      // Check if approval is needed
      if (currentAllowance < usdtAmountWei) {
        toast.info('Approving USDT spending...');
        const approveTx = await approveUSDT(usdtAmountWei);
        
        // Wait for approval transaction
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.success('USDT approved successfully');
      }

      // Execute the exchange
      toast.info('Exchanging USDT for BRX tokens...');
      const exchangeTx = await writeContract({
        address: EXCHANGE_CONTRACT_ADDRESS,
        abi: EXCHANGE_ABI,
        functionName: 'exchangeUSDTForBRX',
        args: [usdtAmountWei],
      });

      // Calculate BRX amount (1:1 ratio for simplicity)
      const brxAmount = usdtAmount;

      // Refresh BRX balance
      setTimeout(() => {
        refetchBRXBalance();
      }, 3000);

      return {
        success: true,
        txHash: exchangeTx,
        brxAmount,
        gasUsed: '0', // Will be updated after transaction confirmation
      };
    } catch (error) {
      console.error('Exchange failed:', error);
      throw error;
    }
  };

  return {
    exchangeUSDTForBRX,
    exchangeRate: exchangeRate ? Number(exchangeRate) : 1,
    isLoading: false,
  };
};

// Hook for property investments with real blockchain
export const usePropertyInvestmentContract = () => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const investInProperty = async (propertyId: number, brxAmount: number) => {
    if (!address) throw new Error('Wallet not connected');

    try {
      const brxAmountWei = parseEther(brxAmount.toString());
      
      const tx = await writeContract({
        address: BRX_TOKEN_ADDRESS,
        abi: PROPERTY_INVESTMENT_ABI,
        functionName: 'investInProperty',
        args: [BigInt(propertyId), brxAmountWei],
      });

      return {
        success: true,
        txHash: tx,
        propertyId,
        brxAmount,
        gasUsed: '0',
      };
    } catch (error) {
      console.error('Investment failed:', error);
      throw error;
    }
  };

  const withdrawFromProperty = async (propertyId: number, tokenAmount: number) => {
    if (!address) throw new Error('Wallet not connected');

    try {
      const tokenAmountWei = parseEther(tokenAmount.toString());
      
      const tx = await writeContract({
        address: BRX_TOKEN_ADDRESS,
        abi: PROPERTY_INVESTMENT_ABI,
        functionName: 'withdrawFromProperty',
        args: [BigInt(propertyId), tokenAmountWei],
      });

      return {
        success: true,
        txHash: tx,
        propertyId,
        tokenAmount,
        gasUsed: '0',
      };
    } catch (error) {
      console.error('Withdrawal failed:', error);
      throw error;
    }
  };

  // Read user investment for a property
  const { data: userInvestment } = useReadContract({
    address: BRX_TOKEN_ADDRESS,
    abi: PROPERTY_INVESTMENT_ABI,
    functionName: 'getUserInvestment',
    args: address ? [BigInt(1), address] : undefined, // Default to property 1
  });

  return {
    investInProperty,
    withdrawFromProperty,
    userInvestment: userInvestment ? formatEther(userInvestment) : '0',
  };
};

export default {
  useUSDTContract,
  useBRXContract,
  useUSDTToBRXExchange,
  usePropertyInvestmentContract,
};