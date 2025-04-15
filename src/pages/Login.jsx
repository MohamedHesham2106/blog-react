import React, { useState, useTransition } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";
import { toast } from "sonner";

import { LoginSVG } from "../components/svg/login-svg";
import { Nirvana } from "../components/svg/logo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../hooks/use-auth";
import { loginUtil } from "../libs/auth.service";
import { loginSchema } from "../libs/schemas";

export default function Login() {
  // states
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { setAuth, isAuthenticated } = useAuth();

  // Form Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // mutation (POST)
  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: loginUtil,
    onSuccess: ({ token }) => {
      reset();
      setAuth(token);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  // handler
  const onSubmit = async (data) => {
    if (isValid) startTransition(() => mutate(data));
  };

  // protected route

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <main className="h-dvh flex items-center justify-between flex-col pt-8 pb-16 overflow-hidden ">
      <Link to="/">
        <Nirvana width="w-34" />
      </Link>

      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto relative"
        >
          <div className="absolute -left-15 -top-15">
            <LoginSVG />
          </div>

          <div className="border border-border px-8 py-6 space-y-6 rounded-lg bg-background relative overflow-hidden">
            <div className="space-y-4">
              <h1 className="text-3xl font-playfair font-bold">Login</h1>
              <p className="text-sm text-muted-foreground font-poppins">
                Enter your credentials to access your account
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                    className="text-primary text-xs font-poppins tracking-wider"
                  >
                    {errors.email.message}
                  </motion.span>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    className="pr-10"
                    autoComplete="true"
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {errors.password && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                    className="text-primary text-xs font-poppins tracking-wider"
                  >
                    {errors.password.message}
                  </motion.span>
                )}
              </div>
              <Button disabled={isPending} className="rounded-md" type="submit">
                {isPending || isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
              <div className="flex justify-between border-t border-border pt-4 items-center">
                <p className="text-sm text-muted-foreground font-poppins">
                  Don&apos;t have an account?
                </p>
                <Link to="/register">
                  <Button type="button" variant="secondary">
                    Register
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
