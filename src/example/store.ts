import { extract, CreateTable, type Store, type Single, type Table, CreateSingle } from '@datahook/trigger';

type TaskOwner = {
    ownerID: number;
    firstName: string;
    lastName: string;
}

type Task = {
    ownerID: number;
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
}

const s: MyStore = {
    tables: {
        taskOwners: CreateTable<TaskOwner>(['ownerID', 'firstName', 'lastName']),
        activeTasks: CreateTable<Task>(['ownerID', 'description']),
        completedTasks: CreateTable<Task>(['ownerID', 'description']),
    },
    singles: {
        initialLoad: CreateSingle(true),
    }
};

/*** EXTRACT AND EXPORT OUR STORE */
export const { tables, singles } = extract(s);