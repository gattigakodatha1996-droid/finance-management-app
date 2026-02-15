import { 
  ShoppingCart, Heart, PawPrint, Film, Home, 
  UtensilsCrossed, Cookie, Gift, HandHeart, 
  TrendingUp, Shirt, Sofa, GraduationCap, 
  Car, Activity, Landmark, MoreHorizontal 
} from 'lucide-react';

export function getCategoryIcon(category: string) {
  const iconMap: Record<string, React.ComponentType<any>> = {
    'Shopping': ShoppingCart,
    'Beauty': Heart,
    'Pet': PawPrint,
    'Entertainment': Film,
    'Home': Home,
    'Food': UtensilsCrossed,
    'Snacks': Cookie,
    'Gift': Gift,
    'Donate': HandHeart,
    'Investments': TrendingUp,
    'Apparel': Shirt,
    'Household': Sofa,
    'Education': GraduationCap,
    'Transportation': Car,
    'Health': Activity,
    'Culture': Landmark,
    'Other': MoreHorizontal
  };
  
  return iconMap[category] || MoreHorizontal;
}

export function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    'Shopping': '#86EFAC',
    'Beauty': '#C084FC',
    'Pet': '#67E8F9',
    'Entertainment': '#FCA5A5',
    'Home': '#A78BFA',
    'Food': '#FDE047',
    'Snacks': '#FDE047',
    'Gift': '#FCD34D',
    'Donate': '#60A5FA',
    'Investments': '#F472B6',
    'Apparel': '#FB923C',
    'Household': '#FCA5A5',
    'Education': '#FCD34D',
    'Transportation': '#FDE047',
    'Health': '#86EFAC',
    'Culture': '#A78BFA',
    'Other': '#D4D4D8'
  };
  
  return colorMap[category] || '#D4D4D8';
}
