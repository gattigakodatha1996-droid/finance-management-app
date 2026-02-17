import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { categories } from '../utils/mockData';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers';

interface AddTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: any) => void;
}

export function AddTransactionDialog({ isOpen, onClose, onAdd }: AddTransactionDialogProps) {
  const [category, setCategory] = useState('Shopping');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState<'You' | 'Wife'>('You');
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  if (!isOpen) return null;

  const allCategories = [...categories, ...customCategories];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      date: new Date(),
      category,
      amount: Math.abs(parseFloat(amount)),
      description,
      user,
    });
    setAmount('');
    setDescription('');
    setShowCategorySelector(false);
    onClose();
  };

  const handleAddNewCategory = () => {
    if (newCategoryName.trim()) {
      setCustomCategories([...customCategories, newCategoryName.trim()]);
      setCategory(newCategoryName.trim());
      setNewCategoryName('');
      setIsAddingNewCategory(false);
      setShowCategorySelector(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 bg-surface border border-border-color rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary transition-colors';

  const toggleUserClass = (active: boolean) =>
    `flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
      active
        ? 'bg-accent-primary text-white shadow-accent-glow'
        : 'bg-surface-elevated border border-border-color text-text-secondary hover:text-accent-primary'
    }`;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div className="bg-surface border border-border-color rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Sticky header */}
        <div className="sticky top-0 bg-surface border-b border-border-color p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Add Expense</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-elevated hover:bg-accent-primary/10 border border-border-color flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className={inputClass}
              placeholder="0.00"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>

            {!showCategorySelector ? (
              <button
                type="button"
                onClick={() => setShowCategorySelector(true)}
                className="w-full flex items-center justify-between p-3 bg-surface border border-border-color rounded-lg hover:border-accent-primary transition-colors"
              >
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = getCategoryIcon(category);
                    const color = getCategoryColor(category);
                    return (
                      <>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: color + '22' }}
                        >
                          <Icon className="w-5 h-5" style={{ color }} />
                        </div>
                        <span className="font-medium text-text-primary">{category}</span>
                      </>
                    );
                  })()}
                </div>
                <span className="text-sm text-accent-primary">Change</span>
              </button>
            ) : (
              <div className="bg-surface border border-border-color rounded-lg p-3 space-y-3">
                {isAddingNewCategory ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Category name"
                      className={inputClass}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleAddNewCategory}
                        className="flex-1 py-2 bg-accent-primary text-white rounded-lg font-medium hover:bg-accent-secondary transition-colors shadow-accent-glow"
                      >
                        Add Category
                      </button>
                      <button
                        type="button"
                        onClick={() => { setIsAddingNewCategory(false); setNewCategoryName(''); }}
                        className="flex-1 py-2 bg-surface-elevated border border-border-color text-text-secondary rounded-lg font-medium hover:text-text-primary transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                      {allCategories.map((cat) => {
                        const Icon = getCategoryIcon(cat);
                        const color = getCategoryColor(cat);
                        const isSelected = category === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => { setCategory(cat); setShowCategorySelector(false); }}
                            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                              isSelected
                                ? 'ring-2 ring-accent-primary bg-accent-primary/10'
                                : 'hover:bg-surface-elevated'
                            }`}
                          >
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: color + '22' }}
                            >
                              <Icon className="w-5 h-5" style={{ color }} />
                            </div>
                            <span className="text-xs text-text-muted text-center line-clamp-2">{cat}</span>
                          </button>
                        );
                      })}

                      {/* Add new category */}
                      <button
                        type="button"
                        onClick={() => setIsAddingNewCategory(true)}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface-elevated border-2 border-dashed border-border-color hover:border-accent-primary transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-elevated">
                          <Plus className="w-5 h-5 text-text-muted" />
                        </div>
                        <span className="text-xs text-text-muted text-center">New</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCategorySelector(false)}
                      className="w-full py-2 text-sm text-text-muted hover:text-accent-primary transition-colors"
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className={inputClass}
              placeholder="Enter description"
            />
          </div>

          {/* Paid by */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Paid by</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setUser('You')} className={toggleUserClass(user === 'You')}>
                Loki
              </button>
              <button type="button" onClick={() => setUser('Wife')} className={toggleUserClass(user === 'Wife')}>
                Vasu
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-accent-primary text-white rounded-lg font-semibold hover:bg-accent-secondary transition-all duration-200 shadow-accent-glow"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}
