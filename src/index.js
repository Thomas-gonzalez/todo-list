import { mProject } from "./model";
import newProjectForm from "./components/new-project-form";
import mEventAggregator from "./components/event-aggregator";
import emptyElement from "./util/empty-element";
import { div } from "./util/create-element";
import newTaskForm from "./components/new-task-form";
import { cacheDom, renderProjectList, renderTaskList } from "./view";

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
            renderProjectList(state);
        });
        state.eventAggregator.subscribe('projectSelected', (project) => {
            state.selectedProject = project;
            renderProjectList(state);
        });
        state.eventAggregator.subscribe('taskAdded', ({task, project}) => {
            project.addTask(task);
            renderTaskList(state);
        });
    }

    function addDefaultProject() {
        const project = mProject('My Project');
        state.eventAggregator.publish('projectAdded', project);
    }
}
