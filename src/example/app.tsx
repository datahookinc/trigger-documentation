import React, { useLayoutEffect } from 'react';
import { tables } from './store';
import { app, icon, table, tableHeader, tableBody, tableContainer } from './example.module.css';
import Cancel from '@mui/icons-material/CancelRounded';
import CheckCircle from '@mui/icons-material/CheckCircle';

// Will show how may active and completed items for each owner
function TaskOwners() {
    const activeTasks = tables.activeTasks.use(null, ['rowDelete', 'rowInsert']);
    const completedTasks = tables.completedTasks.use(null, ['rowDelete', 'rowInsert']);
    const owners = tables.taskOwners.use(null);

    return (
        <div className={table}>
            <div className={tableHeader}>Owners</div>
            <div className={tableContainer}>
                <table className={tableBody}>
                    <thead>
                        <tr>
                            <th>Owner Name</th>
                            <th># Active Tasks</th>
                            <th># Completed Tasks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {owners.map(o =>
                            <tr key={o._pk}>
                                <td>{o.firstName} {o.lastName}</td>
                                <td>{activeTasks.filter(d => d.ownerID === o.ownerID).length}</td>
                                <td>{completedTasks.filter(d => d.ownerID === o.ownerID).length}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// Will show the active tasks
function ActiveTasks() {
    const tasks = tables.activeTasks.use(null);

    const handleCompleteTask = (pk: number) => {
        const task = tables.activeTasks.getRow(pk);
        if (task) {
            tables.activeTasks.deleteRow(pk);
            tables.completedTasks.insertRow({ ownerID: task.ownerID, description: task.description });
        }
    }

    return (
        <div className={table}>
            <div className={tableHeader}>Active Tasks</div>
            <div className={tableContainer}>
                <table className={tableBody}>
                    <thead>
                        <tr>
                            <th>Owner Name</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(t =>
                            <tr key={t._pk}>
                                <td>{tables.taskOwners.getRow({ ownerID: t.ownerID})!.firstName} {tables.taskOwners.getRow({ ownerID: t.ownerID})!.lastName}</td>
                                <td>{t.description}</td>
                                <td className={icon} title="Click to complete task" onClick={() => handleCompleteTask(t._pk)}><CheckCircle color="success" fontSize="large"/></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// Will show the completed items
function CompletedTasks() {
    const tasks = tables.completedTasks.use(null);

    const handleActivateTask = (pk: number) => {
        const task = tables.completedTasks.getRow(pk);
        if (task) {
            tables.completedTasks.deleteRow(pk);
            tables.activeTasks.insertRow({ ownerID: task.ownerID, description: task.description });
        }
    }

    return (
        <div className={table}>
        <div className={tableHeader}>Completed Tasks</div>
        <div className={tableContainer}>
            <table className={tableBody}>
                <thead>
                    <tr>
                        <th>Owner Name</th>
                        <th>Item Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(t =>
                        <tr key={t._pk}>
                            <td>{tables.taskOwners.getRow({ ownerID: t.ownerID})!.firstName} {tables.taskOwners.getRow({ ownerID: t.ownerID})!.lastName}</td>
                            <td>{t.description}</td>
                            <td className={icon} title="Click to activate task" onClick={() => handleActivateTask(t._pk)}><Cancel color="error" fontSize="large"/></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default function App() {
    useLayoutEffect(() => {
        // Seed our owners
        tables.taskOwners.insertRows([
            {
                ownerID: 1,
                firstName: 'Bill',
                lastName: 'Gates',
            },
            {
                ownerID: 2,
                firstName: 'Steve',
                lastName: 'Jobs',
            },
            {
                ownerID: 3,
                firstName: 'Ada',
                lastName: 'Lovelace',
            },
            {
                ownerID: 4,
                firstName: 'Alan',
                lastName: 'Turing',
            },
        ]);

        // Create our active items
        tables.activeTasks.insertRows([
            {
                ownerID: 1,
                description: 'Invent Internet Explorer',
            },
            {
                ownerID: 2,
                description: 'Invent iPhone',
            },
            {
                ownerID: 3,
                description: 'Invent programming',
            },
            {
                ownerID: 4,
                description: 'Invent intelligent machines',
            },
        ]);
    }, []);

    return (
        <div className={app}>
            <TaskOwners />
            <ActiveTasks />
            <CompletedTasks />
        </div>
    )
}
