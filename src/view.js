import emptyElement from "./util/empty-element";
import { div } from "./util/create-element";

export function cacheDom() {
    const dom = {}

    dom.projectList = document.querySelector('.project-list');
    dom.taskList = document.querySelector('.task-list');
    dom.newProject = document.querySelector('.new-project');
    dom.newTask = document.querySelector('.new-task');

    dom.header = document.getElementById('header');

    return dom;
}

export function renderProjectList(state) {
    emptyElement(state.dom.projectList);
    for (const key in state.projects) {
        const project = state.projects[key];
        const $project = div(project.getName());
        $project.classList.add('project');

        if (project === state.selectedProject) {
            $project.classList.add('selected');
        }

        $project.addEventListener('click', () => {
            state.eventAggregator.publish('projectSelected', project);
        })

        state.dom.projectList.appendChild($project);
    }
    renderTaskList(state);
}

export function renderTaskList(state) {
    emptyElement(state.dom.taskList);
    const taskList = state.selectedProject.getTaskList();
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        const $task = div(task.getTitle());
        $task.classList.add('task');

        state.dom.taskList.appendChild($task);
    }
}