
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ArrowUp, ArrowRight, Star, Feather, Zap, Cookie, Contrast, LayoutGrid, Search, Menu, Mic, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const footerLinks = {
    Assuntos: [
      'Noticias', 'Notícias para os estados', 'Saúde de A a Z', 'Agência Saúde', 'Balanço 2024', 'COP30', 'Covid-19', 'G20 Brasil', 'Meu SUS Digital', 'Novo PAC Saúde', 'Protocolos Clínicos e Diretrizes Terapêuticas - PCDT', 'Retomada de obras da saúde', 'Saúde com Ciência', 'Saúde Brasil', 'Saúde sem Racismo', 'Yanomami'
    ],
    Vacinação: [
      'Calendário de Vacinação', 'Calendário Técnico Nacional de Vacinação', 'Atividades de vacinação de alta qualidade', 'Distribuição de Imunobiológicos', 'Segurança das Vacinas', 'Vacinas para Grupos Especiais', 'Vacinação para os Viajantes', 'Rede de Frio', 'Informes Técnicos', 'Notas Técnicas e Informativas', 'Manuais', 'Legislação', 'Publicações', 'Monitoramento dos dados de vacinação'
    ],
    Composição: [
      'Organograma', 'Quem é Quem', 'Ministro', 'Secretaria Executiva', 'Consultoria Jurídica', 'DenaSUS', 'Atenção Especializada à Saúde', 'Atenção Primária', 'Ciência e Tecnologia em Saúde', 'Vigilância em Saúde e Ambiente', 'Trabalho e Educação na Saúde', 'Saúde Indígena', 'Informação e Saúde Digital', 'Corregedoria', 'Órgãos Colegiados', 'Entidades Vinculadas'
    ],
    'Acesso à Informação': [
      'Institucional', 'Ações e Programas', 'Agenda de Autoridades', 'Auditorias', 'Banco de Preços', 'Concursos e Seleções', 'Convênios e Transferências', 'Corregedoria', 'Dados abertos', 'Estágio', 'Gestão do SUS', 'Governança Pública', 'Informações Classificadas', 'Lei Geral de Proteção de Dados Pessoais (LGPD)', 'Licitações e Contratos', 'Participação Social', 'Perguntas Frequentes (FAQ)', 'Receitas e Despesas', 'Serviço de Informação ao Cidadão (SIC)', 'Servidores'
    ],
    'Centrais de Conteúdo': [
      'Áudios', 'Apresentações', 'Imagens', 'Manual de Marcas do Ministério da Saúde', 'Publicações MS', 'Uso da Marca do Ministério da Saúde', 'Videos'
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <a href="https://www.gov.br/pt-br" className="flex items-center gap-2">
              <Image
                src="https://barra.sistema.gov.br/v1/assets/govbr.webp"
                width="108"
                height="29"
                alt="Gov.br Logo"
              />
              <span className="text-sm font-semibold text-gray-600 hidden sm:inline">Governo Federal</span>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-sm lg:gap-6 ml-auto">
            <Button variant="link" className="text-gray-600">Órgãos do Governo</Button>
            <Button variant="link" className="text-gray-600">Acesso à Informação</Button>
            <Button variant="link" className="text-gray-600">Legislação</Button>
            <Button variant="link" className="text-gray-600">Acessibilidade</Button>
          </nav>
          <div className="flex items-center gap-2 ml-auto md:ml-4">
            <div className="h-6 w-px bg-gray-300"></div>
            <Button variant="ghost" size="icon">
              <Cookie className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Contrast className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-4 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                  <span className="font-semibold text-lg">Ministério da Saúde</span>
                </div>
                <div className="relative w-full sm:w-auto sm:max-w-xs">
                  <Input type="search" placeholder="O que você procura?" className="pr-16" />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1">
                     <Mic className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                     <div className="h-6 w-px bg-gray-300 mx-1"></div>
                     <Search className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 group w-full sm:w-auto">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <span>Serviços mais acessados do govbr</span>
                      <ChevronDown className="h-4 w-4 group-data-[state=open]:hidden" />
                      <ChevronUp className="h-4 w-4 hidden group-data-[state=open]:block" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[300px]">
                    <DropdownMenuItem>
                      <span className="text-gray-400 w-6 text-center">1</span>
                      <span>Consultar Meu Imposto de Renda</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="text-gray-400 w-6 text-center">2</span>
                      <span>Assinatura Eletrônica</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="text-gray-400 w-6 text-center">3</span>
                      <span>Consultar restituição do imposto de renda</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="text-gray-400 w-6 text-center">4</span>
                      <span>Entregar Meu Imposto de Renda</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="text-gray-400 w-6 text-center">5</span>
                      <span>Consultar CPF</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="text-gray-400 w-6 text-center">6</span>
                      <span>Consultar dados do Cadastro Único</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 group w-full sm:w-auto">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Serviços em destaque do govbr</span>
                      <ChevronDown className="h-4 w-4 group-data-[state=open]:hidden" />
                      <ChevronUp className="h-4 w-4 hidden group-data-[state=open]:block" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[300px] sm:w-[400px]">
                    <DropdownMenuLabel className="text-gray-500">Para o cidadão</DropdownMenuLabel>
                    <DropdownMenuItem>Concurso Público Nacional Unificado 2 (CPNU2)</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-gray-500">Imóveis</DropdownMenuLabel>
                    <DropdownMenuItem className="flex justify-between items-center">
                      <span>Consultar dados de imóveis rurais na plataforma Meu Imóvel Rural</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Novo</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-gray-500">Crimes</DropdownMenuLabel>
                    <DropdownMenuItem>Celular Seguro</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-gray-500">Educação Básica</DropdownMenuLabel>
                    <DropdownMenuItem>Fazer o Exame Nacional do Ensino Médio (Enem)</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-gray-500">Outros Serviços</DropdownMenuLabel>
                    <DropdownMenuItem>CONTRATA+BRASIL</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <Image
              src="https://www.gov.br/saude/pt-br/pagina-inicial/@@govbr.institucional.banner/c4abc7ea-5f67-44fc-bee4-4c15839c28b5/@@images/fe323264-4a33-4f94-a98f-657f4ca92a39.png"
              width="1280"
              height="320"
              alt="Banner Principal"
              className="mx-auto aspect-video sm:aspect-[4/1] overflow-hidden rounded-xl object-cover"
            />
          </div>
        </section>

        <section className="w-full py-6 md:py-8">
          <div className="container px-4 md:px-6 relative">
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <div className="flex flex-col gap-4">
                      <Image
                        src="https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/10/hungria.png?w=849&h=477&crop=0"
                        width="849"
                        height="477"
                        alt="Cantor Hungria"
                        className="rounded-lg object-cover w-full aspect-video"
                      />
                      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                        Cantor Hungria é internado com suspeita de intoxicação por metanol
                      </h2>
                      <p className="text-muted-foreground">
                        Brasília (DF), 5 de outubro de 2025 — O cantor Hungria Hip Hop está internado em Brasília com suspeita de intoxicação por metanol, após consumir bebidas destiladas em um evento em São Paulo. O artista está consciente e realiza tratamento com hemodiálise, seguindo protocolo médico para casos suspeitos.
                      </p>
                      <p className="text-muted-foreground">
                        O Ministério da Saúde instalou uma Sala de Situação Nacional para monitorar os 43 casos suspeitos registrados no país — sendo 39 em São Paulo — e reforça as orientações à população: evitar bebidas de origem duvidosa e procurar atendimento imediato em caso de sintomas como náuseas, visão turva ou confusão mental.
                      </p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <div className="flex flex-col gap-4">
                      <Image
                        src="https://informaparaiba.com.br/wp-content/uploads/2025/10/unnamed-13-scaled.jpg"
                        width="1200"
                        height="675"
                        alt="Canudos de teste de metanol"
                        className="rounded-lg object-cover w-full aspect-video"
                      />
                      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                        Governo inicia distribuição de canudos de teste de metanol desenvolvidos por cientistas da Paraíba
                      </h2>
                      <p className="text-muted-foreground">
                        Brasília (DF), 5 de outubro de 2025 — Para reforçar a vigilância contra bebidas adulteradas, o Governo Federal começa a distribuir canudos de teste de metanol, tecnologia desenvolvida por pesquisadores da Paraíba, para uso em postos de fiscalização, bares, eventos e pontos estratégicos de controle.
                      </p>
                      <p className="text-muted-foreground">
                        O dispositivo permite detectar a presença de metanol em bebidas alcoólicas de forma rápida e com alto índice de precisão, ajudando a identificar riscos e prevenir intoxicações. A ação integra as medidas do Ministério da Saúde e das agências de vigilância sanitária para combate ao surto nacional de casos suspeitos de intoxicação por metanol.
                      </p>
                      <p className="text-muted-foreground">
                        Os estados e municípios receberão remessas dos canudos de teste juntamente com orientações técnicas sobre uso e monitoramento. A população continua sendo alertada para evitar consumo de bebidas de procedência duvidosa e procurar atendimento médico caso apresente sintomas compatíveis, como náuseas, alterações visuais ou confusão mental.
                      </p>
                      <p className="text-muted-foreground">
                        Mais detalhes sobre o funcionamento dos canudos e cronograma de distribuição serão divulgados nos próximos dias pela coordenação nacional do programa de vigilância química do Ministério da Saúde.
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 sm:static sm:translate-y-0" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 sm:static sm:translate-y-0" />
            </Carousel>
          </div>
        </section>

        <section className="w-full py-6 md:py-8">
          <div className="container flex justify-center px-4 md:px-6">
            <Button size="lg" className="bg-green-600 text-lg font-bold text-white hover:bg-green-700 w-full sm:w-auto">
              Adquira já seu canudo gratuitamente
            </Button>
          </div>
        </section>

        <section className="w-full py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <Image
              src="https://www.gov.br/saude/pt-br/carrossel-de-banners/2025/desktop/campanha-nacional-de-vacinacao-contra-a-raiva-mantenha-seu-melhor-amigo-protegido-saiba-mais-desktop.png/@@images/939f10e9-44de-446a-8f6e-2b1ffb689916.png"
              width="1280"
              height="320"
              alt="Campanha Nacional de Vacinação Contra a Raiva"
              className="mx-auto rounded-xl object-contain"
            />
          </div>
        </section>
      </main>

      <footer className="w-full bg-[#002a54] text-white py-12">
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div>
              <Image
                src="https://barra.sistema.gov.br/v1/assets/govbr.webp"
                width="108"
                height="29"
                alt="Gov.br Logo"
                className="mb-4"
              />
              <h3 className="font-bold mb-2 text-xl">SUS</h3>
            </div>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-bold mb-4 text-xl">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:underline">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg">
            <ArrowUp className="h-6 w-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}
