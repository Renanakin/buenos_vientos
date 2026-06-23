import React from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign } from 'lucide-react';

interface FilterState {
  tag: string; // 'Todos' | 'Venta' | 'Arriendo'
  type: string; // 'Todos' | 'Oficina' | 'Bodega' | 'Terreno' | 'Casa'
  comuna: string; // 'Todos' | Comuna name
  priceUnit: 'UF' | 'CLP';
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (updater: (prev: FilterState) => FilterState) => void;
  onReset: () => void;
  comunasList: string[];
}

export default function FilterSidebar({ filters, onChange, onReset, comunasList }: FilterSidebarProps) {
  const setFilter = (key: keyof FilterState, value: any) => {
    onChange((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePriceUnitChange = (unit: 'UF' | 'CLP') => {
    onChange((prev) => {
      // If switching unit, reset price ranges to safe defaults for the unit to prevent empty grids
      if (unit === 'UF') {
        return {
          ...prev,
          priceUnit: 'UF',
          minPrice: 0,
          maxPrice: 50000
        };
      } else {
        return {
          ...prev,
          priceUnit: 'CLP',
          minPrice: 0,
          maxPrice: 2000000000
        };
      }
    });
  };

  return (
    <div className="surface-portfolio p-8 rounded-none border border-white/5 flex flex-col gap-8 sticky top-28 w-full">
      {/* Title */}
      <div className="flex justify-between items-center pb-4 border-b border-white/5">
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-brand-gold font-mono block mb-1">Criterio</span>
          <h3 className="font-serif text-xl text-text-primary uppercase tracking-wider">Filtros de Búsqueda</h3>
        </div>
        <button 
          onClick={onReset}
          className="text-[9px] uppercase tracking-widest text-text-muted hover:text-brand-gold transition-colors duration-300 font-mono"
        >
          [ Limpiar ]
        </button>
      </div>

      {/* Operation Type - Elegant Tabs */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] uppercase tracking-ultra-wide text-text-muted font-mono">Tipo de Transacción</span>
        <div className="flex gap-2">
          {['Todos', 'Venta', 'Arriendo'].map((op) => (
            <button
              key={op}
              onClick={() => setFilter('tag', op)}
              className={`flex-1 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 font-semibold border ${
                (filters.tag === op || (op === 'Todos' && !filters.tag))
                  ? 'border-brand-gold text-brand-gold bg-brand-gold/5'
                  : 'border-white/5 text-text-secondary hover:border-white/20'
              }`}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* Category List */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] uppercase tracking-ultra-wide text-text-muted font-mono">Tipo de Activo</span>
        <div className="flex flex-col gap-2">
          {['Todos', 'Oficina', 'Bodega', 'Terreno', 'Casa'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter('type', type)}
              className={`text-left py-2 px-4 text-xs uppercase tracking-widest transition-all duration-300 ${
                filters.type === type
                  ? 'text-brand-gold bg-brand-gold/5 border-l border-brand-gold pl-5'
                  : 'text-text-secondary hover:text-text-primary border-l border-transparent hover:pl-5'
              }`}
            >
              {type === 'Todos' ? 'Todos los Activos' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Comuna Selector */}
      <div className="flex flex-col gap-3">
        <label htmlFor="comuna-select" className="text-[10px] uppercase tracking-ultra-wide text-text-muted font-mono">Ubicación / Comuna</label>
        <select
          id="comuna-select"
          value={filters.comuna}
          onChange={(e) => setFilter('comuna', e.target.value)}
          className="bg-bg-main/50 border border-white/5 py-2.5 px-4 text-xs text-text-secondary focus:border-brand-gold/50 focus:outline-none tracking-widest uppercase rounded-none"
        >
          <option value="Todos">Todas las Comunas</option>
          {comunasList.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Area range input (builtArea) */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] uppercase tracking-ultra-wide text-text-muted font-mono">Superficie Útil (m²)</span>
        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.minArea || ''}
            onChange={(e) => setFilter('minArea', Number(e.target.value))}
            className="w-1/2 bg-bg-main/50 border border-white/5 py-2 px-3 text-xs text-text-primary focus:border-brand-gold/50 focus:outline-none rounded-none font-mono"
          />
          <span className="text-white/20 text-xs">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxArea || ''}
            onChange={(e) => setFilter('maxArea', Number(e.target.value))}
            className="w-1/2 bg-bg-main/50 border border-white/5 py-2 px-3 text-xs text-text-primary focus:border-brand-gold/50 focus:outline-none rounded-none font-mono"
          />
        </div>
      </div>

      {/* Price Unit Toggler & Numeric inputs */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-ultra-wide text-text-muted font-mono">Límites de Precio</span>
          
          {/* Toggle buttons for UF / CLP */}
          <div className="inline-flex border border-white/5 rounded-none overflow-hidden">
            {(['UF', 'CLP'] as const).map((unit) => (
              <button
                key={unit}
                onClick={() => handlePriceUnitChange(unit)}
                className={`px-3 py-1 text-[9px] font-mono transition-colors duration-300 ${
                  filters.priceUnit === unit
                    ? 'bg-brand-gold text-bg-main font-bold'
                    : 'text-text-muted hover:text-text-primary bg-bg-main/40'
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-1/2">
            <span className="absolute left-2.5 top-2.5 text-[9px] text-brand-gold/50 font-mono">
              {filters.priceUnit === 'UF' ? 'UF' : '$'}
            </span>
            <input
              type="number"
              placeholder="Mínimo"
              value={filters.minPrice || ''}
              onChange={(e) => setFilter('minPrice', Number(e.target.value))}
              className="w-full bg-bg-main/50 border border-white/5 py-2 pl-7 pr-2 text-xs text-text-primary focus:border-brand-gold/50 focus:outline-none rounded-none font-mono"
            />
          </div>
          <span className="text-white/20 text-xs">—</span>
          <div className="relative w-1/2">
            <span className="absolute left-2.5 top-2.5 text-[9px] text-brand-gold/50 font-mono">
              {filters.priceUnit === 'UF' ? 'UF' : '$'}
            </span>
            <input
              type="number"
              placeholder="Máximo"
              value={filters.maxPrice || ''}
              onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
              className="w-full bg-bg-main/50 border border-white/5 py-2 pl-7 pr-2 text-xs text-text-primary focus:border-brand-gold/50 focus:outline-none rounded-none font-mono"
            />
          </div>
        </div>

        {/* Currency context notification info */}
        <span className="text-[9px] text-text-muted leading-tight block italic">
          * Los valores se expresan en {filters.priceUnit === 'UF' ? 'UF (Unidad de Fomento)' : 'Pesos Chilenos (CLP)'}.
        </span>
      </div>

    </div>
  );
}
