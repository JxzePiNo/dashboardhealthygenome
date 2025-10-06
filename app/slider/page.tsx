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