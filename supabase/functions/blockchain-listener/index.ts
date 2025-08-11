import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface BlockchainEvent {
  eventType: 'TokenExchange' | 'PropertyInvestment' | 'PropertyWithdrawal';
  userAddress: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: number;
  data: {
    usdtAmount?: number;
    brxAmount?: number;
    propertyId?: number;
    tokenAmount?: number;
  };
}

interface WebhookPayload {
  event: BlockchainEvent;
  chainId: number;
  contractAddress: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { event, chainId, contractAddress }: WebhookPayload = await req.json();
    
    console.log('Received blockchain event:', {
      eventType: event.eventType,
      userAddress: event.userAddress,
      txHash: event.transactionHash,
      chainId,
      contractAddress
    });

    // Process different event types
    switch (event.eventType) {
      case 'TokenExchange':
        await handleTokenExchange(event);
        break;
      case 'PropertyInvestment':
        await handlePropertyInvestment(event);
        break;
      case 'PropertyWithdrawal':
        await handlePropertyWithdrawal(event);
        break;
      default:
        console.log('Unknown event type:', event.eventType);
    }

    // Log the event to our database
    const { error: logError } = await supabase
      .from('blockchain_events')
      .insert({
        event_type: event.eventType,
        user_address: event.userAddress,
        transaction_hash: event.transactionHash,
        block_number: event.blockNumber,
        chain_id: chainId,
        contract_address: contractAddress,
        event_data: event.data,
        processed_at: new Date().toISOString()
      });

    if (logError) {
      console.error('Error logging blockchain event:', logError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Event processed successfully',
        eventType: event.eventType 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error processing blockchain event:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function handleTokenExchange(event: BlockchainEvent) {
  const { userAddress, data, transactionHash } = event;
  const { usdtAmount, brxAmount } = data;

  console.log(`Processing token exchange: ${usdtAmount} USDT -> ${brxAmount} BRX for user ${userAddress}`);

  try {
    // Update user's BRX balance in our database
    const { error: balanceError } = await supabase
      .from('user_balances')
      .upsert({
        user_address: userAddress,
        brx_balance: brxAmount,
        last_updated: new Date().toISOString()
      }, {
        onConflict: 'user_address',
        ignoreDuplicates: false
      });

    if (balanceError) {
      console.error('Error updating user balance:', balanceError);
      throw balanceError;
    }

    // Record the transaction
    const { error: txError } = await supabase
      .from('user_transactions')
      .insert({
        user_address: userAddress,
        transaction_type: 'token_purchase',
        usdt_amount: usdtAmount,
        brx_amount: brxAmount,
        transaction_hash: transactionHash,
        status: 'completed',
        created_at: new Date().toISOString()
      });

    if (txError) {
      console.error('Error recording transaction:', txError);
      throw txError;
    }

    console.log(`Successfully processed token exchange for user ${userAddress}`);

  } catch (error) {
    console.error('Error in handleTokenExchange:', error);
    throw error;
  }
}

async function handlePropertyInvestment(event: BlockchainEvent) {
  const { userAddress, data, transactionHash } = event;
  const { propertyId, brxAmount } = data;

  console.log(`Processing property investment: ${brxAmount} BRX in property ${propertyId} for user ${userAddress}`);

  try {
    // Update user's property investment
    const { error: investmentError } = await supabase
      .from('user_property_investments')
      .upsert({
        user_address: userAddress,
        property_id: propertyId,
        brx_invested: brxAmount,
        last_updated: new Date().toISOString()
      }, {
        onConflict: 'user_address,property_id',
        ignoreDuplicates: false
      });

    if (investmentError) {
      console.error('Error updating investment:', investmentError);
      throw investmentError;
    }

    // Record the investment transaction
    const { error: txError } = await supabase
      .from('user_transactions')
      .insert({
        user_address: userAddress,
        transaction_type: 'property_investment',
        property_id: propertyId,
        brx_amount: brxAmount,
        transaction_hash: transactionHash,
        status: 'completed',
        created_at: new Date().toISOString()
      });

    if (txError) {
      console.error('Error recording investment transaction:', txError);
      throw txError;
    }

    console.log(`Successfully processed property investment for user ${userAddress}`);

  } catch (error) {
    console.error('Error in handlePropertyInvestment:', error);
    throw error;
  }
}

async function handlePropertyWithdrawal(event: BlockchainEvent) {
  const { userAddress, data, transactionHash } = event;
  const { propertyId, tokenAmount, brxAmount } = data;

  console.log(`Processing property withdrawal: ${tokenAmount} tokens (${brxAmount} BRX) from property ${propertyId} for user ${userAddress}`);

  try {
    // Update user's property investment (reduce the amount)
    const { data: currentInvestment, error: fetchError } = await supabase
      .from('user_property_investments')
      .select('brx_invested')
      .eq('user_address', userAddress)
      .eq('property_id', propertyId)
      .single();

    if (fetchError) {
      console.error('Error fetching current investment:', fetchError);
      throw fetchError;
    }

    const newBrxInvested = Math.max(0, (currentInvestment?.brx_invested || 0) - (brxAmount || 0));

    const { error: investmentError } = await supabase
      .from('user_property_investments')
      .update({
        brx_invested: newBrxInvested,
        last_updated: new Date().toISOString()
      })
      .eq('user_address', userAddress)
      .eq('property_id', propertyId);

    if (investmentError) {
      console.error('Error updating investment after withdrawal:', investmentError);
      throw investmentError;
    }

    // Record the withdrawal transaction
    const { error: txError } = await supabase
      .from('user_transactions')
      .insert({
        user_address: userAddress,
        transaction_type: 'property_withdrawal',
        property_id: propertyId,
        brx_amount: brxAmount,
        token_amount: tokenAmount,
        transaction_hash: transactionHash,
        status: 'completed',
        created_at: new Date().toISOString()
      });

    if (txError) {
      console.error('Error recording withdrawal transaction:', txError);
      throw txError;
    }

    console.log(`Successfully processed property withdrawal for user ${userAddress}`);

  } catch (error) {
    console.error('Error in handlePropertyWithdrawal:', error);
    throw error;
  }
}