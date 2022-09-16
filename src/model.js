export function mTask(title, description, dueDate, priority, isComplete=false) {
    return {
        getTitle: () => title,
        getDescription: () => description,
        getDueDate: () => dueDate,
        getPriority: () => priority,
        getIsComplete: () => isComplete,
        markComplete: () => {
            isComplete = true;
        },
    }
}

export function mProject(name) {
    const taskList = [];
    return {
        getName: () => name,
        getTaskList: () => {
            let list = [];
            taskList.forEach(task => list.push(task));
            return list;
        },
        addTask: (task) => {
            taskList.push(task);
        },
    }
}