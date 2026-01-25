import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "BookWise - Manage Accounting team",
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

                <p className="text-md sm:text-2xl md:text-3xl font-semibold text-primary/90 tracking-wide uppercase">
                    Sorry, the page was not found.
                </p>

                <p className="mt-3 sm:mt-4 text-sm text-primary/80 leading-relaxed">
                    Looks like the page might have been removed, renamed, or doesn&apos;t exist.
                </p>

                <div className="mt-6 sm:mt-8 flex justify-center items-center">
                    <Link href="/" 
                    className={cn(buttonVariants({ className:"bg-[#0033ffe6] uppercase shadow-none", variant: "default", }))}>
                    <ArrowLeft className="mr-1 h-4 w-4" />
                        Back to home
                    </Link>
                    <Link href=""
                    className={cn(buttonVariants({ className:"ml-4 uppercase shadow-none", variant: "outline", }))}>
                        Report the issue
                    </Link>
                </div>
            </div>
        </section>
    );
}
