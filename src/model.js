export function makeTask(title, description, dueDate, priority) {
    return {
        getTitle: () => title,
        getDescription: () => description,
        getDueDate: () => dueDate,
        getPriority: () => priority,        
    }
}

export function makeProjectList(name) {
    const taskList = [];
    return {
        getName: () => name,
        getTaskList: () => {
            let list = [];
            taskList.forEach(task => list.push(task));
            return list;
        },
        addTask: (task) => taskList.push(task),
    }
}