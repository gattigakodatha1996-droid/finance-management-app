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
    
    const transaction = {
      id: Date.now().toString(),
      date: new Date(),
      category,
      amount: Math.abs(parseFloat(amount)),
      description,
      user
    };
    
    onAdd(transaction);
    
    // Reset form
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
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Expense</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
              placeholder="0.00"
            />
          </div>
          
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            
            {!showCategorySelector ? (
              // Selected category display
              <button
                type="button"
                onClick={() => setShowCategorySelector(true)}
                className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = getCategoryIcon(category);
                    const color = getCategoryColor(category);
                    return (
                      <>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: color + '40' }}
                        >
                          <Icon className="w-5 h-5" style={{ color }} />
                        </div>
                        <span className="font-medium text-gray-900">{category}</span>
                      </>
                    );
                  })()}
                </div>
                <span className="text-sm text-gray-500">Change</span>
              </button>
            ) : (
              // Category selector
              <div className="border border-gray-300 rounded-lg p-3 space-y-3">
                {isAddingNewCategory ? (
                  // Add new category input
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Enter category name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleAddNewCategory}
                        className="flex-1 py-2 bg-[#EAB308] text-white rounded-lg font-medium hover:bg-[#CA8A04] transition-colors"
                      >
                        Add Category
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingNewCategory(false);
                          setNewCategoryName('');
                        }}
                        className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
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
                            onClick={() => {
                              setCategory(cat);
                              setShowCategorySelector(false);
                            }}
                            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                              isSelected ? 'ring-2 ring-[#EAB308]' : 'hover:bg-gray-50'
                            }`}
                          >
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: color + '40' }}
                            >
                              <Icon className="w-5 h-5" style={{ color }} />
                            </div>
                            <span className="text-xs text-gray-600 text-center line-clamp-2">{cat}</span>
                          </button>
                        );
                      })}
                      
                      {/* Add new category button */}
                      <button
                        type="button"
                        onClick={() => setIsAddingNewCategory(true)}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-all border-2 border-dashed border-gray-300"
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                          <Plus className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-xs text-gray-600 text-center">New</span>
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setShowCategorySelector(false)}
                      className="w-full py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
              placeholder="Enter description"
            />
          </div>
          
          {/* User */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Paid by
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUser('You')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  user === 'You' 
                    ? 'bg-[#EAB308] text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                You
              </button>
              <button
                type="button"
                onClick={() => setUser('Wife')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  user === 'Wife' 
                    ? 'bg-[#EAB308] text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Wife
              </button>
            </div>
          </div>
          
          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#EAB308] text-white rounded-lg font-semibold hover:bg-[#CA8A04] transition-colors"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}