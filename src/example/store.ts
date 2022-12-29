import { extract, CreateTable, type Store, type Table } from '@datahook/trigger';

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
    };
}

const s: MyStore = {
    tables: {
        taskOwners: CreateTable<TaskOwner>({ ownerID: [], firstName: [], lastName: [], }),
        activeTasks: CreateTable<Task>({ ownerID: [], description: [], }),
        completedTasks: CreateTable<Task>({ ownerID: [], description: [], }),
    },
};

/*** EXTRACT AND EXPORT OUR STORE */
export const { tables } = extract(s);