import { div, button, textInput } from 'Util/create-element';
import { mTask } from '../model';

export default function newTaskForm({ container, eventAggregator, project }) {
    container.appendChild(form());

    function form() {
        const $form = div();
        $form.classList.add('new-task-form');

        const $input = textInput('task-form-input');
        const $button = button('Add', 'project-form-btn');

        $form.appendChild($input);
        $form.appendChild($button);

        setEvents();

        function setEvents() {
            $button.addEventListener('click', () => {
                const task = mTask($input.value);
                console.log(`adding task (${task.getTitle()}) to project (${project.getName()})`);
                eventAggregator.publish('taskAdded', {task, project});
            });
        }

        return $form;
    }
}