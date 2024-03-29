import React, { useLayoutEffect } from 'react';
import { tables, singles } from './store';
import { app, icon, table, tableHeader, tableBody, tableContainer } from './example.module.css';
import Cancel from '@mui/icons-material/CancelRounded';
import CheckCircle from '@mui/icons-material/CheckCircle';

// Will show how may active and completed tasks for each owner
function TaskOwners() {
    const activeTasks = tables.activeTasks.use(null, ['onDelete', 'onInsert']);
    const completedTasks = tables.completedTasks.use(null, ['onDelete', 'onInsert']);
    const owners = tables.taskOwners.use();

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
                            <tr key={o._id}>
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
    const tasks = tables.activeTasks.use();

    const handleCompleteTask = (_id: number) => {
        const task = tables.activeTasks.findById(_id);
        if (task) {
            tables.activeTasks.deleteById(_id);
            tables.completedTasks.insertOne({ ownerID: task.ownerID, description: task.description });
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
                            <tr key={t._id}>
                                <td>{tables.taskOwners.findOne({ ownerID: t.ownerID})!.firstName} {tables.taskOwners.findOne({ ownerID: t.ownerID})!.lastName}</td>
                                <td>{t.description}</td>
                                <td className={icon} title="Click to complete task" onClick={() => handleCompleteTask(t._id)}><CheckCircle color="success" fontSize="large"/></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// Will show the completed tasks
function CompletedTasks() {
    const tasks = tables.completedTasks.use();

    const handleActivateTask = (_id: number) => {
        const task = tables.completedTasks.findById(_id);
        if (task) {
            tables.completedTasks.deleteById(_id);
            tables.activeTasks.insertOne({ ownerID: task.ownerID, description: task.description });
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
                        <tr key={t._id}>
                            <td>{tables.taskOwners.findOne({ ownerID: t.ownerID})!.firstName} {tables.taskOwners.findOne({ ownerID: t.ownerID})!.lastName}</td>
                            <td>{t.description}</td>
                            <td className={icon} title="Click to activate task" onClick={() => handleActivateTask(t._id)}><Cancel color="error" fontSize="large"/></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default function App() {
    const initialLoad = singles.initialLoad.get();
    useLayoutEffect(() => {
        if (initialLoad) {
            singles.initialLoad.set(false);
            // Seed our owners
            tables.taskOwners.insertMany([
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
    
            // Create our active tasks
            tables.activeTasks.insertMany([
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
        }
    }, []);

    return (
        <div className={app}>
            <TaskOwners />
            <ActiveTasks />
            <CompletedTasks />
        </div>
    )
}
