import { div, button, textInput } from 'Util/create-element';
import { mProject } from '../model';

export default function newProjectForm({ container, eventAggregator }) {
    container.appendChild(form());

    function form() {
        const $form = document.createElement('form');
        $form.classList.add('new-project-form');

        const $input = textInput('project-form-input');
        $form.appendChild($input);

        const $button = button('Add', 'project-form-btn');
        $form.appendChild($button);

        setEvents();

        function setEvents() {
            $form.addEventListener('submit', () => {
                const project = mProject($input.value);
                eventAggregator.publish('projectAdded', project);
            });
        }

        return $form;
    }
}