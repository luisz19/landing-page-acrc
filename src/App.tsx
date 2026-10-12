/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import claudiaImg from "./images/claudia.webp";
import {
  ArrowRight,
  Check,
  Copy,
  FileText,
  MessageCircle,
  ShieldCheck,
  Building2,
  X,
  Menu,
  ChevronRight,
  Clock,
  Linkedin,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  documentsNeeded: string[];
  estimatedTime: string;
  targetAudience: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'formalizacao-mei-me',
    number: '01',
    title: 'Formalização e regularização de MEI e ME',
    shortDesc:
      'Auxílio nos processos de formalização e regularização de microempreendedores individuais e microempresas.',
    fullDesc:
      'Acompanhamento completo para abertura de CNPJ, alteração cadastral, desenquadramento de MEI para Microempresa (ME) ou regularização de pendências junto à Receita Federal, Prefeitura e Junta Comercial.',
    deliverables: [
      'Análise de viabilidade e escolha correta de CNAEs',
      'Emissão do CNPJ e Certificado da Condição de Microempreendedor (CCMEI)',
      'Inscrição Municipal para emissão de Notas Fiscais de Serviço',
      'Levantamento e parcelamento de débitos em atraso',
    ],
    documentsNeeded: [
      'RG e CPF ou CNH válida',
      'Comprovante de endereço residencial e comercial',
      'Acesso à conta Gov.br (nível Prata ou Ouro)',
    ],
    estimatedTime: '24h a 5 dias úteis (conforme enquadramento)',
    targetAudience: 'Autônomos, MEIs em crescimento e Microempresas',
  },
  {
    id: 'emissao-das',
    number: '02',
    title: 'Emissão de Documento de Arrecadação do Simples Nacional (DAS)',
    shortDesc:
      'Suporte para emissão do documento de arrecadação do Simples Nacional.',
    fullDesc:
      'Gestão mensal pontual da sua guia DAS e apuração de impostos do Simples Nacional, evitando multas, juros ou exclusão indevida do regime tributário simplificado.',
    deliverables: [
      'Geração e envio mensal da guia DAS antes do vencimento (dia 20)',
      'Recálculo de guias vencidas com atualização automática',
      'Conferência de alíquotas e anexos do Simples Nacional',
      'Monitoramento de regularidade fiscal mensal',
    ],
    documentsNeeded: [
      'Número do CNPJ',
      'Relatório de notas fiscais emitidas no mês (para ME)',
    ],
    estimatedTime: 'Emissão no mesmo dia útil',
    targetAudience: 'MEI e Microempresas optantes pelo Simples Nacional',
  },
  {
    id: 'declaracao-anual-dasn',
    number: '03',
    title: 'Emissão de declaração anual de faturamento',
    shortDesc:
      'Auxílio na emissão da declaração anual de faturamento do MEI.',
    fullDesc:
      'Elaboração e transmissão da Declaração Anual Simplificada para o Microempreendedor Individual (DASN-SIMEI), consolidando receitas de comércio, indústria e prestação de serviços com total conformidade.',
    deliverables: [
      'Consolidação do faturamento bruto anual (Comércio e Serviços)',
      'Verificação do limite de faturamento anual (R$ 81.000,00 proporcional)',
      'Transmissão oficial e entrega do Recibo de Declaração',
      'Regularização de declarações de anos anteriores em atraso',
    ],
    documentsNeeded: [
      'CNPJ e resumo das vendas/serviços do ano-calendário',
      'Informação sobre contratação de funcionário no período',
    ],
    estimatedTime: 'Até 24 horas úteis',
    targetAudience: 'Microempreendedores Individuais (MEI)',
  },
  {
    id: 'certificado-digital',
    number: '04',
    title: 'Emissão de certificado digital e-CPF e e-CNPJ',
    shortDesc:
      'Orientação e suporte para emissão de certificados digitais para pessoas físicas e jurídicas.',
    fullDesc:
      'Assessoria completa desde a escolha do modelo ideal (A1 em arquivo ou A3 em token/cartão) até a validação por videoconferência e instalação no seu computador para assinatura de documentos e emissão de notas.',
    deliverables: [
      'Agendamento de videoconferência com certificadora credenciada ICP-Brasil',
      'Conferência prévia da documentação para aprovação sem entraves',
      'Suporte na instalação e configuração do certificado A1 no computador',
      'Teste prático no portal e-CAC ou emissor de Nota Fiscal',
    ],
    documentsNeeded: [
      'Documento de identidade oficial com foto (CNH ou RG recente)',
      'Cartão CNPJ e Contrato Social / CCMEI (para e-CNPJ)',
    ],
    estimatedTime: 'Emissão em até 1 hora após videoconferência',
    targetAudience: 'Pessoas Físicas (e-CPF) e Empresas (e-CNPJ)',
  },
];

const CONTACT_INFO = {
  whatsappDisplay: '(87) 99182-8922',
  whatsappNumber: '5587991828922',
  linkedinDisplay: 'Ana Cláudia Rodrigues Cruz - Contadora',
  linkedinUrl: 'https://www.linkedin.com/in/ana-cl%C3%A1udia-rodrigues-cruz-752a58236/',
};

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Interactive MEI Limit & Regularization Quick Simulator state
  const [simModalOpen, setSimModalOpen] = useState(false);
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>('5500');
  const [monthsActive, setMonthsActive] = useState<number>(12);
  const [hasPendingDas, setHasPendingDas] = useState<boolean>(false);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopiedChannel(label);
    setTimeout(() => setCopiedChannel(null), 2500);
  };

  const openWhatsApp = (serviceTitle?: string) => {
    const text = serviceTitle
      ? `Olá, Ana Cláudia! Gostaria de atendimento sobre: ${serviceTitle}.`
      : 'Olá, Ana Cláudia! Gostaria de atendimento contábil para minha empresa.';
    const url = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Calculate MEI annual proportionality
  const numericMonthly = parseFloat(monthlyRevenue.replace(/\D/g, '')) || 0;
  const projectedAnnual = numericMonthly * monthsActive;
  const proportionalLimit = monthsActive * 6750; // R$ 81.000 / 12 = R$ 6.750/mês
  const usagePercentage = proportionalLimit > 0 ? Math.min(100, Math.round((projectedAnnual / proportionalLimit) * 100)) : 0;
  const isOverLimit = projectedAnnual > proportionalLimit;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-[#262729] selection:bg-[#D2B48C]/30 selection:text-[#262729]">
      {/* ========================================================================
          CABEÇALHO / HEADER
          ======================================================================== */}
      <header className="sticky top-0 z-40 bg-[#fcfbf9]/95 backdrop-blur-sm border-b border-[#eeebe6] transition-all duration-300">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 h-[72px] sm:h-[76px] flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Lockup */}
          <a href="#inicio" className="flex flex-col group shrink-0 min-w-0">
            <span className="font-serif text-[1.15rem] sm:text-[1.35rem] font-semibold tracking-[-0.01em] text-[#262729] leading-[1.2] group-hover:text-[#3f4044] transition-colors truncate">
              Ana Cláudia Rodrigues Cruz
            </span>
            <span className="text-[0.66rem] sm:text-[0.72rem] tracking-[0.08em] uppercase text-[#6b6d72] mt-[2px]">
              Ciências Contábeis
            </span>
          </a>

          {/* Desktop Navigation Menu */}
          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-6 lg:gap-8">
            <a
              href="#servicos"
              className="text-[0.925rem] font-normal text-[#3f4044] hover:text-[#262729] relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D2B48C] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap shrink-0"
            >
              Serviços
            </a>
            <a
              href="#contato"
              className="text-[0.925rem] font-normal text-[#3f4044] hover:text-[#262729] relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D2B48C] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap shrink-0"
            >
              Contato
            </a>
            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="inline-flex items-center justify-center px-5 py-2.5 text-[0.85rem] font-medium tracking-[0.02em] border border-[#262729] text-[#262729] bg-transparent rounded-[4px] hover:bg-[#262729] hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0"
            >
              Entre em contato
            </button>
          </nav>

          {/* Mobile Actions: Botão de contato rápido + Hambúrguer */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[0.78rem] font-medium border border-[#262729] text-[#262729] rounded-[4px] hover:bg-[#262729] hover:text-white transition-colors cursor-pointer shrink-0"
              title="Falar no WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#D2B48C]" />
              <span>Contato</span>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              className="p-1.5 text-[#262729] hover:text-[#3f4044] hover:bg-[#f4ede4]/60 rounded-[4px] transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.8]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.8]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#eeebe6] bg-[#fcfbf9]/98 backdrop-blur-sm px-5 py-4 flex flex-col gap-3 shadow-md animate-fade-up">
            <a
              href="#servicos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[0.95rem] font-medium text-[#262729] hover:text-[#D2B48C] py-2 border-b border-[#eeebe6]/70 transition-colors"
            >
              Serviços
            </a>
            <a
              href="#contato"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[0.95rem] font-medium text-[#262729] hover:text-[#D2B48C] py-2 border-b border-[#eeebe6]/70 transition-colors"
            >
              Contato
            </a>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openWhatsApp();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 mt-1 text-[0.88rem] font-medium rounded-[4px] bg-[#262729] text-white hover:bg-[#3f4044] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#D2B48C]" />
              <span>Falar pelo WhatsApp</span>
            </button>
          </div>
        )}
      </header>

      {/* ========================================================================
          CONTEÚDO PRINCIPAL / MAIN
          ======================================================================== */}
      <main className="flex-1">
        {/* SEÇÃO HERO */}
        <section id="inicio" className="py-20 lg:py-24 relative">
          <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-[4.5rem] items-center">
            {/* Hero Left Content */}
            <div className="flex flex-col items-start">
              <div
                className="inline-flex items-center pl-3 border-l-2 border-[#D2B48C] mb-5 animate-fade-up"
                style={{ animationDelay: '0.1s' }}
              >
                <span className="text-[0.8rem] font-medium tracking-[0.12em] uppercase text-[#6b6d72]">
                  Serviços contábeis e regularização empresarial
                </span>
              </div>

              <h1
                className="font-serif text-[2.6rem] md:text-[3.4rem] leading-[1.15] font-medium text-[#262729] mb-6 tracking-[-0.02em] animate-fade-up"
                style={{ animationDelay: '0.2s', textWrap: 'balance' }}
              >
                Cuidar da sua empresa pode ser mais simples.
              </h1>

              <p
                className="text-[1.05rem] leading-[1.75] text-[#6b6d72] mb-10 max-w-[540px] animate-fade-up"
                style={{ animationDelay: '0.3s' }}
              >
                Atendimento próximo, transparente e estruturado para quem busca tranquilidade contábil. Apoio especializado em formalização, cumprimento de obrigações e rotinas administrativas para que você dedique seu tempo ao que realmente importa: fazer seu negócio prosperar.
              </p>

              <div
                className="flex items-center gap-5 flex-wrap animate-fade-up"
                style={{ animationDelay: '0.4s' }}
              >
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center px-[1.6rem] py-[0.75rem] text-[0.9rem] font-medium tracking-[0.02em] rounded-[4px] bg-[#D2B48C] text-white border border-[#D2B48C] hover:bg-[#c4a47a] hover:border-[#c4a47a] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(210,180,140,0.25)] transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0"
                >
                  Fale comigo
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center px-5 py-[0.75rem] text-[0.85rem] font-medium tracking-[0.02em] rounded-[4px] border border-[#262729] text-[#262729] bg-transparent hover:bg-[#262729] hover:text-white transition-all duration-300 whitespace-nowrap shrink-0"
                >
                  Conhecer serviços
                </a>
              </div>
            </div>

            {/* Hero Right Image Wrapper */}
            <div
              className="relative mx-auto max-w-[420px] w-full animate-fade-scale"
              style={{ animationDelay: '0.35s' }}
            >
              <div className="relative rounded-[4px] overflow-hidden bg-[#f4ede4] border border-[#e6e0d8] group">
                <img
                  src={claudiaImg}
                  alt="Fotografia profissional de Ana Cláudia Rodrigues Cruz, especialista contábil em ambiente clean e acolhedor"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="eager"
                />
              </div>
              <p className="mt-3.5 text-[0.78rem] text-[#6b6d72] text-right tracking-[0.04em]">
                Ana Cláudia Rodrigues Cruz &bull; Gestão &amp; Regularização
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE SERVIÇOS */}
        <section
          id="servicos"
          aria-labelledby="titulo-servicos"
          className="py-24 bg-[#faf7f2] border-t border-b border-[#e6e0d8]"
        >
          <div className="max-w-[1140px] mx-auto px-6">
            <header className="mb-16 max-w-[650px] flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:max-w-none">
              <div>
                <span className="text-[0.8rem] tracking-[0.12em] uppercase text-[#6b6d72] mb-3 block">
                  Áreas de Atuação
                </span>
                <h2
                  id="titulo-servicos"
                  className="font-serif text-[2.3rem] md:text-[2.85rem] leading-[1.2] font-medium text-[#262729] tracking-[-0.01em]"
                >
                  Como posso ajudar você?
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSimModalOpen(true)}
                className="self-start sm:self-end inline-flex items-center gap-2 text-[0.85rem] font-medium text-[#262729] border-b border-[#D2B48C] pb-1 hover:text-[#6b6d72] transition-colors cursor-pointer shrink-0"
              >
                <span>Simulador de Limite Anual MEI</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D2B48C]" />
              </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10">
              {SERVICES.map((service) => (
                <article
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="group relative p-8 md:px-8 md:py-9 bg-white border border-[#eeebe6] rounded-[4px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#D2B48C] hover:shadow-[0_10px_25px_rgba(38,39,41,0.04)] cursor-pointer"
                >
                  <div>
                    <div className="font-serif text-[1.4rem] italic text-[#D2B48C] font-semibold mb-5 flex items-center gap-3">
                      <span>{service.number}</span>
                      <span className="flex-1 h-[1px] bg-[#eeebe6] group-hover:bg-[#D2B48C]/40 transition-colors" />
                    </div>

                    <h3 className="font-serif text-[1.5rem] leading-[1.3] font-semibold text-[#262729] mb-3.5 tracking-[-0.01em] group-hover:text-[#3f4044] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-[0.95rem] text-[#6b6d72] leading-[1.65]">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#eeebe6]/70 flex items-center justify-between text-[0.82rem] text-[#6b6d72] group-hover:text-[#262729] transition-colors">
                    <span>Ver detalhes e documentos necessários</span>
                    <ChevronRight className="w-4 h-4 text-[#D2B48C] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO DE CONTATO */}
        <section
          id="contato"
          aria-labelledby="titulo-contato"
          className="py-[6.5rem] bg-[#fcfbf9] relative"
        >
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="max-w-[820px] mx-auto text-center px-6 py-14 sm:px-10 bg-white border border-[#e6e0d8] rounded-[4px] relative">
              {/* Top sand accent bar from HTML design */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[3px] bg-[#D2B48C]" />

              <h2
                id="titulo-contato"
                className="font-serif text-[2.2rem] md:text-[2.85rem] leading-[1.25] font-medium text-[#262729] mb-5 tracking-[-0.01em]"
              >
                Vamos conversar sobre o seu negócio?
              </h2>

              <p className="text-[1.05rem] text-[#6b6d72] max-w-[580px] mx-auto mb-12 leading-[1.7]">
                Entre em contato para esclarecer dúvidas, regularizar pendências ou organizar a gestão administrativa da sua microempresa com segurança e proximidade.
              </p>

              {/* Contact Channels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                {/* Canal WhatsApp */}
                <div className="p-6 bg-[#faf7f2] border border-[#eeebe6] rounded-[4px] flex flex-col items-center text-center gap-1.5 transition-all duration-300 hover:border-[#D2B48C] hover:bg-white hover:-translate-y-0.5">
                  <MessageCircle className="w-7 h-7 text-[#262729] stroke-[1.5] mb-1" />
                  <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[#6b6d72] font-medium">
                    WhatsApp
                  </span>
                  <span className="text-[0.92rem] text-[#262729] font-medium tabular-nums">
                    {CONTACT_INFO.whatsappDisplay}
                  </span>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openWhatsApp()}
                      className="text-[0.8rem] text-[#D2B48C] hover:text-[#262729] font-semibold transition-colors cursor-pointer"
                    >
                      Enviar mensagem &rarr;
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(CONTACT_INFO.whatsappDisplay, 'whatsapp')}
                      title="Copiar número"
                      className="text-[#6b6d72] hover:text-[#262729] transition-colors cursor-pointer"
                    >
                      {copiedChannel === 'whatsapp' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                {/* Canal LinkedIn */}
                <div className="p-6 bg-[#faf7f2] border border-[#eeebe6] rounded-[4px] flex flex-col items-center text-center gap-1.5 transition-all duration-300 hover:border-[#D2B48C] hover:bg-white hover:-translate-y-0.5">
                  <Linkedin className="w-7 h-7 text-[#262729] stroke-[1.5] mb-1" />
                  <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[#6b6d72] font-medium">
                    LinkedIn
                  </span>
                  <span className="text-[0.92rem] text-[#262729] font-medium tabular-nums">
                    {CONTACT_INFO.linkedinDisplay}
                  </span>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.open(CONTACT_INFO.linkedinUrl, '_blank', 'noopener,noreferrer')}
                      className="text-[0.8rem] text-[#D2B48C] hover:text-[#262729] font-semibold transition-colors cursor-pointer"
                    >
                      Acessar perfil &rarr;
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => openWhatsApp()}
                  className="inline-flex items-center justify-center px-7 py-3.5 text-[0.9rem] font-medium tracking-[0.02em] rounded-[4px] bg-[#262729] text-white border border-[#262729] hover:bg-[#3f4044] hover:border-[#3f4044] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(38,39,41,0.12)] transition-all duration-300 cursor-pointer"
                >
                  Iniciar atendimento direto
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================
          RODAPÉ / FOOTER
          ======================================================================== */}
      <footer className="bg-[#262729] text-white pt-[4.5rem] pb-10 border-t border-[#D2B48C]/20">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-14 pb-10 border-b border-white/10">
            <div className="max-w-[360px]">
              <p className="font-serif text-[1.5rem] font-semibold text-white mb-2 tracking-[-0.01em]">
                Ana Cláudia Rodrigues Cruz
              </p>
              <p className="text-[0.85rem] text-white/65 leading-[1.6]">
                Serviços contábeis e regularização empresarial para MEI e ME.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[#D2B48C] mb-1 font-semibold">
                Navegação
              </span>
              <a
                href="#inicio"
                className="text-[0.9rem] text-white/75 hover:text-[#D2B48C] hover:pl-1 transition-all"
              >
                Início
              </a>
              <a
                href="#servicos"
                className="text-[0.9rem] text-white/75 hover:text-[#D2B48C] hover:pl-1 transition-all"
              >
                Serviços
              </a>
              <a
                href="#contato"
                className="text-[0.9rem] text-white/75 hover:text-[#D2B48C] hover:pl-1 transition-all"
              >
                Contato
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[#D2B48C] mb-1 font-semibold">
                Canais de Contato
              </span>
              <button
                type="button"
                onClick={() => openWhatsApp()}
                className="text-left text-[0.9rem] text-white/75 hover:text-[#D2B48C] hover:pl-1 transition-all cursor-pointer"
              >
                WhatsApp
              </button>
              <a
                href={CONTACT_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.9rem] text-white/75 hover:text-[#D2B48C] hover:pl-1 transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 text-[0.8rem] text-white/50">  
            <p>&copy; 2025 Ana Cláudia Rodrigues Cruz. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* ========================================================================
          MODAL DE DETALHES DO SERVIÇO
          ======================================================================== */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262729]/60 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white border border-[#e6e0d8] rounded-[4px] max-w-[640px] w-full p-6 sm:p-9 relative shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D2B48C]" />

            <button
              type="button"
              onClick={() => setSelectedService(null)}
              aria-label="Fechar detalhes"
              className="absolute top-5 right-5 p-2 text-[#6b6d72] hover:text-[#262729] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-serif text-[1.25rem] italic text-[#D2B48C] font-semibold mb-2">
              Serviço {selectedService.number}
            </div>

            <h3 className="font-serif text-[1.85rem] leading-[1.25] font-semibold text-[#262729] mb-4">
              {selectedService.title}
            </h3>

            <p className="text-[0.95rem] text-[#6b6d72] leading-[1.7] mb-6">
              {selectedService.fullDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#faf7f2] border border-[#eeebe6] rounded-[4px] mb-6 text-[0.85rem]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D2B48C] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#6b6d72] text-[0.75rem] uppercase tracking-wider">
                    Prazo Estimado
                  </span>
                  <span className="font-medium text-[#262729]">
                    {selectedService.estimatedTime}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#D2B48C] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#6b6d72] text-[0.75rem] uppercase tracking-wider">
                    Indicado Para
                  </span>
                  <span className="font-medium text-[#262729]">
                    {selectedService.targetAudience}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-5 mb-8">
              <div>
                <h4 className="text-[0.8rem] uppercase tracking-[0.1em] text-[#262729] font-semibold mb-2.5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D2B48C]" />
                  <span>O que está incluído no atendimento</span>
                </h4>
                <ul className="space-y-2">
                  {selectedService.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[0.9rem] text-[#3f4044] flex items-start gap-2.5"
                    >
                      <span className="text-[#D2B48C] font-bold mt-0.5">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#eeebe6]">
                <h4 className="text-[0.8rem] uppercase tracking-[0.1em] text-[#262729] font-semibold mb-2.5 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D2B48C]" />
                  <span>Documentação básica necessária</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedService.documentsNeeded.map((doc, idx) => (
                    <li
                      key={idx}
                      className="text-[0.88rem] text-[#6b6d72] flex items-start gap-2.5"
                    >
                      <span className="text-[#D2B48C]">&ndash;</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#eeebe6]">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-5 py-2.5 text-[0.85rem] font-medium text-[#6b6d72] hover:text-[#262729] transition-colors cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => {
                  const service = selectedService.title;
                  setSelectedService(null);
                  openWhatsApp(service);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-[0.88rem] font-medium rounded-[4px] bg-[#262729] text-white hover:bg-[#3f4044] transition-colors cursor-pointer"
              >
                <span>Solicitar este serviço</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}



      {/* ========================================================================
          MODAL SIMULADOR DE ENQUADRAMENTO E LIMITE MEI
          ======================================================================== */}
      {simModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262729]/60 backdrop-blur-sm"
          onClick={() => setSimModalOpen(false)}
        >
          <div
            className="bg-white border border-[#e6e0d8] rounded-[4px] max-w-[580px] w-full p-6 sm:p-9 relative shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D2B48C]" />

            <button
              type="button"
              onClick={() => setSimModalOpen(false)}
              aria-label="Fechar simulador"
              className="absolute top-5 right-5 p-2 text-[#6b6d72] hover:text-[#262729] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[0.75rem] uppercase tracking-[0.12em] text-[#6b6d72] block mb-1">
              Diagnóstico Rápido
            </span>
            <h3 className="font-serif text-[1.85rem] leading-[1.2] font-semibold text-[#262729] mb-2">
              Simulador de Faturamento e Regularidade MEI
            </h3>
            <p className="text-[0.9rem] text-[#6b6d72] mb-6">
              Verifique se o faturamento da sua empresa está dentro do teto proporcional do MEI (R$ 81.000,00/ano) ou se já requer transição planejada para Microempresa (ME).
            </p>

            <div className="space-y-5 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.8rem] font-medium text-[#262729] mb-1">
                    Faturamento médio mensal (R$)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={250}
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-[0.95rem] font-medium tabular-nums bg-[#fcfbf9] border border-[#e6e0d8] rounded-[4px] text-[#262729]"
                  />
                </div>

                <div>
                  <label className="block text-[0.8rem] font-medium text-[#262729] mb-1">
                    Meses em atividade no ano ({monthsActive} meses)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={12}
                    value={monthsActive}
                    onChange={(e) => setMonthsActive(Number(e.target.value))}
                    className="w-full accent-[#D2B48C] mt-3 cursor-pointer"
                  />
                  <div className="flex justify-between text-[0.72rem] text-[#6b6d72] tabular-nums">
                    <span>1 mês</span>
                    <span>6 meses</span>
                    <span>12 meses</span>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-3 p-3.5 bg-[#faf7f2] border border-[#eeebe6] rounded-[4px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPendingDas}
                  onChange={(e) => setHasPendingDas(e.target.checked)}
                  className="w-4 h-4 accent-[#262729]"
                />
                <span className="text-[0.88rem] text-[#262729]">
                  Possuo guias DAS mensais ou Declaração Anual (DASN) em atraso
                </span>
              </label>

              {/* Result Box */}
              <div className="p-5 bg-[#faf7f2] border border-[#e6e0d8] rounded-[4px]">
                <div className="flex items-center justify-between text-[0.82rem] text-[#6b6d72] mb-1">
                  <span>Faturamento projetado ({monthsActive} meses):</span>
                  <span className="font-semibold text-[#262729] tabular-nums">
                    {projectedAnnual.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[0.82rem] text-[#6b6d72] mb-3">
                  <span>Limite proporcional permitido:</span>
                  <span className="font-medium text-[#262729] tabular-nums">
                    {proportionalLimit.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>

                <div className="w-full h-2 bg-[#eeebe6] rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full transition-all duration-300 ${isOverLimit ? 'bg-amber-700' : 'bg-[#D2B48C]'
                      }`}
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>

                <p className="text-[0.88rem] text-[#262729] font-medium">
                  {isOverLimit
                    ? 'Atenção: Seu faturamento projetado ultrapassa o limite proporcional do MEI. É recomendável planejar o desenquadramento para Microempresa (ME).'
                    : hasPendingDas
                      ? 'Seu faturamento está dentro do limite do MEI, mas é importante regularizar as guias DAS/Declaração em aberto para evitar cancelamento do CNPJ.'
                      : 'Excelente! Seu faturamento está dentro do limite permitido para o MEI. Mantenha o pagamento mensal do DAS e a declaração anual em dia.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#eeebe6]">
              <button
                type="button"
                onClick={() => setSimModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 text-[0.85rem] text-[#6b6d72] hover:text-[#262729] transition-colors cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  setSimModalOpen(false);
                  openWhatsApp(
                    isOverLimit
                      ? 'Formalização e regularização de MEI e ME'
                      : hasPendingDas
                        ? 'Emissão de Documento de Arrecadação do Simples Nacional (DAS)'
                        : 'Emissão de declaração anual de faturamento'
                  );
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-[0.88rem] font-medium rounded-[4px] bg-[#262729] text-white hover:bg-[#3f4044] transition-colors cursor-pointer"
              >
                <span>Conversar sobre meu diagnóstico</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

