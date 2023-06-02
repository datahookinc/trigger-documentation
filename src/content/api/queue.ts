import { type Section } from './types';

const queue: Section = {
    name: 'Queue',
    description: `Queues are a managed data structure, similar to an array, that allow you to insert and retrieve items. Queues <strong>will not</strong> cause your components to re-render. Think of them as a safe way to
    interact with a queue across your components.`,
    api: [
        {
            name: 'insert()',
            description: `Insert a new item into the queue.`,
            signature: `insert(item: T, cb?: (ok: boolean) => void): boolean`,
            parameters: [
                {
                    name: 'item',
                    optional: false,
                    type: `T`,
                    description: 'a new item to insert into the queue',
                },
                {
                    name: 'cb',
                    optional: true,
                    type: `(ok: boolean) => void`,
                    description: 'a callback function that will receive the status of the insert operation, allowing for further operations as needed',
                }
            ],
            returns: '<span class="inline-code api-inline">true</span> if the insert was successful and <span class="inline-code api-inline">false</span> if not',
            examples: [
                `// insert a new item into the queue
import { queues } from './store';
queues.events.insert({ eventname: 'save' });`,
            ],
        },
        {
            name: 'onInsert()',
            description: `A trigger function that can be attached to a queue for each time an item is inserted.`,
            signature: `onInsert(fn: (newItem: T) => void): void`,
            parameters: [
                {
                    name: 'fn',
                    optional: false,
                    type: `(newItem: T) => void): void`,
                    description: 'a function that receives the new item inserted into the queue',
                },
            ],
            returns: 'Nothing',
            examples: [
                `// each time an item is added to the queue add an entry to an events table
import { queues, tables } from './store';
queues.events.onInsert(newItem => {
    tables.events.insertRow({ timestamp: Date.now(), event: 'queue insert', value: newItem });
});`,
            ],
        },
        {
            name: 'get()',
            description: `Will retrieve the item at the head of the queue.`,
            signature: `get(): QueueItem<T> | undefined`,
            parameters: [],
            returns: 'The item at the head of the queue, or <span class="inline-code api-inline">undefined</span> if the queue is currently empty.',
            examples: [
                `// get the item at the head of the queue
import { queues } from './store';
const item = queues.events.get();`,
            ],
        },
        {
            name: 'onGet()',
            description: `A trigger function that can be attached to a queue each time an item is retrieved.`,
            signature: `onGet(fn: (item: T) => void): void`,
            parameters: [
                {
                    name: 'fn',
                    optional: false,
                    type: `(item: T) => void`,
                    description: 'a function that receives the item each time <span class="inline-code api-inline">get()</span> is called',
                }
            ],
            returns: 'Nothing',
            examples: [
                `// each time get() is called, log the value and time
import { queues } from './store';
queues.events.onGet(item => {
    console.log(value, Date.now());
});`,
            ],
        },
        {
            name: 'size()',
            description: `Will return the number of items currently in the queue.`,
            signature: `size(): number`,
            parameters: [],
            returns: 'The number of items currently in the queue',
            examples: [
                `// get the number of items currently in the queue
import { queues } from './store';
const n = queues.events.size();`,
            ],
        },
    ],
};



export default queue;