import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { QrCode, Smartphone, Copy, Check, Loader2, AlertTriangle } from 'lucide-react';

interface TwoFactorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TwoFactorModal = ({ open, onOpenChange }: TwoFactorModalProps) => {
  const [step, setStep] = useState<'enable' | 'verify' | 'disabled'>('enable');
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      checkMFAStatus();
    }
  }, [open]);

  const checkMFAStatus = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) {
        console.error('Error checking MFA status:', error);
        return;
      }

      const hasTOTP = data?.totp?.length > 0;
      setStep(hasTOTP ? 'disabled' : 'enable');
    } catch (error) {
      console.error('Error in checkMFAStatus:', error);
    }
  };

  const enableMFA = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Authenticator App'
      });

      if (error) {
        toast.error(error.message || 'Failed to enable 2FA');
        return;
      }

      if (data) {
        setQrCode(data.totp.qr_code);
        setSecret(data.totp.secret);
        setStep('verify');
        toast.success('Scan the QR code with your authenticator app');
      }
    } catch (error) {
      console.error('Error enabling MFA:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const verifyMFA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const factor = factors?.totp?.[0];

      if (!factor) {
        toast.error('No MFA factor found');
        return;
      }

      const { error } = await supabase.auth.mfa.verify({
        factorId: factor.id,
        challengeId: factor.id,
        code: verificationCode
      });

      if (error) {
        toast.error('Invalid verification code. Please try again.');
        return;
      }

      toast.success('Two-factor authentication enabled successfully!');
      setStep('disabled');
      setVerificationCode('');
    } catch (error) {
      console.error('Error verifying MFA:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const disableMFA = async () => {
    setLoading(true);
    try {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const factor = factors?.totp?.[0];

      if (!factor) {
        toast.error('No MFA factor found');
        return;
      }

      const { error } = await supabase.auth.mfa.unenroll({
        factorId: factor.id
      });

      if (error) {
        toast.error(error.message || 'Failed to disable 2FA');
        return;
      }

      toast.success('Two-factor authentication disabled');
      setStep('enable');
    } catch (error) {
      console.error('Error disabling MFA:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    toast.success('Secret copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep('enable');
    setVerificationCode('');
    setQrCode('');
    setSecret('');
    setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] glass-card border border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Two-Factor Authentication
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === 'enable' && 'Add an extra layer of security to your account'}
            {step === 'verify' && 'Verify your authenticator app setup'}
            {step === 'disabled' && 'Manage your two-factor authentication'}
          </DialogDescription>
        </DialogHeader>

        {step === 'enable' && (
          <div className="space-y-4">
            <Alert className="border-primary/20 bg-primary/10">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-foreground">
                Two-factor authentication adds an extra layer of security to your account.
                You'll need an authenticator app like Google Authenticator or Authy.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <h4 className="text-foreground font-medium">Popular Authenticator Apps:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Google Authenticator</li>
                <li>• Microsoft Authenticator</li>
                <li>• Authy</li>
                <li>• 1Password</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="border-border"
              >
                Cancel
              </Button>
              <Button
                onClick={enableMFA}
                disabled={loading}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4 mr-2" />
                    Enable 2FA
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <div className="text-center space-y-4">
              <h4 className="text-foreground font-medium">Scan QR Code</h4>
              {qrCode && (
                <div className="flex justify-center">
                  <img 
                    src={qrCode} 
                    alt="2FA QR Code" 
                    className="w-48 h-48 border border-border rounded-lg"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">
                  Or enter this secret manually:
                </Label>
                <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg border border-border">
                  <code className="flex-1 text-sm text-foreground font-mono">
                    {secret}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copySecret}
                    className="h-8 w-8 p-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationCode" className="text-foreground">
                Enter verification code from your app:
              </Label>
              <Input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="bg-background/50 border-border text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setStep('enable')}
                className="border-border"
              >
                Back
              </Button>
              <Button
                onClick={verifyMFA}
                disabled={loading || verificationCode.length !== 6}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Enable'
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 'disabled' && (
          <div className="space-y-4">
            <Alert className="border-green-500/20 bg-green-500/10">
              <Check className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-foreground">
                Two-factor authentication is currently enabled for your account.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Your account is protected with two-factor authentication. 
                You'll need to enter a code from your authenticator app when signing in.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="border-border"
              >
                Close
              </Button>
              <Button
                variant="outline"
                onClick={disableMFA}
                disabled={loading}
                className="border-destructive text-destructive hover:bg-destructive/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Disabling...
                  </>
                ) : (
                  'Disable 2FA'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};