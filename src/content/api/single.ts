import { type Section } from './types';

const single: Section = {
    name: 'Single',
    description: `Singles are single variables that Trigger will manage on your behalf. A single could be a simple value, like a number, or a complex nested object. Singles help bridge the gap between 
    storing your data in a data-oriented manner and the customary approach of storing your state in nested objects. Quite often, <span class="inline-code">Singles</span> are used to provide UI state, while <span class="inline-code">Tables</span> are used
    to provide data state.`,
    api: [
        {
            name: 'use()',
            description: `Retrieves the value from the specified single and rerenders your component. Every time the underlying object changes, the new value will be returned and your component will be rerendered.`,
            signature: `use(): T`,
            parameters: [],
            returns: 'The object stored in the variable',
            examples: [
                `// returns the value in the specified single and rerenders the component
import { singles } from './store';
const isLoading = singles.isLoading.use();`,
            ],
        },
        {
            name: 'get()',
            description: `Will retrieve the current value, but not cause your component to rerender.`,
            signature: `get(): T`,
            parameters: [],
            returns: 'The current value of the single',
            examples: [
                `// get the value in the specified single
import { singles } from './store';
const isLoading = singles.isLoading.get();`,
            ],
        },
        {
            name: 'set()',
            description: `Sets the value for the single. Trigger uses strict reference comparisons (===) to determine if the underlying value has changed. So, if your underlying value is an object (like an array) you should call <span class="inline-code api-inline">set()</span> with a new reference to the array (e.g., <span class="inline-code api-inline">set([...oldArr, newValue]))</span>. Will rerender all components that are subscribed to <span class="inline-code api-inline>use()</span>.`,
            signature: `set(newValue: T): T`,
            parameters: [
                {
                    name: 'newValue',
                    optional: false,
                    type: `T`,
                    description: 'accepts a new value of the same type',
                }
            ],
            returns: 'The new value of the single',
            examples: [
                `// set the value in the specified single
import { singles } from './store';
singles.isLoading.set(false);`,
            ],
        },
        {
            name: 'setFn()',
            description: `Similar to <span class="inline-code api-inline">set()</span>, but allows the user to pass a function that receives the current value. This is the preferred method when setting a value that is dependent on a previous value (e.g., incrementing a counter).`,
            signature: `setFn(fn: (currentValue: T) => T): T`,
            parameters: [
                {
                    name: 'fn',
                    optional: false,
                    type: `(currentValue: T) => T): T`,
                    description: 'a function that receives the current value and returns a value of the same type',
                }
            ],
            returns: 'The new value of the single',
            examples: [
                `// increment the a single based on its previous value
import { singles } from './store';
singles.isLoading.setFn(currentValue => currentValue + 1);`,
            ],
        },
        {
            name: 'onSet()',
            description: `A trigger function that can be attached to a single for each time the value is changed.`,
            signature: `onSet(fn: (newValue: T) => void): void`,
            parameters: [
                {
                    name: 'fn',
                    optional: false,
                    type: `(newValue: T) => void`,
                    description: 'a function that receives the new value of the single each time <span class="inline-code api-inline">set()</span> or <span class="inline-code api-inline">setFn()</span> is called',
                }
            ],
            returns: 'Nothing',
            examples: [
                `// each time the single changes add an entry to an events table
import { singles, tables } from './store';
singles.isLoading.onSet(newValue => {
    tables.events.insertRow({ timestamp: Date.now(), event: 'set single', value: newValue });
});`,
            ],
        },
        {
            name: 'onGet()',
            description: `A trigger function that can be attached to a single each time the value is retrieved.`,
            signature: `onGet(fn: (value: T) => void): void`,
            parameters: [
                {
                    name: 'fn',
                    optional: false,
                    type: `(value: T) => void`,
                    description: 'a function that receives the value of the single each time <span class="inline-code api-inline">get()</span> is called',
                }
            ],
            returns: 'Nothing',
            examples: [
                `// each time get() is called, log the value and time
import { singles } from './store';
singles.isLoading.onGet(value => {
    console.log(value, Date.now());
});`,
            ],
        },
    ]
}

export default single;