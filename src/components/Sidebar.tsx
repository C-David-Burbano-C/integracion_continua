import { NavLink } from 'react-router-dom';
import { FaHome, FaSun, FaGlobe, FaMap, FaRobot } from 'react-icons/fa';

interface SidebarItem {
  label: string;
  route: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Inicio', route: '/', icon: <FaHome /> },
  { label: 'Sistema Solar', route: '/sistema-solar', icon: <FaSun /> },
  { label: 'Mapa Colombia', route: '/mapa-colombia', icon: <FaMap /> },
  { label: 'Globo Terráqueo', route: '/globo-terraqueo', icon: <FaGlobe /> },
  { label: 'Simulación Robots', route: '/simulacion-robots', icon: <FaRobot /> },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const renderNavItem = ({ label, route, icon }: SidebarItem) => (
    <NavLink
      key={route}
      to={route}
      onClick={() => onClose?.()}
      className={({ isActive }) =>
        `w-full text-left flex items-center gap-3 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-300 
         hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors
         ${isActive ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold' : ''}`
      }
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </NavLink>
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
        
        {/* Navegación */}
        <nav className="space-y-1">
          {sidebarItems.map(renderNavItem)}
        </nav>
      </div>
    </aside>
  );
}
