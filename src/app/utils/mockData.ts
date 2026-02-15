export interface Transaction {
  id: string;
  date: Date;
  category: string;
  amount: number;
  description: string;
  user: 'You' | 'Wife';
}

export const categories = [
  'Shopping',
  'Beauty',
  'Pet',
  'Entertainment',
  'Home',
  'Food',
  'Snacks',
  'Gift',
  'Donate',
  'Investments',
  'Apparel',
  'Household',
  'Education',
  'Transportation',
  'Health',
  'Culture',
  'Other'
];

export const mockTransactions: Transaction[] = [
  {
    id: '2',
    date: new Date('2024-09-01'),
    category: 'Gift',
    amount: 10,
    description: 'Birthday gift',
    user: 'Wife'
  },
  {
    id: '3',
    date: new Date('2024-09-01'),
    category: 'Pet',
    amount: 20,
    description: 'Pet food',
    user: 'You'
  },
  {
    id: '4',
    date: new Date('2024-09-01'),
    category: 'Shopping',
    amount: 236,
    description: 'Grocery shopping',
    user: 'Wife'
  },
  {
    id: '5',
    date: new Date('2024-09-01'),
    category: 'Donate',
    amount: 20,
    description: 'Charity donation',
    user: 'You'
  },
  {
    id: '6',
    date: new Date('2024-09-02'),
    category: 'Food',
    amount: 5,
    description: 'Coffee',
    user: 'You'
  },
  {
    id: '7',
    date: new Date('2024-09-02'),
    category: 'Pet',
    amount: 56,
    description: 'Vet visit',
    user: 'Wife'
  },
  {
    id: '8',
    date: new Date('2024-09-03'),
    category: 'Snacks',
    amount: 5,
    description: 'Snacks',
    user: 'You'
  },
  {
    id: '9',
    date: new Date('2024-09-03'),
    category: 'Home',
    amount: 63,
    description: 'Home supplies',
    user: 'Wife'
  },
  {
    id: '10',
    date: new Date('2024-09-04'),
    category: 'Beauty',
    amount: 136,
    description: 'Beauty products',
    user: 'Wife'
  },
  {
    id: '11',
    date: new Date('2024-09-05'),
    category: 'Entertainment',
    amount: 71,
    description: 'Movie tickets',
    user: 'You'
  },
  {
    id: '12',
    date: new Date('2024-09-06'),
    category: 'Transportation',
    amount: 45,
    description: 'Gas',
    user: 'You'
  },
  {
    id: '13',
    date: new Date('2024-09-07'),
    category: 'Health',
    amount: 85,
    description: 'Pharmacy',
    user: 'Wife'
  },
  {
    id: '14',
    date: new Date('2024-09-08'),
    category: 'Food',
    amount: 45,
    description: 'Restaurant',
    user: 'You'
  }
];

export function getTransactionsByCategory() {
  const categoryTotals = new Map<string, number>();
  
  mockTransactions.forEach(transaction => {
    const current = categoryTotals.get(transaction.category) || 0;
    categoryTotals.set(transaction.category, current + transaction.amount);
  });
  
  return Array.from(categoryTotals.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

export function getTotalExpenses() {
  return mockTransactions.reduce((sum, t) => sum + t.amount, 0);
}