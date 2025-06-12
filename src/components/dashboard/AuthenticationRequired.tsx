
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, User, Wallet } from "lucide-react";

interface AuthenticationRequiredProps {
  connectWallet: () => void;
}

const AuthenticationRequired = ({ connectWallet }: AuthenticationRequiredProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-4">Investment Dashboard</h1>
          <p className="text-slate-300 text-lg mb-8">
            Access your real estate portfolio and track your investments
          </p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-slate-100 mb-3">
                  Authentication Required
                </h2>
                <p className="text-slate-300 mb-6">
                  To view your investment dashboard, please sign in to your account or connect your crypto wallet.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-slate-700/50 border-slate-600 p-6">
                  <div className="text-center">
                    <User className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-100 mb-2">Sign In</h3>
                    <p className="text-sm text-slate-300 mb-4">
                      Access your account with email and password
                    </p>
                    <Button 
                      onClick={() => window.location.href = '/auth'}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Sign In
                    </Button>
                  </div>
                </Card>

                <Card className="bg-slate-700/50 border-slate-600 p-6">
                  <div className="text-center">
                    <Wallet className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-100 mb-2">Connect Wallet</h3>
                    <p className="text-sm text-slate-300 mb-4">
                      Connect your crypto wallet to get started
                    </p>
                    <Button 
                      onClick={connectWallet}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      Connect Wallet
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-slate-400">
                  Don't have an account?{' '}
                  <a href="/auth" className="text-blue-400 hover:text-blue-300">
                    Create one here
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthenticationRequired;
