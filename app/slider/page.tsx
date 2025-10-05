"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  AlertCircle,
  Activity,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const VerticalCarouselSections = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [sectionOffsets, setSectionOffsets] = useState<number[]>([]);

  
  const chartConfig = {
    visitors: {
      label: "Percentage",
    },
    other: {
      label: "Other",
      color: "var(--chart-5)",
    },
  }

    const chartData = [
        { title: "Risk of baldness", visitors: 65, fill: "var(--chart-1)"},
        { title: "Hair density", visitors: 89, fill: "var(--chart-2)" },
        { title: "Body hair growth", visitors: 32, fill: "var(--chart-3)" },
    ];

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
];

  const trattiPersonali = [
    {
      nome: "Metabolismo Caffeina",
      valore: "Veloce",
      trend: "up",
      descrizione: "Metabolizzi rapidamente la caffeina",
      varianti: "CYP1A2 rs762551"
    },
    {
      nome: "Risposta all'Esercizio",
      valore: "Ottima",
      trend: "up",
      descrizione: "Ottima capacità di sviluppo muscolare",
      varianti: "ACTN3 rs1815739"
    }
  ];

  const sections = [
    { id: 0, title: "Physical Characteristics", color: "from-orange-500 to-red-500" },
    { id: 1, title: "Patologie", color: "from-blue-500 to-indigo-500" },
    { id: 2, title: "Allergie", color: "from-green-500 to-emerald-500" },
    { id: 3, title: "Tratti Personali", color: "from-purple-500 to-pink-500" }
  ];

  const getRiskColor = (rischio: string) => {
    switch(rischio) {
      case 'alto': return 'border-red-300 bg-red-50';
      case 'medio': return 'border-orange-300 bg-orange-50';
      case 'basso': return 'border-green-300 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRiskBarColor = (rischio: string) => {
    switch(rischio) {
      case 'alto': return 'bg-red-500';
      case 'medio': return 'bg-orange-500';
      case 'basso': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskIcon = (rischio: string) => {
    switch(rischio) {
      case 'alto': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'medio': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'basso': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'down': return <TrendingDown className="w-5 h-5 text-red-600" />;
      default: return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  useEffect(() => {
    // Calcola gli offset delle sezioni
    const calculateOffsets = () => {
      const offsets: number[] = [];
      sectionsRef.current.forEach((section) => {
        if (section) {
          offsets.push(section.offsetTop);
        }
      });
      setSectionOffsets(offsets);
    };

    calculateOffsets();
    window.addEventListener('resize', calculateOffsets);
    
    return () => {
      window.removeEventListener('resize', calculateOffsets);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || sectionOffsets.length === 0) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      
      // Determina la sezione attiva
      let currentSection = 0;
      for (let i = sectionOffsets.length - 1; i >= 0; i--) {
        if (scrollTop >= sectionOffsets[i] - 100) {
          currentSection = i;
          break;
        }
      }
      
      // Calcola il progresso all'interno della sezione corrente
      const currentSectionTop = sectionOffsets[currentSection];
      const nextSectionTop = sectionOffsets[currentSection + 1] || container.scrollHeight;
      const sectionHeight = nextSectionTop - currentSectionTop;
      const scrollInSection = scrollTop - currentSectionTop;
      const progress = Math.min(Math.max(scrollInSection / sectionHeight, 0), 1);
      
      setScrollProgress(progress);
      
      if (!isScrolling.current) {
        setActiveSection(currentSection);
      }

      // Debounce per lo snap
      clearTimeout(scrollTimeout.current);
      isScrolling.current = true;
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
        // Determina quale sezione è più vicina
        let targetSection = currentSection;
        if (progress > 0.5 && currentSection < sectionOffsets.length - 1) {
          targetSection = currentSection + 1;
        }
        scrollToSection(targetSection);
      }, 150);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, [sectionOffsets]);

  const scrollToSection = (index: React.SetStateAction<number>) => {
    const container = containerRef.current;
    if (!container || sectionOffsets.length === 0) return;

    const targetOffset = sectionOffsets[Number(index)];
    if (targetOffset !== undefined) {
      container.scrollTo({
        top: targetOffset,
        behavior: 'smooth'
      });
      setActiveSection(index);
      setScrollProgress(0);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Vertical Carousel Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 mt-[12rem]">
        {sections.map((section, index) => {
          const isActive = index === activeSection;
          const isNext = index === activeSection + 1;
          const fillPercentage = isActive ? Math.min(scrollProgress * 100, 100) : 
                                 isNext ? Math.max((scrollProgress - 0.5) * 200, 0) : 0;
          
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className="group relative flex items-center gap-3"
            >
              {/* Dot indicator */}
              <div className="relative w-3 h-3">
                {/* Background circle */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  isActive ? 'scale-150' : 'bg-gray-400 scale-100'
                }`} />
                
                {/* Filled circle */}
                <div 
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${section.color} transition-all duration-300`}
                  style={{
                    clipPath: isActive || isNext ? 
                      `circle(${fillPercentage}% at 50% 50%)` : 
                      index < activeSection ? 'circle(50% at 50% 50%)' : 'circle(0% at 50% 50%)'
                  }}
                />
                
                {/* Active ring */}
                {isActive && (
                  <div className="absolute -inset-1 rounded-full border-2 border-gray-400 animate-pulse" />
                )}
              </div>
              
              {/* Label tooltip */}
              <span className={`absolute right-6 whitespace-nowrap px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive 
                  ? 'opacity-100 translate-x-0 bg-gray-900 text-white shadow-lg' 
                  : 'opacity-0 translate-x-4 bg-gray-800 text-gray-300 group-hover:opacity-100 group-hover:translate-x-0'
              }`}>
                {section.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll Container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Section 1: Physical Characteristics */}
        <section 
          ref={el => { sectionsRef.current[0] = el; }}
          className="min-h-screen w-full flex items-start justify-center pt-8"
        >
          <div className={`w-full top-0 relative max-w-5xl transform transition-all duration-700 ${
            activeSection === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <CardHeader className="bg-orange/100">
                <div className="flex flex-col gap-2 items-start">
                <CardTitle>Physical Characteristics</CardTitle>
                <div className="flex flex-row items-center">
                    <Sparkles className="h-3 w-3 text-gray-500"></Sparkles>
                    <h3 className="text-gray-500 font-medium text-xs">Analysis with <b>AI</b></h3>
                </div>
                </div>
                <CardDescription>
                DNA analysis shows a predominance of <b>Northern Italian</b> genetic markers, with influences from <b>Central Europe</b> and the <b>Mediterranean</b> basin.<br></br>
                You also have <b>excellent hair density</b>, <b>low body hair count</b>, and a <b>high risk of baldness</b>.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg transition-all shadow-sm hover:shadow-md">
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
                    </div>
                    
                    <div className="p-4 rounded-lg transition-all shadow-sm hover:shadow-md">
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
                    </div>
                </div>
                <div className="py-6 px-6">
                <div className="flex items-center justify-between mb-1">
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 leading-none font-medium">
                    <div className="flex gap-2 leading-none font-medium">
                        <ShieldAlert  className="h-4 w-4"/>Disclaimer
                    </div>
                    </div>
                    <div className="text-muted-foreground leading-none">
                    Each result takes into account only the genetic predisposition and not the phenotype (external factors such as the environment where you live or your diet)
                    </div>
                </CardFooter>
                </div>
            </div>
            </CardContent>
          </div>
        </section>

        {/* Section 2: Patologie */}
        <section 
          ref={el => { sectionsRef.current[1] = el; }}
          className="min-h-screen flex items-start justify-center pt-8"
        >
          <div className={`w-full top-0 relative max-w-5xl transform transition-all duration-700 ${
            activeSection === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
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
                    <div className="justify-between mb-3">
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
          </div>
        </section>

        {/* Section 3: Allergie */}
        <section 
          ref={el => { sectionsRef.current[2] = el; }}
          className="min-h-screen flex items-start justify-center pt-8"
        >
          <div className={`w-full max-w-5xl transform transition-all duration-700 ${
            activeSection === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
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
          </div>
        </section>

        {/* Section 4: Tratti Personali */}
        <section 
          ref={el => { sectionsRef.current[3] = el; }}
          className="min-h-screen flex items-start justify-center pt-8"
        >
          <div className={`w-full max-w-5xl transform transition-all duration-700 ${
            activeSection === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <CardHeader>
              <CardTitle>Tratti Metabolici e Fisici Personali</CardTitle>
              <CardDescription>Caratteristiche individuali basate sul DNA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {trattiPersonali.map((tratto, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                    <div className="contents items-start justify-between mb-3 xl:flex">
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
          </div>
        </section>
      </div>

      {/* CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default VerticalCarouselSections;