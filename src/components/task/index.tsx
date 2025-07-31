'use client';

import { TaskPrototype } from '@/types/tasks';
import {
  IconCircleMinus,
  IconEdit,
  IconChevronDown,
  IconDeviceFloppy,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';

/**
 * Set onRemove and onUpdate to the Task's props
 */
interface TaskProps extends TaskPrototype {
  onRemove: (id: string) => void;
  onUpdate: (id: string, newName: string, newDescription: string) => void;
}
/**
 * Returns the box of each task with the paramethers
 * @param param0
 * @returns Task
 */
export function Task({
  index,
  name,
  description,
  onRemove,
  onUpdate,
}: TaskProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * variables and function to edit
   */
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);
  /**
   * Check if the box of the task name is checked
   */
  const handleCheckboxChange = () => setIsChecked(!isChecked);

  /**
   * Check if the task is Expanded
   */
  const toggleExpand = () => setIsExpanded(!isExpanded);

  /**
   * Save the editing values
   */
  const handleSave = () => {
    onUpdate(index, editedName, editedDescription);
    setIsEditing(false);
  };
  /**
   * Cancel the editing and return the original values
   */
  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(name);
    setEditedDescription(description);
  };

  /**
   * if isEditing is true. This component changes/return to the editing mode
   */
  if (isEditing) {
    return (
      <div className="w-full max-w-lg p-4 mx-auto my-2 rounded-md bg-[#5e4b45] text-white transition-all duration-300 ring-2 ring-[#dbbaac]">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full p-2 rounded bg-[#473733] focus:outline-none focus:ring-1 focus:ring-[#a56446]"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 rounded bg-[#473733] text-white focus:outline-none focus:ring-1 focus:ring-[#a56446] h-24 resize-none"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleCancel}
              className="p-2 text-red-200 hover:text-red-400"
            >
              <IconX aria-label="Cancelar edição" />
            </button>
            <button
              onClick={handleSave}
              className="p-2 text-green-200 hover:text-green-400"
            >
              <IconDeviceFloppy aria-label="Salvar edição" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  /**
   * If isEditing is false, return the default version of the task
   */
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
      {/**
       * If is expanded, return the task and the expanded version
       */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-white">
          <p
            className={`mb-3 whitespace-pre-wrap ${isChecked ? 'line-through text-gray-400' : ''}`}
          >
            {description || 'Sem descrição.'}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(true)}
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
