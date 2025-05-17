// import { redirect } from "next/navigation";
import HomePage from "./(home)/home";

export default function Home() {
  // redirect("/dashboard");
  // return null;
  // return (
  //   <div className="flex h-[100vh] flex-col items-center justify-center">
  //     <h1 className="font-mono text-3xl">Home Page</h1>
  //     <Link href={"/sign-in"}>
  //       <Button className="capitalize">Click to sign in</Button>
  //     </Link>
  //   </div>
  // );
  return <HomePage />;
}
