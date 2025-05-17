"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSubmitBtn from "@/hooks/use-submit-btn";
// import { useSignUp } from "@clerk/nextjs";

// Define validation schema using Zod
const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
    confirmPassword: z.string(),
    username: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const router = useRouter();

  const {
    SubmitBtn,
    handleBtnText,
    handleIsLoadingFalse,
    handleIsLoadingTrue,
  } = useSubmitBtn({ initialText: "Submit" });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    handleIsLoadingTrue();
    try {
      await axios.post("api/sign-up", {
        email: values.email,
        password: values.confirmPassword,
        username: values.username,
      });
      handleBtnText("Success");
      handleIsLoadingFalse();
      router.push("/sign-in");
    } catch (error) {
      handleBtnText("Try Again");
      handleIsLoadingFalse();
      console.error("Form submission error", error);
      toast.error("Sign-up failed.");
    }
  }

  return (
    <div className="flex h-fully min-h-[100vh]y w-full items-center justify-center px-4y bg-gradient-to-bry from-blue-50y to-indigo-50y">
      <Card className="mx-auto w-full py-5 max-w-md border border-gray-100 shadow-xly bg-white/70 backdrop-blur-sm">
        {/* <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight text-center">
            Student Study Guide
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Create your account to get started
          </CardDescription>
        </CardHeader> */}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                      <FormLabel htmlFor="username" className="text-sm font-medium">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="johndoe"
                          type="text"
                          autoComplete="username"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                      <FormLabel htmlFor="email" className="text-sm font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="email"
                          autoComplete="email"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                      <FormLabel htmlFor="password" className="text-sm font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="Create a password"
                          autoComplete="new-password"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                      <FormLabel htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="confirmPassword"
                          placeholder="Confirm your password"
                          autoComplete="new-password"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SubmitBtn />
              </div>
            </form>
          </Form>
          {/* <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
