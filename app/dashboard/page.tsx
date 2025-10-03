"use client";

import { AppSidebar } from "@/components/app-sidebar"
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import {
  Apple,
  Dna,
  Info,
  UserRound 
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, AlertTriangle, CheckCircle2, AlertCircle, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from "recharts"


import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import '@fontsource/bricolage-grotesque'



export const description = "A bar chart with an active bar"

const chartData = [
  { title: "Risk of baldness", visitors: 65, fill: "var(--chart-1)"},
  { title: "Hair density", visitors: 89, fill: "var(--chart-2)" },
  { title: "Body hair growth", visitors: 32, fill: "var(--chart-3)" },
]

const chartConfig = {
  visitors: {
    label: "Percentage",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig


const patientData = {
  nome: "Iacopo Paolucci",
  dataNascita: "25 Luglio 2003",
  email: "iacopo.paolucci@email.it",
  telefono: "+39 392 100 9978",
  dataTest: "16 Giugno 2025",
  sesso: "Maschile",
  gruppoSanguigno: "A+"
}

const patologie = [
  { nome: "Malattie Cardiache", rischio: "basso", percentuale: 22, varianti: "APOE (rs429358), LDLR (rs688)" },
  { nome: "Diabete di Tipo 2", rischio: "medio", percentuale: 45, varianti: "TCF7L2 (rs7903146), PPARG (rs1801282)" },
  { nome: "Alzheimer", rischio: "basso", percentuale: 18, varianti: "APOE (rs429358, rs7412)" },
  { nome: "Cancro al Colon", rischio: "medio", percentuale: 38, varianti: "APC (rs41115), MUTYH (rs36053993)" },
  { nome: "Osteoporosi", rischio: "medio", percentuale: 42, varianti: "VDR (rs2228570), COL1A1 (rs1800012)" },
  { nome: "Cancro al Seno", rischio: "basso", percentuale: 15, varianti: "BRCA1, BRCA2 (wild type)" },
  { nome: "Ipertensione", rischio: "alto", percentuale: 68, varianti: "AGT (rs699), ACE (rs4646994)" },
  { nome: "Parkinson", rischio: "basso", percentuale: 12, varianti: "SNCA (rs356219), LRRK2 (rs34637584)" }
]

const allergie = [
  { nome: "Intolleranza al Lattosio", presente: true, livello: "alto", varianti: "MCM6 (rs4988235 C;C), LCT (rs182549 C;C)" },
  { nome: "Intolleranza al Glutine", presente: true, livello: "moderato", varianti: "HLA-DQA1 (rs2187668 C;T), HLA-DQB1 (rs7775228 C;T)" },
  { nome: "Allergia alle Arachidi", presente: false, livello: null, varianti: "STAT6 (rs1059513 A;A), FOXP3 (rs2232365 A;G)" }
]

const data = {
  user: {
    name: "Iacopo Paolucci",
    email: "paolucciacopo@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Analisi",
      url: "/dashboard",
      icon: Dna,
    },
    {
      title: "Dieta",
      url: "/dieta",
      icon: Apple,
    },
    {
      title: "Scopri di più",
      url: "#",
      icon: Info,
    },
  ],
}

const trattiPersonali = [
  { 
    nome: "Metabolismo della Caffeina", 
    valore: "Lento", 
    trend: "down", 
    descrizione: "Metabolizzazione lenta della caffeina. Limitare il consumo specialmente nelle ore serali.",
    varianti: "CYP1A2 (rs762551 C;C)"
  },
  { 
    nome: "Metabolismo dell'Alcol", 
    valore: "Normale", 
    trend: "neutral", 
    descrizione: "Capacità normale di metabolizzare l'alcol. Consumo moderato consigliato.",
    varianti: "ADH1B (rs1229984 A;A)"
  },
  { 
    nome: "Assorbimento della Vitamina D", 
    valore: "Ridotto", 
    trend: "down", 
    descrizione: "Assorbimento inferiore alla media. Integrazione e esposizione solare raccomandate.",
    varianti: "GC (rs2282679 A;C), VDR (rs2228570 A;A)"
  },
  { 
    nome: "Assorbimento del Ferro", 
    valore: "Normale", 
    trend: "neutral", 
    descrizione: "Assorbimento del ferro nella norma. Nessuna integrazione particolare necessaria.",
    varianti: "HFE (rs1800562 G;G)"
  },
  { 
    nome: "Tipo di Fibra Muscolare", 
    valore: "Resistenza", 
    trend: "up", 
    descrizione: "Prevalenza di fibre tipo I adatte alla resistenza. Ottimale per sport di endurance.",
    varianti: "ACTN3 (rs1815739 X;X)"
  },
  { 
    nome: "Recupero Post-Esercizio", 
    valore: "Veloce", 
    trend: "up", 
    descrizione: "Recupero muscolare superiore alla media. Ottima risposta all'allenamento.",
    varianti: "IL6 (rs1800795 G;G)"
  }
]

const getRiskIcon = (rischio: string) => {
  switch(rischio) {
    case "basso":
      return <CheckCircle2 className="w-5 h-5 text-green-600" />
    case "medio":
      return <AlertCircle className="w-5 h-5 text-yellow-600" />
    case "alto":
      return <AlertTriangle className="w-5 h-5 text-red-600" />
    default:
      return null
  }
}

const getRiskColor = (rischio: string) => {
  switch(rischio) {
    case "basso":
      return "border-green-200 bg-green-50"
    case "medio":
      return "border-yellow-200 bg-yellow-50"
    case "alto":
      return "border-red-200 bg-red-50"
    default:
      return ""
  }
}

const getRiskBarColor = (rischio: string) => {
  switch(rischio) {
    case "basso":
      return "bg-green-500"
    case "medio":
      return "bg-yellow-500"
    case "alto":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getTrendIcon = (trend: string) => {
  switch(trend) {
    case "up":
      return <TrendingUp className="w-4 h-4 text-green-600" />
    case "down":
      return <TrendingDown className="w-4 h-4 text-orange-600" />
    case "neutral":
      return <Minus className="w-4 h-4 text-gray-600" />
    default:
      return null
  }
}

export default function Page() {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink className="text-gray-500 font-medium" href="#">
                    <span className="tetx-black font-bold">healthy</span>genome
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analisi Genomica</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {/* Card Paziente */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg flex-shrink-0">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{patientData.nome}</h2>
                      <p className="text-sm text-gray-600">ID: #IP78542</p>
                    </div>
                    <Badge className="bg-blue-600 text-white">Test Completato</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                    <div>
                      <p className="text-xs text-gray-600">Data di nascita</p>
                      <p className="font-medium text-gray-900 text-sm">{patientData.dataNascita}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-medium text-gray-900 text-sm truncate">{patientData.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Telefono</p>
                      <p className="font-medium text-gray-900 text-sm">{patientData.telefono}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Sesso</p>
                      <p className="font-medium text-gray-900 text-sm">{patientData.sesso}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Data test genomico</p>
                      <p className="font-medium text-gray-900 text-sm">{patientData.dataTest}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-orange/100">
              <CardTitle>Physical Characteristics</CardTitle>
              <CardDescription>Analysis of physical characteristics based on genomic profiling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className={`p-4 rounded-lg border-2 transition-all hover:shadow-md`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">Geographical and ethnic origins</h3>
                      </div>
                      
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default" className="flex-1 min-w-[120px] bg-blue-200 text-blue-600 font-sans h-8 rounded-xl">
                        Italy 68%
                      </Badge>
                      <Badge variant="default" className="flex-1 min-w-[120px] bg-green-200 text-green-600 font-sans h-8 rounded-xl">
                        Central Europe 22%
                      </Badge>
                      <Badge variant="default" className="flex-1 min-w-[120px] bg-yellow-200 text-yellow-600 font-sans h-8 rounded-xl">
                        Mediterranean 8%
                      </Badge>
                      <Badge variant="default" className="flex-1 min-w-[120px] bg-purple-200 text-purple-600 font-sans h-8 rounded-xl">
                        Other 2%
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <Alert className="mt-6 border-blue-200 bg-blue-50">
                          <AlertDescription className="text-sm text-gray-700">
                            <span className="font-semibold">Result analysis:</span> DNA analysis shows a predominance of Northern Italian genetic markers, with influences from Central Europe and the Mediterranean basin.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Hair and fur preparation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <BarChart
                          accessibilityLayer
                          data={chartData}
                          layout="vertical"
                          margin={{
                            left: 0,
                          }}
                        >
                          <YAxis
                            dataKey="title"
                            type="category"
                            tickLine={false}
                            tickMargin={2}
                            axisLine={false}
                            tickFormatter={(value) => value}
                          />
                          <XAxis dataKey="visitors" type="number" hide />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Bar dataKey="visitors" layout="vertical" radius={5} />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                      <div className="flex gap-2 leading-none font-medium">
                        Congrats, your gene is better than 92% of our clients<TrendingUp className="h-4 w-4" />
                      </div>
                      <div className="text-muted-foreground leading-none">
                            No preventive treatments are necessary
                      </div>
                    </CardFooter>
                  </Card>
              </div>
            </CardContent>
          </Card>

          {/* Sezione Patologie */}
          <Card>
            <CardHeader>
              <CardTitle>Predisposizione Genetica alle Patologie</CardTitle>
              <CardDescription>Analisi del rischio basata sul profilo genomico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {patologie.map((patologia, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getRiskColor(patologia.rischio)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getRiskIcon(patologia.rischio)}
                        <h3 className="font-semibold text-gray-900">{patologia.nome}</h3>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        Rischio {patologia.rischio}
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Percentile popolazione</span>
                        <span className="text-sm font-semibold">{patologia.percentuale}%</span>
                      </div>
                      <div className="w-full bg-white/50 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all ${getRiskBarColor(patologia.rischio)}`}
                          style={{ width: `${patologia.percentuale}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 bg-white/50 p-2 rounded">
                      <span className="font-medium">Varianti: </span>{patologia.varianti}
                    </div>
                  </div>
                ))}
              </div>
              
              <Alert className="mt-6 border-blue-200 bg-blue-50">
                <AlertDescription className="text-sm text-gray-700">
                  <span className="font-semibold">Raccomandazioni Cliniche:</span> Monitoraggio regolare della pressione arteriosa, screening periodico per diabete tipo 2, mantenere stile di vita attivo e dieta equilibrata, considerare integrazione di calcio e vitamina D per osteoporosi.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Sezione Allergie e Intolleranze */}
          <Card>
            <CardHeader>
              <CardTitle>Allergie e Intolleranze</CardTitle>
              <CardDescription>Sensibilità alimentari rilevate dal test genetico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allergie.map((allergia, index) => (
                  <Alert 
                    key={index} 
                    className={allergia.presente ? "border-orange-200 bg-orange-50  w-full flex" : "border-green-200 bg-green-50 w-full flex"}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3 flex-1">
                        {allergia.presente ? (
                          <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <AlertDescription className="font-semibold text-gray-900 mb-1">
                            {allergia.nome}
                          </AlertDescription>
                          <AlertDescription className="text-sm mb-2">
                            {allergia.presente ? (
                              <span className="text-orange-700">
                                Presente - Livello {allergia.livello}
                              </span>
                            ) : (
                              <span className="text-green-700">Non rilevata</span>
                            )}
                          </AlertDescription>
                          <AlertDescription className="text-xs text-gray-600">
                            {allergia.varianti}
                          </AlertDescription>
                        </div>
                      </div>
                      <Badge variant={allergia.presente ? "destructive" : "default"} className="ml-2">
                        {allergia.presente ? "Positivo" : "Negativo"}
                      </Badge>
                    </div>
                  </Alert>
                ))}
              </div>
              
              <Alert className="mt-6 border-blue-200 bg-blue-50">
                <AlertDescription className="text-sm text-gray-700">
                  <span className="font-semibold">Raccomandazioni Nutrizionali:</span> Limitare latticini o utilizzare alternative senza lattosio, monitorare reazione al glutine ma non eliminare completamente, nessuna restrizione per arachidi.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Sezione Tratti Personali */}
          <Card>
            <CardHeader>
              <CardTitle>Tratti Metabolici e Fisici Personali</CardTitle>
              <CardDescription>Caratteristiche individuali basate sul DNA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {trattiPersonali.map((tratto, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTrendIcon(tratto.trend)}
                        <h3 className="font-semibold text-gray-900">{tratto.nome}</h3>
                      </div>
                      <Badge variant="secondary">{tratto.valore}</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{tratto.descrizione}</p>
                    <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">{tratto.varianti}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
    
  )
}