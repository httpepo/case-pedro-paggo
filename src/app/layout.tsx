import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/design-system/components/ui/badge";
import { Button } from "@/design-system/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import paggoLogo from "@/design-system/assets/brand/paggo-white.svg";
import paggoFavicon from "@/design-system/assets/brand/favicon-paggo.svg";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paggo | Case de qualificação",
  description: "Base de desenvolvimento do agente de qualificação comercial da Paggo.",
  robots: { index: false, follow: false },
  icons: {
    icon: { url: paggoFavicon.src, type: "image/svg+xml", sizes: "any" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        <header className="site-header">
          <Link href="/" className="brand" aria-label="Paggo · início"><Image src={paggoLogo} alt="Paggo" width={139} height={17} priority /></Link>
          <nav aria-label="Navegação principal">
            <Button asChild variant="ghost" size="sm"><Link href="/">Atendimento</Link></Button>
            <Button asChild variant="ghost" size="sm"><Link href="/painel">Painel interno</Link></Button>
          </nav>
          <Badge variant="outline" className="case-badge">Case técnico</Badge>
        </header>
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
