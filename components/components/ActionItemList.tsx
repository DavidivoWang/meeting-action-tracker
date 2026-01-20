
import React from 'react';
import { ActionItem } from '../types';
import { CheckCircle2, Circle, Clock, User, Calendar, Lock, List } from 'lucide-react';

interface ActionItemListProps {
  items: ActionItem[];
  onToggleStatus: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ActionItem>) => void;
}

const ActionItemList: React.FC<ActionItemListProps> = ({ items, onToggleStatus, onUpdate }) => {
  const isOverdue = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dueDate);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          {/* Fixed: Added missing 'List' import from lucide-react */}
          <List className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-slate-900 font-semibold mb-1">No action items yet</h3>
        <p className="text-slate-500 text-sm max-w-xs">
          Add an action item manually or use the AI Assistant to get started.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {items.map((item) => {
        const overdue = isOverdue(item.dueDate) && item.status !== 'Done';
        const isDone = item.status === 'Done';

        return (
          <li 
            key={item.id} 
            className={`p-6 transition-all group ${isDone ? 'bg-slate-50/50' : 'hover:bg-indigo-50/30'}`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => onToggleStatus(item.id)}
                className={`flex-shrink-0 mt-1 transition-colors ${
                  isDone ? 'text-green-500' : 'text-slate-300 hover:text-indigo-500'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-6 h-6 fill-green-50" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {isDone ? (
                    <span className="text-slate-500 font-medium line-through decoration-slate-300 truncate text-base">
                      {item.title}
                    </span>
                  ) : (
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => onUpdate(item.id, { title: e.target.value })}
                      className="text-slate-900 font-semibold bg-transparent border-none focus:ring-0 p-0 text-base w-full truncate"
                    />
                  )}
                  {overdue && (
                    <span className="flex-shrink-0 inline-flex items-center gap-1 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight animate-pulse">
                      <Clock className="w-3 h-3" />
                      Overdue
                    </span>
                  )}
                  {isDone && (
                    <span className="flex-shrink-0 inline-flex items-center gap-1 bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight">
                      <Lock className="w-3 h-3" />
                      Read Only
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <User className="w-3.5 h-3.5" />
                    {isDone ? (
                      <span>{item.owner}</span>
                    ) : (
                      <input
                        type="text"
                        value={item.owner}
                        onChange={(e) => onUpdate(item.id, { owner: e.target.value })}
                        className="bg-transparent border-none focus:ring-0 p-0 w-24 text-slate-600"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {isDone ? (
                      <span>{item.dueDate}</span>
                    ) : (
                      <input
                        type="date"
                        value={item.dueDate}
                        onChange={(e) => onUpdate(item.id, { dueDate: e.target.value })}
                        className="bg-transparent border-none focus:ring-0 p-0 text-slate-600"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ActionItemList;
