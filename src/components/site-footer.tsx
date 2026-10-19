import Image from "next/image";
import Link from "next/link";
import { Button } from "@/design-system/components/ui/button";
import paggoLogo from "@/design-system/assets/brand/paggo-white.svg";

const paggoWebsite = "https://www.paggo.com.br";

type FooterLink = Readonly<{ label: string; path: string }>;
type FooterGroup = Readonly<{ id: string; title: string; links: readonly FooterLink[] }>;

const navigationGroups: readonly FooterGroup[] = [
  {
    id: "pages", title: "Páginas",
    links: [
      { label: "Home", path: "/" },
      { label: "Contato", path: "/contato" },
      { label: "Carreiras", path: "/carreiras" },
      { label: "FAQ", path: "/#faq" },
      { label: "Central de Segurança", path: "/central-de-seguranca" },
    ],
  },
  {
    id: "products", title: "Produtos",
    links: [
      { label: "Tesouraria", path: "/tesouraria" },
      { label: "Contas a Pagar", path: "/pagamentos" },
      { label: "Contas a Receber", path: "/recebimentos" },
      { label: "Central de Documentos", path: "/central-de-documentos" },
      { label: "Inteligência Artificial", path: "/ia" },
      { label: "Carteiras Digitais", path: "/carteiras" },
      { label: "Controladoria", path: "/controladoria" },
      { label: "Reforma tributária", path: "/reforma-tributaria" },
    ],
  },
  {
    id: "content", title: "Conteúdos",
    links: [
      { label: "Blog", path: "/blog" },
      { label: "Guias e estudos", path: "/guias" },
      { label: "Ferramentas", path: "/ferramentas" },
      { label: "Simulador Reforma Tributária", path: "/simulador-reforma-tributaria" },
    ],
  },
  {
    id: "solutions", title: "Soluções",
    links: [
      { label: "Contas a Pagar e Receber", path: "/contas-a-pagar-e-receber" },
      { label: "Gestão multi-CNPJ", path: "/orquestrador-financeiro-da-construcao-civil" },
      { label: "Software para Construtora", path: "/software-para-construtora" },
      { label: "Alternativa ao BPO Financeiro", path: "/bpo-financeiro" },
    ],
  },
];

const legalLinks: readonly FooterLink[] = [
  { label: "Termos de Uso", path: "/terms-conditions" },
  { label: "Política de Privacidade", path: "/privacy-policy" },
  { label: "Política de Cookies", path: "/politica-de-cookies" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" aria-label="Rodapé">
      <span className="footer-glow" aria-hidden="true" />
      <div className="footer-container">
        <FooterCallToAction />
        <FooterNavigation year={year} />
        <FooterLegal year={year} />
      </div>
    </footer>
  );
}

function FooterCallToAction() {
  return (
    <section className="footer-cta" aria-labelledby="footer-cta-title">
      <h2 id="footer-cta-title">Quem constrói o futuro não pode manter o financeiro no passado.</h2>
      <p>Compartilhe o contexto da sua operação e descubra como a Paggo pode ajudar sua empresa.</p>
      <Button asChild variant="brand" size="lg" className="mt-2 h-12 px-6 text-base font-normal sm:px-14 sm:text-lg">
        <Link href="/#cadastro">Fale com a Paggo</Link>
      </Button>
    </section>
  );
}

function FooterNavigation({ year }: { year: number }) {
  return (
    <div className="footer-navigation">
      <div className="footer-brand-column">
        <Link href="/" className="footer-brand" aria-label="Paggo · início">
          <Image src={paggoLogo} alt="Paggo" width={139} height={17} />
        </Link>
        <span className="footer-copyright">Todos os direitos reservados © {year}</span>
      </div>
      {navigationGroups.map((group) => <FooterNavigationGroup key={group.id} group={group} />)}
    </div>
  );
}

function FooterNavigationGroup({ group }: { group: FooterGroup }) {
  return (
    <nav className="footer-column" aria-labelledby={`footer-${group.id}-title`}>
      <h3 id={`footer-${group.id}-title`}>{group.title}</h3>
      <ul className="footer-links">
        {group.links.map((link) => (
          <li key={link.path}><a href={`${paggoWebsite}${link.path}`}>{link.label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

function FooterLegal({ year }: { year: number }) {
  return (
    <div className="footer-legal">
      <div className="footer-legal-bar">
        <span className="footer-copyright">Todos os direitos reservados © {year}</span>
        <nav className="footer-legal-navigation" aria-label="Políticas do site oficial da Paggo">
          <FooterSocialLink />
          <ul className="footer-policy-links">
            {legalLinks.map((link) => <li key={link.path}><a href={`${paggoWebsite}${link.path}`}>{link.label}</a></li>)}
          </ul>
        </nav>
      </div>
      <FooterCompanyDetails />
    </div>
  );
}

function FooterSocialLink() {
  return (
    <a className="footer-social-link" href="https://www.linkedin.com/company/paggotecnologia" target="_blank" rel="noopener noreferrer" aria-label="Paggo no LinkedIn (abre em nova aba)">
      <svg className="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect className="footer-social-background" x="2" y="2" width="20" height="20" rx="2" />
        <path className="footer-social-mark" d="M8.18 9.25H5.45V18h2.73V9.25ZM6.82 4.88a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24ZM18.55 18h-2.72v-4.26c0-1.02-.02-2.33-1.42-2.33-1.42 0-1.64 1.11-1.64 2.26V18h-2.73V9.25h2.62v1.2h.04c.37-.69 1.26-1.42 2.6-1.42 2.77 0 3.28 1.82 3.28 4.19V18Z" />
      </svg>
    </a>
  );
}

function FooterCompanyDetails() {
  return (
    <div className="footer-company-details">
      <p>Paggo Tecnologia LTDA · CNPJ 47.883.739/0001-52 · Avenida Paulista, 509, Sala 1513, Bela Vista, São Paulo, SP, CEP 01311-910</p>
      <p>Projeto independente para o case de qualificação comercial. Links institucionais e políticas direcionam ao site oficial da Paggo.</p>
    </div>
  );
}
