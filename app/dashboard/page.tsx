"use client";

import { AppSidebar } from "@/components/app-sidebar"
import { usePathname } from "next/navigation";
import VerticalCarouselSections from "@/app/slider/page"
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
} from "@/components/ui/sidebar"
import {
  Apple,
  Dna,
  Info
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, AlertTriangle, CheckCircle2, AlertCircle, TrendingUp, TrendingDown, Minus, Sparkles, ShieldAlert } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import React, { useState, useRef, useEffect } from 'react';
import '@fontsource/bricolage-grotesque'
import { NavUser } from "@/components/nav-user";


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

const userData = {user : {
    name: "Iacopo Paolucci",
    email: "paolucciacopo@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  }};

export default function Page() {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="block">
                  <BreadcrumbLink className="text-gray-500 font-medium" href="/dashboard">
                    <span className="text-black font-bold">healthy</span><span className="text-gray-500 font-medium">genome</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="block" />
                <BreadcrumbItem>
                  <BreadcrumbPage><span className="text-gray-700 font-medium">Analisi Genomica</span></BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex mr-4 md:hidden lg:hidden">
            <NavUser {...userData}></NavUser>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          
          {/* Card Paziente */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 py-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="hidden w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-500 items-center justify-center shadow-lg flex-shrink-0 lg:flex md:flex">
                  <div className="w-full h-full flex flex-row justify-center items-center text-white">
                    <h2 className="font-bold text-3xl">{patientData.nome.split(' ')[0].substring(0,1)}</h2>
                    <h2 className="font-bold text-3xl">{patientData.nome.split(' ')[1].substring(0,1)}</h2>
                  </div>
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
          <VerticalCarouselSections />
        </div>
      </SidebarInset>
    </SidebarProvider>
    
  )
}