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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"

const dietData = {
  lunedi: {
    colazione: {
      piatti: ["Yogurt greco con miele", "Muesli integrale", "Frutta fresca di stagione"],
      calorie: 350,
      proteine: 15,
      carboidrati: 45,
      grassi: 12
    },
    pranzo: {
      piatti: ["Riso integrale con verdure", "Petto di pollo alla griglia", "Insalata mista"],
      calorie: 550,
      proteine: 35,
      carboidrati: 60,
      grassi: 15
    },
    cena: {
      piatti: ["Salmone al forno", "Patate dolci arrosto", "Broccoli al vapore"],
      calorie: 480,
      proteine: 40,
      carboidrati: 35,
      grassi: 18
    },
    spuntini: {
      piatti: ["Mandorle (30g)", "Mela"],
      calorie: 220,
      proteine: 6,
      carboidrati: 20,
      grassi: 14
    }
  },
  martedi: {
    colazione: {
      piatti: ["Porridge di avena", "Banana", "Burro di arachidi"],
      calorie: 380,
      proteine: 12,
      carboidrati: 55,
      grassi: 14
    },
    pranzo: {
      piatti: ["Pasta integrale al pomodoro", "Tonno al naturale", "Verdure grigliate"],
      calorie: 520,
      proteine: 32,
      carboidrati: 65,
      grassi: 12
    },
    cena: {
      piatti: ["Tacchino al limone", "Quinoa", "Spinaci saltati"],
      calorie: 460,
      proteine: 38,
      carboidrati: 40,
      grassi: 14
    },
    spuntini: {
      piatti: ["Yogurt magro", "Noci (20g)"],
      calorie: 200,
      proteine: 8,
      carboidrati: 15,
      grassi: 12
    }
  },
  mercoledi: {
    colazione: {
      piatti: ["Pancake proteici", "Frutti di bosco", "Sciroppo d'acero"],
      calorie: 360,
      proteine: 18,
      carboidrati: 48,
      grassi: 10
    },
    pranzo: {
      piatti: ["Farro con legumi", "Verdure al forno", "Hummus"],
      calorie: 540,
      proteine: 22,
      carboidrati: 72,
      grassi: 16
    },
    cena: {
      piatti: ["Orata al cartoccio", "Riso basmati", "Zucchine trifolate"],
      calorie: 470,
      proteine: 36,
      carboidrati: 42,
      grassi: 16
    },
    spuntini: {
      piatti: ["Crackers integrali", "Formaggio light"],
      calorie: 190,
      proteine: 10,
      carboidrati: 18,
      grassi: 8
    }
  },
  giovedi: {
    colazione: {
      piatti: ["Toast integrale con avocado", "Uovo sodo", "Arancia"],
      calorie: 370,
      proteine: 16,
      carboidrati: 42,
      grassi: 16
    },
    pranzo: {
      piatti: ["Risotto ai funghi", "Petto di tacchino", "Insalata verde"],
      calorie: 530,
      proteine: 34,
      carboidrati: 58,
      grassi: 14
    },
    cena: {
      piatti: ["Hamburger di ceci", "Patate al forno", "Carote al vapore"],
      calorie: 450,
      proteine: 20,
      carboidrati: 62,
      grassi: 14
    },
    spuntini: {
      piatti: ["Barretta proteica", "Kiwi"],
      calorie: 210,
      proteine: 12,
      carboidrati: 24,
      grassi: 6
    }
  },
  venerdi: {
    colazione: {
      piatti: ["Smoothie proteico", "Granola", "Semi di chia"],
      calorie: 390,
      proteine: 20,
      carboidrati: 50,
      grassi: 12
    },
    pranzo: {
      piatti: ["Couscous con verdure", "Gamberi alla griglia", "Pomodorini"],
      calorie: 510,
      proteine: 36,
      carboidrati: 55,
      grassi: 13
    },
    cena: {
      piatti: ["Pollo al curry", "Riso jasmine", "Fagiolini"],
      calorie: 490,
      proteine: 42,
      carboidrati: 44,
      grassi: 15
    },
    spuntini: {
      piatti: ["Hummus con verdure crude", "Pera"],
      calorie: 180,
      proteine: 6,
      carboidrati: 28,
      grassi: 6
    }
  },
  sabato: {
    colazione: {
      piatti: ["French toast proteico", "Sciroppo senza zucchero", "Frutti rossi"],
      calorie: 370,
      proteine: 19,
      carboidrati: 46,
      grassi: 11
    },
    pranzo: {
      piatti: ["Pizza integrale margherita", "Insalata caprese", "Olive"],
      calorie: 580,
      proteine: 28,
      carboidrati: 68,
      grassi: 20
    },
    cena: {
      piatti: ["Spigola al sale", "Patate novelle", "Asparagi"],
      calorie: 460,
      proteine: 38,
      carboidrati: 36,
      grassi: 16
    },
    spuntini: {
      piatti: ["Yogurt greco", "Miele", "Granella di nocciole"],
      calorie: 230,
      proteine: 14,
      carboidrati: 22,
      grassi: 10
    }
  },
  domenica: {
    colazione: {
      piatti: ["Uova strapazzate", "Salmone affumicato", "Pane integrale tostato"],
      calorie: 400,
      proteine: 24,
      carboidrati: 38,
      grassi: 18
    },
    pranzo: {
      piatti: ["Lasagne di verdure", "Insalata mista", "Pane"],
      calorie: 560,
      proteine: 26,
      carboidrati: 64,
      grassi: 22
    },
    cena: {
      piatti: ["Zuppa di legumi", "Crostini integrali", "Verdure crude"],
      calorie: 420,
      proteine: 22,
      carboidrati: 58,
      grassi: 10
    },
    spuntini: {
      piatti: ["Frullato di frutta", "Biscotti integrali"],
      calorie: 240,
      proteine: 6,
      carboidrati: 38,
      grassi: 8
    }
  }
}

type Meal = {
  piatti: (string | number | ReactNode)[];
  calorie: number;
  proteine: number;
  carboidrati: number;
  grassi: number;
};

type MealCardProps = {
  title: string;
  meal: Meal;
};

const MealCard = ({ title, meal }: MealCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>
        <div className="flex gap-2 mt-2">
          <Badge variant="secondary">{meal.calorie} kcal</Badge>
          <Badge variant="outline">P: {meal.proteine}g</Badge>
          <Badge variant="outline">C: {meal.carboidrati}g</Badge>
          <Badge variant="outline">G: {meal.grassi}g</Badge>
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-1">
        {meal.piatti.map((piatto: string | number | ReactNode, index: Key | null | undefined) => (
          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {piatto}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

export default function DietPage() {
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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    healthygenome
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Piano Alimentare</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {/* Card Nutrizionista */}
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">Dott. Gabriele Di Lallo</h2>
                  <p className="text-emerald-700 font-medium mt-1">Biotecnologo Nutrizionista</p>
                  <p className="text-gray-600 mt-2 text-sm">
                    Specializzato in nutrizione personalizzata e genomica nutrizionale. 
                    Oltre 15 anni di esperienza nel campo della nutrizione clinica e sportiva.
                  </p>
                  <div className="flex gap-4 mt-3 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">Email:</span> g.dilallo@healthygenome.it
                    </div>
                    <div>
                      <span className="font-semibold">Tel:</span> +39 06 1234 5678
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Giorni della Settimana */}
          <Card>
            <CardHeader>
              <CardTitle>Piano Alimentare Settimanale</CardTitle>
              <CardDescription>Seleziona un giorno per visualizzare il menu completo</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="lunedi" className="w-full">
                <TabsList className="grid w-full grid-cols-7">
                  <TabsTrigger value="lunedi">Lun</TabsTrigger>
                  <TabsTrigger value="martedi">Mar</TabsTrigger>
                  <TabsTrigger value="mercoledi">Mer</TabsTrigger>
                  <TabsTrigger value="giovedi">Gio</TabsTrigger>
                  <TabsTrigger value="venerdi">Ven</TabsTrigger>
                  <TabsTrigger value="sabato">Sab</TabsTrigger>
                  <TabsTrigger value="domenica">Dom</TabsTrigger>
                </TabsList>

                {Object.entries(dietData).map(([giorno, pasti]) => {
                  const totaleCalorie = pasti.colazione.calorie + pasti.pranzo.calorie + pasti.cena.calorie + pasti.spuntini.calorie
                  const totaleProteine = pasti.colazione.proteine + pasti.pranzo.proteine + pasti.cena.proteine + pasti.spuntini.proteine
                  const totaleCarboidrati = pasti.colazione.carboidrati + pasti.pranzo.carboidrati + pasti.cena.carboidrati + pasti.spuntini.carboidrati
                  const totaleGrassi = pasti.colazione.grassi + pasti.pranzo.grassi + pasti.cena.grassi + pasti.spuntini.grassi

                  return (
                    <TabsContent key={giorno} value={giorno} className="space-y-4 mt-4">
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold capitalize">{giorno}</h3>
                            <div className="flex gap-3">
                              <Badge className="text-base">{totaleCalorie} kcal totali</Badge>
                              <Badge variant="outline">P: {totaleProteine}g</Badge>
                              <Badge variant="outline">C: {totaleCarboidrati}g</Badge>
                              <Badge variant="outline">G: {totaleGrassi}g</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid gap-4 md:grid-cols-2">
                        <MealCard title="Colazione" meal={pasti.colazione} />
                        <MealCard title="Pranzo" meal={pasti.pranzo} />
                        <MealCard title="Cena" meal={pasti.cena} />
                        <MealCard title="Spuntini" meal={pasti.spuntini} />
                      </div>
                    </TabsContent>
                  )
                })}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}