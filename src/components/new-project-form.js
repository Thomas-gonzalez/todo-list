import { div, button, textInput } from 'Util/create-element';
import { mProject } from '../model';

export default function newProjectForm({ container, eventAggregator }) {
    container.appendChild(form());

    function form() {
        const $form = div();
        $form.classList.add('new-project-form');

        const $input = textInput('project-form-input');
        const $button = button('Add', 'project-form-btn');

        $form.appendChild($input);
        $form.appendChild($button);

        setEvents();

        function setEvents() {
            $button.addEventListener('click', () => {
                const project = mProject($input.value);
                eventAggregator.publish('projectAdded', project);
            });
        }

        return $form;
    }
}