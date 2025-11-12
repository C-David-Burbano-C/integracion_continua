import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCalculator, FaLeaf, FaHome, FaGlobe, FaRobot, FaPalette } from 'react-icons/fa';

interface SidebarItem {
  label: string;
  route: string;
  icon?: React.ReactNode;
}

interface SidebarGroup {
  label: string;
  icon: React.ReactNode;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: 'Matemáticas',
    icon: <FaCalculator />,
    items: [
      { label: 'Geometría 3D', route: '/matematicas/geometria-3d' },
      { label: 'Descomposición Figuras', route: '/matematicas/descomposicion' },
      { label: 'Simetría', route: '/matematicas/simetría' },
      { label: 'Fracciones 3D', route: '/matematicas/fracciones-3d' },
    ]
  },
  {
    label: 'Ciencias Naturales',
    icon: <FaLeaf />,
    items: [
      { label: 'Anatomía 3D', route: '/ciencias-naturales/anatomia-3d' },
      { label: 'Sistema Solar', route: '/ciencias-naturales/sistema-solar' },
      { label: 'Ciclo del Agua', route: '/ciencias-naturales/ciclo-agua' },
      { label: 'Clasificación Animales', route: '/ciencias-naturales/animales' },
      { label: 'Energía en Acción', route: '/ciencias-naturales/energia' },
    ]
  },
  {
    label: 'Ciencias Sociales',
    icon: <FaGlobe />,
    items: [
      { label: 'Mapa 3D Colombia', route: '/ciencias-sociales/mapa-colombia' },
      { label: 'Globo Terráqueo', route: '/ciencias-sociales/globo-terraqueo' },
    ]
  },
  {
    label: 'Tecnología',
    icon: <FaRobot />,
    items: [
      { label: 'Simulación Robots', route: '/tecnologia/robots' },
    ]
  },
  {
    label: 'Arte y Creatividad',
    icon: <FaPalette />,
    items: [
      { label: 'Pintura 3D', route: '/arte/pintura-3d' },
      { label: 'Escultura Digital', route: '/arte/escultura' },
    ]
  }
];

const mainItems: SidebarItem[] = [
  { label: 'Inicio', route: '/', icon: <FaHome /> },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'Matemáticas': true,
    'Ciencias Naturales': false,
    'Ciencias Sociales': false,
    'Tecnología': false,
    'Arte y Creatividad': false,
  });

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupLabel]: !prev[groupLabel]
    }));
  };

  const renderNavItem = ({ label, route, icon }: SidebarItem) => (
    <NavLink
      key={route}
      to={route}
      onClick={() => onClose?.()}
      className={({ isActive }) =>
        `w-full text-left flex items-center gap-2 justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 
         hover:bg-slate-50 dark:hover:bg-slate-800 
         ${isActive ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : ''}`
      }
    >
      <div className='flex items-center gap-2'>{icon} {label}</div>
    </NavLink>
  );

  const renderGroup = (group: SidebarGroup) => (
    <div key={group.label} className='space-y-1'>
      <button
        onClick={() => toggleGroup(group.label)}
        className='w-full text-left flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 
                   hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
      >
        <div className='flex items-center gap-2'>
          {group.icon} {group.label}
        </div>
        <span>{openGroups[group.label] ? '▼' : '▶'}</span>
      </button>
      {openGroups[group.label] && (
        <div className='pl-4 space-y-1'>
          {group.items.map(renderNavItem)}
        </div>
      )}
    </div>
  );

  return (
    <aside role="complementary" className='h-full w-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto'>
      <div className='p-3 space-y-1'>
        {/* Botón cerrar en mobile */}
        <button
          onClick={onClose}
          className="md:hidden w-full text-right px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        >
          ✕ Cerrar
        </button>
        
        {/* Elementos principales */}
        {mainItems.map(renderNavItem)}
        
        {/* Grupos temáticos */}
        <div className='pt-2 border-t border-slate-200 dark:border-slate-700 mt-2'>
          {sidebarGroups.map(renderGroup)}
        </div>
      </div>
    </aside>
  );
}
