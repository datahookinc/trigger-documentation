import { type Section } from './types';

const table: Section = {
    name: 'Table',
    description: 'Tables are the backbone of Trigger and offer unique experiences compared to other React state management libraries. The following methods are available for interacting with your tables once created.',
    api: [
        {
            name: 'use()',
            description: `Retrieves rows from the specified table and rerenders your component. If notify is ommitted, the component will rerender for all events on the specified table. Supported notify events are: <span class="inline-code api-inline">'rowInsert' | 'rowUpdate' | 'rowDelete'</span>. If a filtering function is not provided to the <span class="inline-code api-inline">where</span> parameter, this will return all rows in the table.`,
            signature: `use(where?: ((row: TableRow<T>) => boolean) | null, notify?: ['rowInsert' | 'rowUpdate' | 'rowDelete']): TableRow<T>[]`,
            parameters: [
                {
                    name: 'where',
                    optional: true,
                    type: `(row: TableRow\<T\>) => boolean) | null`,
                    description: 'accepts a function, null, or undefined. If a function is provided, it will receive each value in the table, allowing you to filter the table as needed. Omitting or passing undefined, will return all rows. Passing null will also return all rows, but it allows you to set the notify parameter',
                },
                {
                    name: 'notify',
                    optional: true,
                    type: `['rowInsert' | 'rowUpdate' | 'rowDelete']`,
                    description: 'allows the user to specify which table events will cause the component to rerender. If omitted, the rows will be retrieved and the component rerendered everytime there is a change to any row in the table.',
                }
            ],
            returns: 'An array of rows from the table',
            examples: [
                `// returns all rows from the cats table
// will rerender the component whenever any change occurs to the table
import { tables } from './store';
const rows = tables.cats.use();`,
                `// returns all rows from the cats table where the name is "Cleo"
// will rerender the component whenever a new row is inserted or deleted
import { tables } from './store';
const rows = tables.cats.use(row => row.name === 'Cleo', ['rowInsert', 'rowDelete']);`,
            ],
        },
        {
            name: 'useRow()',
            description: `Retrieves a row from the specified table and rerenders your component. If notify is ommitted, the component will rerender for all events on the specified row. Supported notify events are: <span class="inline-code api-inline">'rowUpdate' | 'rowDelete'</span>.`,
            signature: `useRow(_pk: number, notify?: ['rowUpdate', 'rowDelete']): TableRow<T> | undefined`,
            parameters: [
                {
                    name: '_pk',
                    optional: false,
                    type: `number`,
                    description: 'the autogenerated primary key (_pk) for the row you would like to retrieve',
                },
                {
                    name: 'notify',
                    optional: true,
                    type: `['rowUpdate' | 'rowDelete']`,
                    description: 'allows the user to specify which row events will cause the component to rerender. If omitted, the component will rerender whenever the row is updated or deleted.',
                }
            ],
            returns: 'A row from the table, or undefined if no row matches the provided primary key',
            examples: [
                `// returns the row with an autogenerated _pk entry of 10
// will rerender the component whenever the row is updated or deleted
import { tables } from './store';
const row = tables.cats.useRow(10);`,
                `// returns the row with an autogenerated _pk entry of 10
// will rerender the component whenever the row is updated
import { tables } from './store';
const row = tables.cats.useRow(10, ['rowUpdate']);`,
            ],
        },
        {
            name: 'getRow()',
            description: `Retrieves the first matching row from the specified table without causing your component to rerender.`,
            signature: `getRow(where: number | Partial<T> | ((v: TableRow<T>) => boolean)): TableRow<T> | undefined`,
            parameters: [
                {
                    name: 'where',
                    optional: false,
                    type: `number | Partial<T> | ((v: TableRow<T>) => boolean)`,
                    description: `receives the primary key (<em>_pk</em>) of the row to return, an object to match the first row found based on equality of each property value, or a function that returns <span class="inline-code api-inline">true</span> if the row should be returned and <span class="inline-code api-inline">false</span> if it should not be returned`,
                },
            ],
            returns: 'The updated row, or undefined if the update could not be performed',
            examples: [
                `// returns the row with a _pk of 10
import { tables } from './store';
const row = tables.cats.getRow(10);`,
                `// returns the first row where the name is "PJ"
import { tables } from './store';
const row = tables.cats.getRow({ name: 'PJ' })`,
                `// returns the first row where the age is greater than 7
import { tables } from './store';
const row = tables.cats.getRow(cat => cat.age > 7)`,
            ],
        },
        {
            name: 'getRows()',
            description: `Retrieves matching rows from the specified table without causing your component to rerender.`,
            signature: `getRows(where?: Partial<T> | ((v: TableRow<T>) => boolean)): TableRow<T>[]`,
            parameters: [
                {
                    name: 'where',
                    optional: true,
                    type: `Partial<T> | ((row: TableRow<T>) => boolean`,
                    description: `receives an object to match rows based on equality of each property value, or a function that returns <span class="inline-code api-inline">true</span> if the row should be returned and <span class="inline-code api-inline">false</span> if it should not be returned. If omitted, all rows will be returned from the table.`,
                },
            ],
            returns: 'An array of rows that were matched',
            examples: [
                `// return all rows from the cats table
import { tables } from './store';
const rows = tables.cats.getRows();`,
                `// return all rows from the cats table named "PJ"
import { tables } from './store';
const rows = tables.cats.getRows({ name: "PJ" });`,
                `// return all rows from the cats table with an age greater than 7
import { tables } from './store';
const rows = tables.cats.getRows(cat => cat.age > 7);`,
            ],
        },
        {
            name: 'getRowCount()',
            description: `Returns the number of matching rows in the specified.`,
            signature: `getRowCount(where?: Partial<T> | ((v: TableRow<T>) => boolean)): number`,
            parameters: [
                {
                    name: 'where',
                    optional: true,
                    type: `Partial<T> | ((row: TableRow<T>) => boolean`,
                    description: `receives an object to count rows based on equality of each property value, or a function that returns <span class="inline-code api-inline">true</span> if the row should be counted and <span class="inline-code api-inline">false</span> if it should not be counted. If omitted, all rows will be counted from the table.`,
                },
            ],
            returns: 'The count of matching rows',
            examples: [
                `// count all rows from the cats table
import { tables } from './store';
const n = tables.cats.getRowCount();`,
                `// count all rows from the cats table named "PJ"
import { tables } from './store';
const n = tables.cats.getRowCount({ name: "PJ" });`,
                `// count all rows from the cats table with an age greater than 7
import { tables } from './store';
const n = tables.cats.getRowCount(cat => cat.age > 7);`,
            ],
        },
        {
            name: 'insertRow()',
            description: `Inserts a new row into the specified table. The user does not need to provide the <em>_pk</em> property as this will be handled automatically. This will return the newly inserted row or <em>undefined</em> if the user has a <span class="inline-code api-inline">beforeInsertTrigger</span> attached to the table that aborts the insert.`,
            signature: `insertRow(row: T): TableRow<T> | undefined`,
            parameters: [
                {
                    name: 'row',
                    optional: false,
                    type: `object`,
                    description: "an object with keys and values for the table's column names",
                },
            ],
            returns: 'The newly inserted row, or <em>undefined</em> if the insert was aborted',
            examples: [
                `// returns the newly insertedRow
import { tables } from './store';
const row = tables.cats.insertRow({ name: 'Cleo', age: 7 });`,
            ],
        },
        {
            name: 'insertRows()',
            description: `Inserts multiple rows into the specified table. The user does not need to provide the <em>_pk</em> property for each row as this will be handled automatically. This will return the newly inserted rows. Any attached triggers (e.g., <span class="inline-code api-inline">beforeInsertTrigger</span>) will be fired for each row. By default, components with a matching <span class="inline-code api-inline">use()</span> hook will only be rerendered after all rows are inserted. To override this behavior, pass <span class="inline-code api-inline">false</span> as the second argument, instructing Trigger to rerender components on each insert, which is the same behavior as manually calling <span class="inline-code api-inline">insertRow()</span> multiple times.`,
            signature: `insertRows(rows: T[], batchNotify?: boolean): TableRow<T>[]`,
            parameters: [
                {
                    name: 'rows',
                    optional: false,
                    type: `object[]`,
                    description: "an array of objects with keys and values for the table's column names",
                },
                {
                    name: 'batchNotify',
                    optional: true,
                    type: `boolean`,
                    description: 'passing false will rerender components for each inserted row',
                },
            ],
            returns: 'An array of rows that were inserted, or an empty array if all inserts were aborted',
            examples: [
                `// returns the newly inserted rows; components will rerender after all rows are inserted
import { tables } from './store';
const rows = tables.cats.insertRows([ { name: 'Cleo', age: 7 }, { name: 'PJ', age: 6 } ]);`,
                `// returns the newly inserted rows; components will rerender as each row is inserted
import { tables } from './store';
const rows = tables.cats.insertRows([ { name: 'Cleo', age: 7 }, { name: 'PJ', age: 6 } ], false);`,

            ],
        },
        {
            name: 'onBeforeInsert()',
            description: `A trigger function that can be attached to a table before a new row is inserted.`,
            signature: `onBeforeInsert(fn: (row: TableRow<T>) => TableRow<T> | void | boolean): void`,
            parameters: [
                {
                    name: 'fn',
                    optional: false,
                    type: `(row: TableRow<T>) => TableRow<T> | void | boolean`,
                    description: `a function that receives the row being inserted, allowing changes to be made to the value prior to insertion. The user can cancel the insert by returning <span class="inline-code api-inline">false</span>. Returning nothing or <span class="inline-code api-inline" style="font-size: 0.9em">true</span> will ignore any changes made in the function and insert the row as originally intended.`,
                },
            ],
            returns: 'Nothing',
            examples: [
                `// when inserting a row, change all names to lowercase and add 1 to the age
import { tables } from './store';
tables.cats.onBeforeInsert(cat => {
cat.name = cat.name.toLowerCase();
cat.age += 1;
return cat;
});`,
            ],
        },
        {
            name: 'onAfterInsert()',
            description: `A trigger function that can be attached to a table after a new row is inserted.`,
            signature: `onAfterInsert(fn: (row: TableRow<T>) => void): void`,
            parameters: [
                {
                    name: 'fn',
                    optional: false,
                    type: `(row: TableRow<T>) => void`,
                    description: `a function that receives the row that was just inserted. This can be useful when needing to perform additional actions (e.g., inserting a row into another table) based on the value of the inserted row.`,
                },
            ],
            returns: 'Nothing',
            examples: [
                `// the newly insert row is used to insert a row into another table
import { tables } from './store';
tables.cats.onAfterInsert(cat => {
tables.coolCats.insertRow({ name: cat.name, age: cat.age });
});`,
            ],
        },
        {
            name: 'deleteRow()',
            description: `Will delete the first matching row only, returning <span class="inline-code api-inline">true</span> if a row was deleted and <span class="inline-code api-inline">false</span> if a row was not deleted. The primary use of this function is for when the user knows the primary key (<em>_pk</em>) of the row to be deleted.`,
            signature: `deleteRow(where: number | Partial<T> | ((row: TableRow<T>) => boolean)): boolean`,
            parameters: [
                {
                    name: 'where',
                    optional: false,
                    type: `(where: number | Partial<T> | ((row: TableRow<T>) => boolean)`,
                    description: `a function that receives the primary key (<em>_pk</em>) of the row to delete, an object to match the first row found based on equality of each property value, or a function that returns <span class="inline-code api-inline">true</span> if the row should be deleted and <span class="inline-code api-inline">false</span> if it should not be deleted`,
                },
            ],
            returns: '<span class="inline-code api-inline">true</span> if a row was deleted and <span class="inline-code api-inline">false</span> if a row was not deleted',
            examples: [
                `// delete the cat with a _pk entry of 3
import { tables } from './store';
tables.cats.deleteRow(3);`,
                `// delete the first cat found with the name "PJ"
import { tables } from './store';
tables.cats.deleteRow({ name: 'PJ' });`,
                `// delete the first cat found whose age is > 7
import { tables } from './store';
tables.cats.deleteRow(cat => cat.age > 7);`,
            ],
        },
        {
            name: 'deleteRows()',
            description: `Will delete all rows matching the object or function passed to the <span class="inline-code api-inline">where</span> parameter. If <span class="inline-code api-inline">where</span> is <span class="inline-code api-inline">undefined</span> or <span class="inline-code api-inline">null</span>, all rows in the table will be deleted.`,
            signature: `deleteRows(where?: Partial<T> | ((row: TableRow<T>) => boolean) | null, batchNotify?: boolean): number`,
            parameters: [
                {
                    name: 'where',
                    optional: true,
                    type: `Partial<T> | ((row: TableRow<T>) => boolean`,
                    description: `an object to match rows based on equality of each property value, or a function that returns <span class="inline-code api-inline">true</span> if the row should be deleted and <span class="inline-code api-inline">false</span> if it should not be deleted. Any attached triggers (e.g., <span class="inline-code api-inline">onDelete</span>) will be fired for each row. By default, components with a matching <span class="inline-code api-inline">use()</span> hook will only be rerendered after all rows are deleted (batch). To override this behavior, pass <span class="inline-code api-inline">false</span> as the second argument, instructing Trigger to rerender components on each delete, which is the same behavior as manually calling <span class="inline-code api-inline">deleteRow()</span> multiple times. Components with a matching <span class="inline-code api-inline">useRow()</span> hook will be rerendered immediately if the row they are subscribed to is deleted. If <span class="inline-code api-inline">undefined</span> or <span class="inline-code api-inline">null</span>, all rows in the table will be deleted.`,
                },
                {
                    name: 'batchNotify',
                    optional: true,
                    type: `boolean`,
                    description: 'passing false will rerender components for each deleted row',
                },
            ],
            returns: '<span class="inline-code api-inline">true</span> if a row was deleted and <span class="inline-code api-inline">false</span> if a row was not deleted',
            examples: [
                `// delete all rows from the coolcats table
import { tables } from './store';
tables.coolcats.deleteRows();`,
                `// delete all rows from the cats table named "PJ" and are 7 years old
import { tables } from './store';
tables.cats.deleteRows({ name: "PJ", age: 7 });`,
                `// delete all rows from the cats table with an age greater than 7
import { tables } from './store';
tables.cats.deleteRows(cat => cat.age > 7);`,
            ],
        },
        {
            name: 'onBeforeDelete()',
            description: `A trigger function that can be attached to a table before a row is deleted.`,
            signature: `onBeforeDelete(fn: (row: TableRow<T>) => boolean | void): void`,
            parameters: [
                {
                    name: 'fn',
                    optional: false,
                    type: `(row: TableRow<T>) => boolean | void`,
                    description: `a function that receives the row being deleted. The user can cancel the deletion by returning <span class="inline-code api-inline">false</span>. Returning nothing or <span class="inline-code api-inline" style="font-size: 0.9em">true</span> will delete the row as originally intended.`,
                },
            ],
            returns: 'Nothing',
            examples: [
                `// prevent deletion of cats named "Cleo"
import { tables } from './store';
tables.cats.onBeforeDelete(cat => {
if (cat.name === "Cleo") {
    return false // prevent deletion
}
)};`,
            ],
        },
        {
            name: 'onAfterDelete()',
            description: `A trigger function that can be attached to a table after a row is deleted.`,
            signature: `onAfterDelete(fn: (row: TableRow<T>) => void): void`,
            parameters: [
                {
                    name: 'fn',
                    optional: false,
                    type: `(row: TableRow<T>) => void`,
                    description: `a function that receives the row that was just deleted. This can be useful when needing to perform additional actions (e.g., deleting a row from another table) based on the value of the deleted row.`,
                },
            ],
            returns: 'Nothing',
            examples: [
                `// the deleted row is used to delete a row from another table
import { tables } from './store';
tables.cats.onAfterDelete(cat => {
tables.coolCats.deleteRow({ name: cat.name });
});`,
            ],
        },
        {
            name: 'updateRow()',
            description: `Update an existing row in the specified table. The user needs to know the primary key (<em>_pk</em>) of the row to be updated.`,
            signature: `updateRow(_pk: number, setValue: Partial<T> | ((row: TableRow<T>) => Partial<T>)): TableRow<T> | undefined`,
            parameters: [
                {
                    name: '_pk',
                    optional: false,
                    type: `number`,
                    description: 'the autogenerated primary key (_pk) for the row you would like to update',
                },
                {
                    name: 'setValue',
                    optional: false,
                    type: `Partial<T> | ((row: TableRow<T>) => Partial<T>)`,
                    description: 'an object with values for each property to update, or a function that receives the row and returns an object with values for each property to update.',
                },
            ],
            returns: 'The updated row, or <em>undefined</em> if the update could not be performed',
            examples: [
                `// change the name of the cat with _pk entry of 10 to "Pickles"
import { tables } from './store';
const row = tables.cats.updateRow(10, { name: 'Pickles' });`,
                `// increment the age of the cat with _pk entry of 10
import { tables } from './store';
const row = tables.cats.updateRow(10, cat => ({ age: cat.age++ }));`,
            ],
        },
        {
            name: 'updateRows()',
            signature: `updateRows(setValue: Partial<T> | ((row: TableRow<T>) => Partial<T>), where?: Partial<T> | ((row: TableRow<T>) => boolean), batchNotify?: boolean): TableRow<T>[]`,
            description: `A function that will update all rows matching the object or function passed to the <span class="inline-code api-inline">where</span> parameter. If <span class="inline-code api-inline">where</span> is <span class="inline-code api-inline">undefined</span> or <span class="inline-code api-inline">null</span>, all rows in the table will be updated.`,
            parameters: [
                {
                    name: 'setValue',
                    optional: false,
                    type: `Partial<T> | ((row: TableRow<T>) => Partial<T>)`,
                    description: 'an object with values for each property to update, or a function that receives the row and returns an object with values for each property to update.',
                },
                {
                    name: 'where',
                    optional: true,
                    type: `Partial<T> | ((row: TableRow<T>) => boolean`,
                    description: `an object to match rows based on equality of each property value, or a function that returns <span class="inline-code api-inline">true</span> if the row should be updated and <span class="inline-code api-inline">false</span> if it should not be updated. Any attached triggers (e.g., <span class="inline-code api-inline">onDelete</span>) will be fired for each row. By default, components with a matching <span class="inline-code api-inline">use()</span> hook will only be rerendered after all rows are updated (batch). To override this behavior, pass <span class="inline-code api-inline">false</span> as the second argument, instructing Trigger to rerender components on each update, which is the same behavior as manually calling <span class="inline-code api-inline">updateRow()</span> multiple times. Components with a matching <span class="inline-code api-inline">useRow()</span> hook will be rerendered immediately if the row they are subscribed to is updated. If <span class="inline-code api-inline">undefined</span> or <span class="inline-code api-inline">null</span>, all rows in the table will be updated.`,
                },
                {
                    name: 'batchNotify',
                    optional: true,
                    type: `boolean`,
                    description: 'passing false will rerender components as each row is updated',
                },
            ],
            returns: 'An array of rows that were updated',
            examples: [
                `// update all cats to be named "PJ"
import { tables } from './store';
tables.cats.updateRows({ name: "PJ" });`,
                `// increment the age of all cats who are named "PJ" 
import { tables } from './store';
tables.cats.updateRows(cat => ({ age: cat.age++ }), { name: "PJ" });`,
                `// change the name of all cats named "PJ" and older than 7 to "Old PJ"; components will rerender as each row is updated
import { tables } from './store';
tables.cats.updateRows({ name: "Old PJ" }, cat => cat.age > 7 && cat.name == "PJ", false);`,
            ],
        },
        {
            name: 'onBeforeUpdate()',
            description: `A trigger function that can be attached to a table before a row is updated.`,
            signature: `onBeforeUpdate(fn: (currentValue: TableRow<T>, newValue: TableRow<T>) => TableRow<T> | void | boolean): void`,
            parameters: [
                {
                    name: 'fn',
                    optional: false,
                    type: `(currentValue: TableRow<T>, newValue: TableRow<T>) => TableRow<T> | void | boolean`,
                    description: `a function that receives the row's current value and the new value, allowing changes to be made to the value prior to updating. The user can cancel the update by returning <span class="inline-code api-inline">false</span>. Returning nothing or <span class="inline-code api-inline" style="font-size: 0.9em">true</span> will update the row as originally intended.`,
                },
            ],
            returns: 'Nothing',
            examples: [
                `// prevent updates to cats named "Cleo"
import { tables } from './store';
tables.cats.onBeforeUpdate(cat => {
if (cat.name === "Cleo") {
    return false // prevent updating
}
)};`,
            ],
        },
        {
            name: 'onAfterUpdate()',
            signature: `onAfterUpdate(fn: (previousValue: TableRow<T>, newValue: TableRow<T>) => void): void`,
            description: `A trigger function that can be attached to a table after a row is updated.`,
            parameters: [
                {
                    name: 'fn',
                    optional: false,
                    type: `(previousValue: TableRow<T>, newValue: TableRow<T>) => void`,
                    description: `a function that receives the row's previous value and the row's new value. This can be useful when needing to perform additional actions (e.g., comparing changes or updating a row from another table) based on the value of the updated row.`,
                },
            ],
            returns: 'Nothing',
            examples: [
                `// the updated row is used to update a row from another table
import { tables } from './store';
tables.cats.onAfterUpdate((previousValue, newValue) => {
if (newValue.age > previousValue.age) {
    tables.cats.updateRow(newValue._pk, { name: "Old Cat" });
}
});`,
            ],
        },
        {
            name: 'getColumnNames()',
            description: `Returns the column names for the specified table (including the <em>_pk</em> column)`,
            signature: `getColumnNames(): (keyof TableRow<T>)[]`,
            parameters: [],
            returns: 'An array of column names for the specified table, sorted in alphabetical order',
            examples: [
                `// get column names for the cats table
import { tables } from './store';
const columns = tables.cats.getColumnNames();`,
            ]
        },
        {
            name: 'print()',
            description: `Prints the specified table to the console to view its contents`,
            signature: `print(where?: Partial<T> | ((row: TableRow<T>) => boolean) | null, n?: number): void`,
            parameters: [
                {
                    name: 'where',
                    optional: true,
                    type: `Partial<T> | ((row: TableRow<T>) => boolean`,
                    description: `receives an object to match rows based on equality of each property value, or a function that returns <span class="inline-code api-inline">true</span> if the row should be printed and <span class="inline-code api-inline">false</span> if it should not be printed. If omitted, all rows will be returned from the table.`,
                },
                {
                    name: 'n',
                    optional: true,
                    type: `number`,
                    description: `the number of rows to be printed (defaults to 50). Passing -1 will print all rows based on browser limitations.`,
                },
            ],
            returns: 'Nothing',
            examples: [
                `// print the first 50 rows from the cats table to the console
import { tables } from './store';
tables.cats.print();`,
                `// print the first 100 rows from the cats table to the console
import { tables } from './store';
tables.cats.print(null, 100);`,
                `// print all rows from the cats table to the console where the age is greater than 7
import { tables } from './store';
tables.cats.print(cat => cat.age > 7, -1);`,
                `// print the first 50 rows from the cats table to the console where the name is "PJ"
import { tables } from './store';
tables.cats.print({ name: "PJ" });`,
            ]
        },
    ]
}

export default table;