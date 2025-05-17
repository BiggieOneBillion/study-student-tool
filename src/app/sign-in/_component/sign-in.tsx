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
import { useAuthStore } from "@/store/user-store";
import useSubmitBtn from "@/hooks/use-submit-btn";
import { useRouter } from "next/navigation";

// Improved schema with additional validation rules
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});


export default function Signin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    SubmitBtn,
    handleBtnText,
    handleIsLoadingFalse,
    handleIsLoadingTrue,
  } = useSubmitBtn({ initialText: "Submit" });

  const setDetails = useAuthStore((state) => state.setDetails);


  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    handleIsLoadingTrue();
    try {
      const response = await axios.post("api/sign-in", values);
      setDetails({
        id: response.data._id,
        email: response.data.email,
        username: response.data.username,
      });

      const res = await axios.post("api/sign-in/api-verify");
      if (res.status === 200) {
        toast.success('Signing in successful!')
        handleBtnText("Success");
        handleIsLoadingFalse();
        // also save the api in the local storage so the user can use it will on the app
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
   
    } catch (error) {
      handleBtnText("Try Again");
      handleIsLoadingFalse();
      toast.error("Failed to sign in. Please try again.");
    }
  }

  return (
    <div className="flex h-full min-h-[100vh]y w-full flex-col items-center justify-center px-4y bg-gradient-to-bry from-blue-50y to-indigo-50y">
      <Card className="mx-auto w-full py-5 max-w-md border border-gray-100 shadow-xly bg-white/70 backdrop-blur-sm">
        {/* <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight text-center">
            Student Study Guide
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader> */}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4">
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
                          placeholder="Enter your password"
                          autoComplete="current-password"
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
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
