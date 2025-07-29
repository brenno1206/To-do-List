'use client';
import { TaskPrototype } from '@/types/tasks';
import { IconCircleMinus, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';

export function Task(props: TaskPrototype) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="group border-2 w-90 p-5 mx-auto rounded-md my-2 bg-[#5e4b45] text-white">
      <div className="flex flex-row justify-between">
        <div className="relative left-2">
          <label className={isChecked ? 'line-through text-gray-400' : ''}>
            <input
              type="checkbox"
              name={props.name}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />{' '}
            {props.name}
          </label>
        </div>
        <button className="pl-10 j">
          <IconCircleMinus />
        </button>
      </div>
    </div>
  );
}

/**
 * IconCircleMinus
 * IconCirclePlus
 * IconEdit
 * ________ +
 * [ ] titulo       -(remover)
 * descricao (aumenta qnd hover) ()update
 *
 * 
 * 
 * <div className="flex flex-row justify-around">
        <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 p-l5">
          {props.description}
        </p>
        <button>0</button>
      </div>
 */
