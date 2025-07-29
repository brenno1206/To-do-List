'use client';

import { TaskPrototype } from '@/types/tasks';
import {
  IconCircleMinus,
  IconEdit,
  IconChevronDown,
} from '@tabler/icons-react';
import { useState } from 'react';

interface TaskProps extends TaskPrototype {
  onRemove: (id: string) => void;
  onUpdate?: (id: string, newName?: string, newDescription?: string) => void;
}

export function Task({
  index,
  name,
  description,
  onRemove,
  onUpdate,
}: TaskProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="w-full max-w-lg p-4 mx-auto my-2 rounded-md bg-[#5e4b45] text-white transition-all duration-300">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center flex-grow">
          <label
            className={`cursor-pointer ${isChecked ? 'line-through text-gray-400' : ''}`}
          >
            <input
              type="checkbox"
              name={name}
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-3 h-5 w-5"
            />
            {name}
          </label>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => onRemove(index)}
            className="p-1 text-red-200 hover:text-red-400 transition-colors"
          >
            <IconCircleMinus size={20} />
          </button>
          <button onClick={toggleExpand} className="p-1 ml-2">
            <IconChevronDown
              size={20}
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-white">
          <p
            className={`mb-3 whitespace-pre-wrap ${isChecked ? 'line-through text-gray-400' : ''}`}
          >
            {description || 'Sem descrição.'}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => {}}
              className="flex items-center p-1 text-sm bg-blue-500 hover:bg-blue-600 rounded"
            >
              <IconEdit size={16} className="mr-1 w-full mx-auto" /> Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
