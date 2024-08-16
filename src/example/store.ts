import { CreateSingle, CreateStore, CreateTable } from '@datahook/trigger';
export type { TableRow } from '@datahook/trigger';

type TaskOwner = {
    ownerId: number;
    firstName: string;
    lastName: string;
};

export type Task = {
    ownerId: number;
    description: string;
};


export const store = CreateStore({
    taskOwners: CreateTable<TaskOwner>({ ownerId: [1, 2, 3, 4], firstName: ['Bill', 'Steve', 'Ada', 'Alan'], lastName: ['Gates', 'Jobs', 'Lovelace', 'Turing'] }),
    activeTasks: CreateTable<Task>(['ownerId', 'description']),
    completedTasks: CreateTable<Task>(['ownerId', 'description']),
    initialLoad: CreateSingle(true),
});