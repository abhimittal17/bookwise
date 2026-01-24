import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Page not found - BookWise",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {

       
  return (
    <section className="flex items-center justify-center  min-h-screen">
      <div className="text-center max-w-lg sm:max-w-3xl">
        <p className="text-base text-primary/80">Oops…</p>

        <h1 className="text-[110px] sm:text-[160px] md:text-[210px] font-light tracking-tight text-primary leading-none">
          404
        </h1>

        <p className="text-md sm:text-2xl md:text-4xl font-semibold text-primary/90 tracking-wide uppercase">
         Uh oh!, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        <p className="mt-3 sm:mt-4 text-sm text-primary/80 leading-relaxed max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been removed, renamed, or doesn&apos;t exist.
        </p>
   
<div>
<Button variant="default" >Back to home</Button>
<Button variant="outline" className="ml-4">Contact Support</Button>
        <Link
          href="/"
          className="inline-flex mt-6 sm:mt-8 bg-primary rounded-md uppercase text-white text-sm  font-medium px-6 py-3 hover:bg-black/80 transition-colors"
        >
          Back to home
        </Link>
        


</div>
      </div>
    </section>
  );
}
