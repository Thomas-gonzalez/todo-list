import { createProject, mProject } from "./model";
import newProjectForm from "./components/new-project-form";
import mEventAggregator from "./components/event-aggregator";
import emptyElement from "./util/empty-element";
import { div } from "./util/create-element";
import newTaskForm from "./components/new-task-form";

runApp();

function runApp() {

    const state = mState();
    
    function mState() {
        return {
            projects: {},
            dom: cacheDom(),
            eventAggregator: mEventAggregator(),
            selectedProject: null,
        }
    }

    setDomEvents();
    setAggregatorEvents();
    addDefaultProject();

    function cacheDom() {
        const dom = {}
    
        dom.projectList = document.querySelector('.project-list');
        dom.taskList = document.querySelector('.task-list');
        dom.newProject = document.querySelector('.new-project');
        dom.newTask = document.querySelector('.new-task');

        dom.header = document.getElementById('header');
    
        return dom;
    }

    function setDomEvents() {
        state.dom.newProject.addEventListener('click', () => {
            newProjectForm({ container: state.dom.projectList, eventAggregator: state.eventAggregator });
            document.getElementById('project-form-input').focus();
        });
        state.dom.header.addEventListener('click', () => { //log stuff DELETE
            console.log(`selected project: ${state.selectedProject.getName()}`);
        })
        state.dom.newTask.addEventListener('click', () => {
            newTaskForm({ 
                container: state.dom.taskList,
                eventAggregator: state.eventAggregator,
                project: state.selectedProject,
            });
        })
    }

    function setAggregatorEvents() {
        state.eventAggregator.subscribe('projectAdded', (project) => {
            state.projects[project.getName()] = project;
            state.selectedProject = project;
            renderProjectList();
        });
        state.eventAggregator.subscribe('projectSelected', (project) => {
            state.selectedProject = project;
            renderProjectList();
        });
        state.eventAggregator.subscribe('taskAdded', ({task, project}) => {
            project.addTask(task);
            renderTaskList();
        });
    }

    function renderProjectList() {
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
        renderTaskList();
    }

    function renderTaskList() {
        emptyElement(state.dom.taskList);
        const taskList = state.selectedProject.getTaskList();
        for (let i = 0; i < taskList.length; i++) {
            const task = taskList[i];
            const $task = div(task.getTitle());
            $task.classList.add('task');

            state.dom.taskList.appendChild($task);
        }
    }

    function addDefaultProject() {
        const project = mProject('My Project');
        state.eventAggregator.publish('projectAdded', project);
    }
}
