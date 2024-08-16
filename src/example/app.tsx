import React, { useLayoutEffect } from "react";
import { store, type Task, type TableRow } from "./store";
import {
    app,
    icon,
    table,
    tableHeader,
    tableBody,
    tableContainer,
} from "./example.module.css";
import Cancel from "@mui/icons-material/CancelRounded";
import CheckCircle from "@mui/icons-material/CheckCircle";

// Will show how may active and completed tasks for each owner
function TaskOwners() {
    const activeTasks = store.activeTasks.use(null, ["onDelete", "onInsert"]);
    const completedTasks = store.completedTasks.use(null, [
        "onDelete",
        "onInsert",
    ]);
    const owners = store.taskOwners.use();

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
                        {owners.map((o) => (
                            <tr key={o._id}>
                                <td>
                                    {o.firstName} {o.lastName}
                                </td>
                                <td>
                                    {activeTasks.filter((d) => d.ownerId === o.ownerId).length}
                                </td>
                                <td>
                                    {completedTasks.filter((d) => d.ownerId === o.ownerId).length}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

type Props = {
    tasks: TableRow<Task>[];
    tooltip: string;
    title: string;
    iconColour: "success" | "error";
    handleToggleTask(n: number): void;
};

function TaskTable({
    tasks,
    tooltip,
    iconColour,
    title,
    handleToggleTask,
}: Props) {
    return (
        <div className={table}>
            <div className={tableHeader}>{title}</div>
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
                        {tasks.map((t) => (
                            <tr key={t._id}>
                                <td>
                                    {store.taskOwners.findOne({ ownerId: t.ownerId })!.firstName}{" "}
                                    {store.taskOwners.findOne({ ownerId: t.ownerId })!.lastName}
                                </td>
                                <td>{t.description}</td>
                                <td
                                    className={icon}
                                    title={tooltip}
                                    onClick={() => handleToggleTask(t._id)}
                                >
                                    {iconColour === "success" ? (
                                        <CheckCircle color={iconColour} fontSize="large" />
                                    ) : (
                                        <Cancel color={iconColour} fontSize="large" />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Will show the active tasks
function ActiveTasks() {
    const tasks = store.activeTasks.use();

    const handleCompleteTask = (_id: number) => {
        const task = store.activeTasks.findById(_id);
        if (task) {
            store.activeTasks.deleteById(_id);
            store.completedTasks.insertOne({
                ownerId: task.ownerId,
                description: task.description,
            });
        }
    };
    return (
        <TaskTable
            tasks={tasks}
            tooltip="Click to complete task"
            iconColour="success"
            title="Active Tasks"
            handleToggleTask={handleCompleteTask}
        />
    );
}

// Will show the completed tasks
function CompletedTasks() {
    const tasks = store.completedTasks.use();

    const handleActivateTask = (_id: number) => {
        const task = store.completedTasks.findById(_id);
        if (task) {
            store.completedTasks.deleteById(_id);
            store.activeTasks.insertOne({
                ownerId: task.ownerId,
                description: task.description,
            });
        }
    };
    return (
        <TaskTable
            tasks={tasks}
            tooltip="Click to activate task"
            iconColour="error"
            title="Completed Tasks"
            handleToggleTask={handleActivateTask}
        />
    );
}

export default function App() {
    const initialLoad = store.initialLoad.get();
    useLayoutEffect(() => {
        if (initialLoad) {
            store.initialLoad.set(false);
            store.activeTasks.insertMany([
                {
                    ownerId: 1,
                    description: "Invent Internet Explorer",
                },
                {
                    ownerId: 2,
                    description: "Invent iPhone",
                },
                {
                    ownerId: 3,
                    description: "Invent programming",
                },
                {
                    ownerId: 4,
                    description: "Invent intelligent machines",
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
    );
}
