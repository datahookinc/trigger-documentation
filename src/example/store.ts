import { extract, CreateTable, type Store, type Single, type Table, CreateSingle } from '@datahook/trigger';
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

interface MyStore extends Store {
    tables: {
        taskOwners: Table<TaskOwner>;
        activeTasks: Table<Task>;
        completedTasks: Table<Task>;
    },
    singles: {
        initialLoad: Single<boolean>;
    }
};

const s: MyStore = {
    tables: {
        taskOwners: CreateTable<TaskOwner>({ ownerId: [1, 2, 3, 4], firstName: ['Bill', 'Steve', 'Ada', 'Alan'], lastName: ['Gates', 'Jobs', 'Lovelace', 'Turing'] }),
        activeTasks: CreateTable<Task>(['ownerId', 'description']),
        completedTasks: CreateTable<Task>(['ownerId', 'description']),
    },
    singles: {
        initialLoad: CreateSingle(true),
    }
};

/*** EXTRACT AND EXPORT OUR STORE */
export const { tables, singles } = extract(s);