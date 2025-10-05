
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ArrowRight, Star, Feather, Zap, Cookie, Contrast, LayoutGrid, Search, Menu, Mic, Flame, ChevronDown } from 'lucide-react';
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
                    <Button variant="outline" className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <span>Serviços mais acessados do govbr</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Serviço 1</DropdownMenuItem>
                    <DropdownMenuItem>Serviço 2</DropdownMenuItem>
                    <DropdownMenuItem>Serviço 3</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Serviços em destaque do govbr</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Destaque 1</DropdownMenuItem>
                    <DropdownMenuItem>Destaque 2</DropdownMenuItem>
                    <DropdownMenuItem>Destaque 3</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unleash Your Creativity with BlankSlate
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A simple and beautiful digital canvas to bring your ideas to life. Start with a clean slate and let your imagination run wild.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Creating
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/1/600/400"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="abstract geometric"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
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
