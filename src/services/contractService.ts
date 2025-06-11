
import { readContract, writeContract } from '@wagmi/core';
import { useAccount, useChainId, useReadContract, useWriteContract } from 'wagmi';
import { config } from '@/config/wagmi';
import { parseEther, formatEther } from 'viem';

// Contract ABI for real estate investment
const CONTRACT_ABI = [
  {
    inputs: [{ name: 'propertyId', type: 'uint256' }],
    name: 'invest',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'propertyId', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'propertyId', type: 'uint256' },
      { name: 'investor', type: 'address' }
    ],
    name: 'getInvestment',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'propertyId', type: 'uint256' }],
    name: 'getTotalPoolValue',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890' as const;

// Investment function
export const investInProperty = async (propertyId: number, amount: string, account: `0x${string}`, chainId: number) => {
  try {
    const result = await writeContract(config, {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'invest',
      args: [BigInt(propertyId)],
      value: parseEther(amount),
      account,
      chain: { id: chainId } as any,
    });
    return { success: true, hash: result };
  } catch (error) {
    console.error('Investment failed:', error);
    return { success: false, error };
  }
};

// Withdrawal function
export const withdrawFromProperty = async (propertyId: number, account: `0x${string}`, chainId: number) => {
  try {
    const result = await writeContract(config, {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'withdraw',
      args: [BigInt(propertyId)],
      account,
      chain: { id: chainId } as any,
    });
    return { success: true, hash: result };
  } catch (error) {
    console.error('Withdrawal failed:', error);
    return { success: false, error };
  }
};

// Hook to get user's investment in a property
export const useGetInvestment = (propertyId: number) => {
  const { address } = useAccount();
  const chainId = useChainId();

  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getInvestment',
    args: address ? [BigInt(propertyId), address] : undefined,
    chainId,
    query: { enabled: !!address && !!chainId },
  });
};

// Hook to get total pool value for a property
export const useGetTotalPoolValue = (propertyId: number) => {
  const chainId = useChainId();

  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTotalPoolValue',
    args: [BigInt(propertyId)],
    chainId,
    query: { enabled: !!chainId },
  });
};

// Hook for investment transactions
export const useInvestment = () => {
  const { writeContractAsync, isPending } = useWriteContract();

  const invest = async (propertyId: number, amount: string) => {
    try {
      const result = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'invest',
        args: [BigInt(propertyId)],
        value: parseEther(amount),
      });
      return result;
    } catch (error) {
      console.error('Investment failed:', error);
      throw error;
    }
  };

  const withdraw = async (propertyId: number) => {
    try {
      const result = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'withdraw',
        args: [BigInt(propertyId)],
      });
      return result;
    } catch (error) {
      console.error('Withdrawal failed:', error);
      throw error;
    }
  };

  return {
    invest,
    withdraw,
    isPending,
  };
};

// Combined hook for investment contract operations
export const useInvestmentContract = () => {
  const { invest, withdraw, isPending: isLoading } = useInvestment();
  
  const investInProperty = async (propertyId: number, amount: string) => {
    return invest(propertyId, amount);
  };

  const withdrawFromProperty = async (propertyId: number) => {
    return withdraw(propertyId);
  };

  return {
    investInProperty,
    withdrawFromProperty,
    isLoading,
  };
};

// Combined hook for investment data
export const useInvestmentData = (propertyId: number) => {
  const { data: userInvestmentData } = useGetInvestment(propertyId);
  const { data: totalPoolData } = useGetTotalPoolValue(propertyId);

  return {
    userInvestment: userInvestmentData ? formatEther(userInvestmentData) : '0',
    totalPoolValue: totalPoolData ? formatEther(totalPoolData) : '0',
  };
};

// Utility functions
export const formatInvestmentAmount = (amount: bigint) => {
  return formatEther(amount);
};

export const parseInvestmentAmount = (amount: string) => {
  return parseEther(amount);
};
