import Link from "next/link";
import { cookies } from "next/headers";

export const metadata = {
  title: "Page not found - Bookwise",
  description: "The page you are looking for does not exist.",
};

export default async function NotFound() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("session")?.value;
  const isLoggedIn = Boolean(token); 
  const homeLink = isLoggedIn ? "/home" : "/sign-in";
       
  return (
    <section className="flex items-center justify-center  min-h-screen">
      <div className="text-center max-w-lg sm:max-w-3xl">
        <p className="text-base text-primary/80">Oops…</p>

        <h1 className="text-[110px] sm:text-[160px] md:text-[210px] font-light tracking-tight text-primary leading-none">
          404
        </h1>

        <p className="text-md sm:text-2xl md:text-4xl font-semibold text-primary/90 tracking-wide uppercase">
          Sorry, the page was not found.
        </p>

        <p className="mt-3 sm:mt-4 text-sm text-primary/80 leading-relaxed">
          Looks like this page has been moved or deleted.
        </p>
   

        <Link
          href={homeLink}
          className="inline-flex mt-6 sm:mt-8 bg-primary rounded-md uppercase text-white text-sm  font-medium px-6 py-3 hover:bg-black/80 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
