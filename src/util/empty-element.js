export default function emptyElement(element) {
    if (!element) return;
    console.log(`type of element: ${typeof element}`);
    element.innerHTML = '';
}