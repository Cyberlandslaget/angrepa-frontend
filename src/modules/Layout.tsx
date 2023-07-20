import Navigation from "components/Navigation";
import { ReactNode } from "react";

export default function Layout({ children } : { children: ReactNode }){
  return (
  <main className="w-full h-full grid grid-cols-1 [grid-template-rows:2.75rem_1fr] gap-3">
    <Navigation />
    { children }
  </main>
  );
}