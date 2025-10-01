import { AppSidebar } from "@/components/app-sidebar"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const healthStatusData = [
  { name: "Cardiovascolare", value: 85, fill: "#10b981" },
  { name: "Metabolico", value: 72, fill: "#3b82f6" },
  { name: "Immunitario", value: 90, fill: "#8b5cf6" },
]

const biomarkersData = [
  { name: "Colesterolo", value: 180, normal: 200, unit: "mg/dL" },
  { name: "Glicemia", value: 95, normal: 100, unit: "mg/dL" },
  { name: "Pressione", value: 120, normal: 120, unit: "mmHg" },
  { name: "Trigliceridi", value: 140, normal: 150, unit: "mg/dL" },
]

const trendsData = [
  { month: "Gen", peso: 75, pressione: 118 },
  { month: "Feb", peso: 74.5, pressione: 120 },
  { month: "Mar", peso: 74, pressione: 119 },
  { month: "Apr", peso: 73.5, pressione: 121 },
  { month: "Mag", peso: 73, pressione: 120 },
  { month: "Giu", peso: 72.5, pressione: 118 },
]

const chartConfig = {
  cardiovascolare: {
    label: "Cardiovascolare",
    color: "#10b981",
  },
  metabolico: {
    label: "Metabolico",
    color: "#3b82f6",
  },
  immunitario: {
    label: "Immunitario",
    color: "#8b5cf6",
  },
}

export default function Page() {
  const averageHealth = Math.round(
    healthStatusData.reduce((sum, item) => sum + item.value, 0) / healthStatusData.length
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>  
                <BreadcrumbItem>
                  <BreadcrumbPage>Analisi</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col p-4 justify-center items-center">
              <h1 className="font-semibold text-2xl">Iacopo Paolucci</h1>
              <div className="flex flex-row gap-4 mt-4">
                <div>
                  <h3 className="text-gray-500 text-sm">Data di nascita</h3>
                  <h2 className="text-gray-700 font-medium">25 Luglio 2003</h2>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Email</h3>
                  <h2 className="text-gray-700 font-medium">marco.bianchi@email.it</h2>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm">Telefono</h3>
                  <h2 className="text-gray-700 font-medium">+39 392 100 9978</h2>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-4">
                <h3 className="text-gray-500 text-sm">Data test</h3>
                <h2 className="text-gray-700 font-medium">16 Giugno 2025</h2>
              </div>
            </div>
            <Card className="bg-muted/50 border-0">
              <CardHeader className="pb-2">
                <CardTitle>Stato di Salute Generale</CardTitle>
                <CardDescription>Punteggio complessivo delle aree principali</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-0">
                
                  
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Biomarcatori Principali</CardTitle>
                <CardDescription>Confronto con valori normali</CardDescription>
              </CardHeader>
              <CardContent>
                  
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendenze nel Tempo</CardTitle>
                <CardDescription>Peso corporeo e pressione sistolica</CardDescription>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Riepilogo delle Aree di Salute</CardTitle>
              <CardDescription>Dettaglio dei punteggi per area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {healthStatusData.map((item) => (
                  <div key={item.name} className="flex flex-col gap-2 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-2xl font-bold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${item.value}%`, backgroundColor: item.fill }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.value >= 85 ? "Ottimo" : item.value >= 70 ? "Buono" : "Da migliorare"}
                    </span>
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