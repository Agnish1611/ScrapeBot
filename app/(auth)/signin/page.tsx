"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";
import { signInSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/auth-client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import { ErrorContext } from "@better-fetch/fetch";
// import { FaGithub } from "react-icons/fa";

export default function SignIn() {
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCallbackUrl(params.get("callbackUrl") || "/");
  }, []);

  const { toast } = useToast();
  const [pendingCredentials, setPendingCredentials] = useState(false);
  // const [pendingGithub, setPendingGithub] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleCredentialsSignIn = async (
    values: z.infer<typeof signInSchema>
  ) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setPendingCredentials(true);
        },
        onSuccess: async () => {
          router.push(decodeURI(callbackUrl));
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          console.log(ctx);
          toast({
            title: "Something went wrong",
            description: ctx.error.message ?? "Something went wrong.",
            variant: "destructive",
          });
        },
      }
    );
    setPendingCredentials(false);
  };

  // const handleSignInWithGithub = async () => {
  //   await authClient.signIn.social(
  //     {
  //       provider: "github",
  //     },
  //     {
  //       onRequest: () => {
  //         setPendingGithub(true);
  //       },
  //       onSuccess: async () => {
  //         router.push(decodeURI(callbackUrl));
  //         router.refresh();
  //       },
  //       onError: (ctx: ErrorContext) => {
  //         toast({
  //           title: "Something went wrong",
  //           description: ctx.error.message ?? "Something went wrong.",
  //           variant: "destructive",
  //         });
  //       },
  //     }
  //   );
  //   setPendingGithub(false);
  // };

  return (
    <div className="grow flex items-center justify-center p-4 h-dvh">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* <div className="m-4 flex flex-col justify-center items-center gap-5">
            <div className="flex w-full justify-center items-center gap-2">
              <div className="basis-1/3 h-[1px] bg-zinc-300"></div>
              <div className="font-semibold text-xs">OR</div>
              <div className="basis-1/3 h-[1px] bg-zinc-300"></div>
            </div>
            <LoadingButton
              pending={pendingGithub}
              onClick={handleSignInWithGithub}
            >
              Continue with GitHub <FaGithub />
            </LoadingButton>
          </div> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCredentialsSignIn)}
              className="space-y-6"
            >
              {["email", "password"].map((field) => (
                <FormField
                  control={form.control}
                  key={field}
                  name={field as keyof z.infer<typeof signInSchema>}
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      <FormLabel>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={field === "password" ? "password" : "email"}
                          placeholder={`Enter your ${field}`}
                          {...fieldProps}
                          autoComplete={
                            field === "password" ? "current-password" : "email"
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <LoadingButton pending={pendingCredentials}>
                Sign in
              </LoadingButton>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            <Link href="/signup" className="text-primary hover:underline">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
