
import { parseEther, formatEther } from 'viem';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { config } from '@/config/wagmi';

// Mock contract address - replace with your actual deployed contract
const CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890' as const;

// Simplified ABI for investment pool contract
const CONTRACT_ABI = [
  {
    inputs: [{ name: 'propertyId', type: 'uint256' }],
    name: 'invest',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'propertyId', type: 'uint256' },
      { name: 'amount', type: 'uint256' }
    ],
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
  }
] as const;

export const useInvestmentContract = () => {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  const investInProperty = async (propertyId: number, amount: string) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'invest',
        args: [BigInt(propertyId)],
        value: parseEther(amount),
      });
    } catch (error) {
      console.error('Investment failed:', error);
      throw error;
    }
  };

  const withdrawFromProperty = async (propertyId: number, amount: string) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'withdraw',
        args: [BigInt(propertyId), parseEther(amount)],
      });
    } catch (error) {
      console.error('Withdrawal failed:', error);
      throw error;
    }
  };

  return {
    investInProperty,
    withdrawFromProperty,
    isLoading: isPending || isConfirming,
    isSuccess: isConfirmed,
    hash
  };
};

export const useInvestmentData = (propertyId: number) => {
  const { address, chain } = useAccount();

  const { data: userInvestment } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getInvestment',
    args: address ? [BigInt(propertyId), address] : undefined,
    query: { enabled: !!address },
    chainId: chain?.id,
    account: address
  });

  const { data: totalPoolValue } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTotalPoolValue',
    args: [BigInt(propertyId)],
    chainId: chain?.id,
    account: address
  });

  return {
    userInvestment: userInvestment ? formatEther(userInvestment) : '0',
    totalPoolValue: totalPoolValue ? formatEther(totalPoolValue) : '0'
  };
};
