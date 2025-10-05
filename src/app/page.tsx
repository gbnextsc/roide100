
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ArrowRight, Star, Feather, Zap, Cookie, Contrast, LayoutGrid, Search, Menu, Mic, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
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
              <span className="text-sm font-semibold text-gray-600">Governo Federal</span>
            </a>
          </div>
          <nav className="flex items-center gap-4 text-sm lg:gap-6 ml-auto">
            <Button variant="link" className="text-gray-600">Órgãos do Governo</Button>
            <Button variant="link" className="text-gray-600">Acesso à Informação</Button>
            <Button variant="link" className="text-gray-600">Legislação</Button>
            <Button variant="link" className="text-gray-600">Acessibilidade</Button>
          </nav>
          <div className="flex items-center gap-2 ml-4">
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
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 group">
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
                    <Button variant="outline" className="flex items-center gap-2 group">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Serviços em destaque do govbr</span>
                      <ChevronDown className="h-4 w-4 group-data-[state=open]:hidden" />
                      <ChevronUp className="h-4 w-4 hidden group-data-[state=open]:block" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[400px]">
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

        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Image
              src="https://www.gov.br/saude/pt-br/pagina-inicial/@@govbr.institucional.banner/c4abc7ea-5f67-44fc-bee4-4c15839c28b5/@@images/fe323264-4a33-4f94-a98f-657f4ca92a39.png"
              width="1280"
              height="320"
              alt="Banner Principal"
              className="mx-auto aspect-[4/1] overflow-hidden rounded-xl object-cover"
            />
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
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
              <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2" />
              <CarouselNext className="right-0 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container flex justify-center px-4 md:px-6">
            <Button size="lg" className="bg-green-600 text-lg font-bold text-white hover:bg-green-700">
              Adquira já seu canudo gratuitamente
            </Button>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Get Started</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the powerful tools and features that make BlankSlate the perfect starting point for your next project.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Intuitive Interface</CardTitle>
                  <Star className="w-6 h-6 text-accent" />
                </CardHeader>
                <CardContent>
                  <CardDescription>Our clean and minimal UI makes it easy to focus on your creative work without distractions.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">AI-Powered Tools</CardTitle>
                  <Zap className="w-6 h-6 text-accent" />
                </CardHeader>
                <CardContent>
                  <CardDescription>Leverage the power of AI to generate ideas, images, and content to kickstart your project.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Fully Customizable</CardTitle>
                  <Feather className="w-6 h-6 text-accent" />
                </CardHeader>
                <CardContent>
                  <CardDescription>Easily customize every aspect of your project to match your unique style and vision.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 BlankSlate. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}

    