export function div(text=null) {
    const $div = document.createElement('div');
    if (text) $div.textContent = text;
    return $div;
}

export function button(text='button text', id='') {
    const $button = document.createElement('button');
    $button.textContent = text;
    $button.id = id;
    return $button;
}

export function textInput(id) {
    const $input = document.createElement('input');
    $input.type = 'text';
    $input.id = id;
    return $input;
}
