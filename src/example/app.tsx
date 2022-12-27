import React, { useLayoutEffect } from 'react';
import { tables } from './store';
import { app, table } from './example.module.css';

// Will show how may active and completed items for each owner
function Owners() {
    const activeItems = tables.activeItems.use(null, ['rowDelete', 'rowInsert']);
    const completedItems = tables.completedItems.use(null, ['rowInsert']);
    const owners = tables.owners.use(null);

    return (
        <div className={table}>
            <div>Owners</div>
            {owners.map(o =>
                <div key={o._pk}>{o.firstName} {o.lastName}</div>
            )}
        </div>
    )
}

// Will show the active items
function ActiveItems() {
    const items = tables.activeItems.use(null);

    // handleAddItem adds a random item
    const handleAddItem = () => {


    }

    return (
        <div className={table}>
            <div>Active Items</div>
            {items.map(d =>
                <div key={d._pk}>{d.description}</div>    
            )}
            <button type="button" onClick={handleAddItem}>Add New Item</button>
        </div>
    )
}

// Will show the completed items
function CompletedItems() {
    const items = tables.completedItems.use(null);
    return (
        <div className={table}>
            <div>Completed Items</div>
            {items.map(d =>
                <div key={d._pk}>{d.description}</div>    
            )}
        </div>
    )
}

export default function App() {
    useLayoutEffect(() => {
        tables.owners.insertRows([
            {
                ownerID: 1,
                firstName: 'Owner',
                lastName: 'McTask',
            }
        ]);
    }, []);

    return (
        <div className={app}>
            <Owners />
            <ActiveItems />
            <CompletedItems />
        </div>
    )

}
