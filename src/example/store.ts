import { extract, CreateTable, type Store, type Table } from '@datahook/trigger';

type Owner = {
    _pk: number;
    ownerID: number;
    firstName: string;
    lastName: string;
}

type Item = {
    _pk: number;
    ownerID: Owner["ownerID"];
    description: string;
};

interface MyStore extends Store {
    tables: {
        owners: Table<Owner>;
        activeItems: Table<Item>;
        completedItems: Table<Item>;
    };
}

const s: MyStore = {
    tables: {
        owners: CreateTable<Owner>({ _pk: [], ownerID: [], firstName: [], lastName: [], }),
        activeItems: CreateTable<Item>({ _pk: [], ownerID: [], description: [], }),
        completedItems: CreateTable<Item>({ _pk: [], ownerID: [], description: [], }),
    },
};

/*** EXTRACT AND EXPORT OUR STORE */
export const { tables } = extract(s);