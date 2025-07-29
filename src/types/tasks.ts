export interface TasksPrototype {
  tasks: TaskPrototype[];
}
export interface TaskPrototype {
  index: string;
  name: string;
  description?: string;
}
