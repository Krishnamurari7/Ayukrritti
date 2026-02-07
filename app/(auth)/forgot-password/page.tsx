"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, ArrowLeft, Loader2, KeyRound, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSent(true);
      toast.success("Password reset link sent to your email");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-900 dark:to-orange-950">
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] dark:bg-grid-gray-100/[0.02] bg-[size:20px_20px]" />
      <Card className="w-full max-w-md relative shadow-2xl border-orange-100 dark:border-orange-900">
        <CardHeader className="space-y-1 pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="flex items-center justify-center mb-2">
            <div className="p-2.5 sm:p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg">
              {sent ? (
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : (
                <KeyRound className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              )}
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-br from-orange-600 to-amber-600 bg-clip-text text-transparent">
            {sent ? "Check Your Email" : "Reset Password"}
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            {sent
              ? "We've sent you a password reset link"
              : "Enter your email to receive a password reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          {!sent ? (
            <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-10 sm:h-11 text-sm sm:text-base"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-10 sm:h-11 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground text-[10px] sm:text-xs">
                    Remember your password?
                  </span>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full h-10 sm:h-11 text-sm sm:text-base"
              >
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </Button>
            </form>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              <div className="rounded-lg bg-green-50 dark:bg-green-950/30 p-3 sm:p-4 border border-green-200 dark:border-green-900">
                <p className="text-xs sm:text-sm text-center text-green-800 dark:text-green-200">
                  We've sent a password reset link to
                </p>
                <p className="text-xs sm:text-sm text-center font-semibold text-green-900 dark:text-green-100 mt-1 break-all">
                  {email}
                </p>
              </div>
              
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                <p className="text-center">
                  Please check your email and follow the instructions to reset your password.
                </p>
                <p className="text-center text-[10px] sm:text-xs">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              <Button
                asChild
                className="w-full h-10 sm:h-11 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-sm sm:text-base"
              >
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </Button>

              <Button
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
                variant="outline"
                className="w-full h-10 sm:h-11 text-sm sm:text-base"
              >
                Try Different Email
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
