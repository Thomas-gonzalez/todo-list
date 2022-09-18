import { createProject, mProject } from "./model";
import newProjectForm from "./components/new-project-form";
import mEventAggregator from "./components/event-aggregator";
import emptyElement from "./util/empty-element";
import { div } from "./util/create-element";
import newTaskForm from "./components/new-task-form";

runApp();

function runApp() {
    const projects = {};
    const dom = cacheDom();
    const eventAggregator = mEventAggregator();

    let selectedProject = null;

    setDomEvents(dom);
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

    function setDomEvents(dom) {
        dom.newProject.addEventListener('click', () => {
            newProjectForm({ container: dom.projectList, eventAggregator: eventAggregator });
            document.getElementById('project-form-input').focus();
        });
        dom.header.addEventListener('click', () => { //log stuff DELETE
            console.log(`selected project: ${selectedProject.getName()}`);
        })
        dom.newTask.addEventListener('click', () => {
            newTaskForm({ 
                container: dom.taskList,
                eventAggregator: eventAggregator,
                project: selectedProject,
            });
        })
    }

    function setAggregatorEvents(dom) {
        eventAggregator.subscribe('projectAdded', (project) => {
            projects[project.getName()] = project;
            selectedProject = project;
            renderProjectList();
        });
        eventAggregator.subscribe('projectSelected', (project) => {
            selectedProject = project;
            renderProjectList();
        });
        eventAggregator.subscribe('taskAdded', ({task, project}) => {
            project.addTask(task);
            renderTaskList();
        });
    }

    function renderProjectList() {
        emptyElement(dom.projectList);
        for (const key in projects) {
            const project = projects[key];
            const $project = div(project.getName());
            $project.classList.add('project');

            if (project === selectedProject) {
                $project.classList.add('selected');
            }

            $project.addEventListener('click', () => {
                eventAggregator.publish('projectSelected', project);
            })

            dom.projectList.appendChild($project);
        }
        renderTaskList();
    }

    function renderTaskList() {
        emptyElement(dom.taskList);
        const taskList = selectedProject.getTaskList();
        for (let i = 0; i < taskList.length; i++) {
            const task = taskList[i];
            const $task = div(task.getTitle());
            $task.classList.add('task');

            dom.taskList.appendChild($task);
        }
    }

    function addDefaultProject() {
        const project = mProject('My Project');
        eventAggregator.publish('projectAdded', project);
    }
}
