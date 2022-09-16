/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/event-aggregator.js":
/*!********************************************!*\
  !*** ./src/components/event-aggregator.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ mEventAggregator)\n/* harmony export */ });\nfunction mEvent(name) {\n    const handlers = []; //array of functions\n    return {\n        getName: () => name,\n        addHandler: (handler) => {\n            handlers.push(handler);\n        },\n        removeHandler: (handler) => {\n            for (let i = 0; i < handlers.length; i++) {\n                if (handlers[i] == handler) {\n                    handlers.splice(i,1);\n                    break;\n                }\n            }\n        },\n        fire: (eventArgs) => {\n            handlers.forEach(handler => {\n                console.log(`firing handler for event ${name}! with arguments ${eventArgs}`);\n                handler(eventArgs);\n            })\n        },\n        listHandlers: () => {\n            console.log(`handlers for event ${name}:`);\n            handlers.forEach(handler => {\n                console.log(handler);\n            })\n        },\n    }\n}\n\nfunction mEventAggregator() {\n    const events = [];\n\n    function getEvent(eventName) {\n        for (let i = 0; i < events.length; i++) {\n            if (events[i].getName() === eventName) return events[i];\n        }\n    }\n\n    return {\n        publish: (eventName, eventArgs) => {\n            console.log(`publishing ${eventName} with args ${eventArgs}`);\n            let event = getEvent(eventName);\n            if (!event) {\n                event = mEvent(eventName);\n                events.push(event);\n            }\n\n            event.fire(eventArgs);\n            event.listHandlers();\n        },\n        subscribe: (eventName, handler) => {\n            console.log(`subscribing to ${eventName} with handler ${handler}`);\n            let event = getEvent(eventName);\n            if(!event) {\n                event = mEvent(eventName);\n                events.push(event);\n            }\n\n            event.addHandler(handler);\n            event.listHandlers();\n        },\n        logEvents: () => {\n            console.log(`logging events`);\n            events.forEach((event) => {\n                console.log(`event ${event.getName()}`);\n                console.log('handlers...');\n                event.listHandlers();\n            })\n        }\n    }\n}\n\n//# sourceURL=webpack://todo-list/./src/components/event-aggregator.js?");

/***/ }),

/***/ "./src/components/new-project-form.js":
/*!********************************************!*\
  !*** ./src/components/new-project-form.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ newProjectForm)\n/* harmony export */ });\n/* harmony import */ var Util_create_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Util/create-element */ \"./src/util/create-element.js\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model */ \"./src/model.js\");\n\n\n\nfunction newProjectForm({ container, eventAggregator }) {\n    container.appendChild(form());\n\n    function form() {\n        const $form = (0,Util_create_element__WEBPACK_IMPORTED_MODULE_0__.div)();\n        $form.classList.add('new-project-form');\n\n        const $input = (0,Util_create_element__WEBPACK_IMPORTED_MODULE_0__.textInput)('project-form-input');\n        const $button = (0,Util_create_element__WEBPACK_IMPORTED_MODULE_0__.button)('Add', 'project-form-btn');\n\n        $form.appendChild($input);\n        $form.appendChild($button);\n\n        setEvents();\n\n        function setEvents() {\n            $button.addEventListener('click', () => {\n                const project = (0,_model__WEBPACK_IMPORTED_MODULE_1__.mProject)($input.value);\n                eventAggregator.publish('projectAdded', project);\n            });\n        }\n\n        return $form;\n    }\n}\n\n//# sourceURL=webpack://todo-list/./src/components/new-project-form.js?");

/***/ }),

/***/ "./src/components/new-task-form.js":
/*!*****************************************!*\
  !*** ./src/components/new-task-form.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ newTaskForm)\n/* harmony export */ });\n/* harmony import */ var Util_create_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Util/create-element */ \"./src/util/create-element.js\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model */ \"./src/model.js\");\n\n\n\nfunction newTaskForm({ container, eventAggregator, project }) {\n    container.appendChild(form());\n\n    function form() {\n        const $form = (0,Util_create_element__WEBPACK_IMPORTED_MODULE_0__.div)();\n        $form.classList.add('new-task-form');\n\n        const $input = (0,Util_create_element__WEBPACK_IMPORTED_MODULE_0__.textInput)('task-form-input');\n        const $button = (0,Util_create_element__WEBPACK_IMPORTED_MODULE_0__.button)('Add', 'project-form-btn');\n\n        $form.appendChild($input);\n        $form.appendChild($button);\n\n        setEvents();\n\n        function setEvents() {\n            $button.addEventListener('click', () => {\n                const task = (0,_model__WEBPACK_IMPORTED_MODULE_1__.mTask)($input.value);\n                console.log(`adding task (${task.getTitle()}) to project (${project.getName()})`);\n                eventAggregator.publish('taskAdded', {task, project});\n            });\n        }\n\n        return $form;\n    }\n}\n\n//# sourceURL=webpack://todo-list/./src/components/new-task-form.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ \"./src/model.js\");\n/* harmony import */ var _components_new_project_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/new-project-form */ \"./src/components/new-project-form.js\");\n/* harmony import */ var _components_event_aggregator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/event-aggregator */ \"./src/components/event-aggregator.js\");\n/* harmony import */ var _util_empty_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/empty-element */ \"./src/util/empty-element.js\");\n/* harmony import */ var _util_create_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/create-element */ \"./src/util/create-element.js\");\n/* harmony import */ var _components_new_task_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/new-task-form */ \"./src/components/new-task-form.js\");\n\n\n\n\n\n\n\nrunApp();\n\nfunction runApp() {\n    const projects = {};\n    const dom = cacheDom();\n    const eventAggregator = (0,_components_event_aggregator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n\n    let selectedProject = null;\n\n    setEvents(dom);\n\n    function cacheDom() {\n        const dom = {}\n    \n        dom.projectList = document.querySelector('.project-list');\n        dom.taskList = document.querySelector('.task-list');\n        dom.newProject = document.querySelector('.new-project');\n        dom.newTask = document.querySelector('.new-task');\n\n        dom.header = document.getElementById('header');\n    \n        return dom;\n    }\n\n    function setEvents(dom) {\n        dom.newProject.addEventListener('click', () => {\n            (0,_components_new_project_form__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ container: dom.projectList, eventAggregator: eventAggregator });\n        });\n\n        eventAggregator.subscribe('projectAdded', (project) => {\n            projects[project.getName()] = project;\n            renderProjectList();\n        });\n\n        dom.header.addEventListener('click', () => { //log stuff DELETE\n            console.log(`selected project: ${selectedProject.getName()}`);\n        })\n\n        dom.newTask.addEventListener('click', () => {\n            ;(0,_components_new_task_form__WEBPACK_IMPORTED_MODULE_5__[\"default\"])({ \n                container: dom.taskList,\n                eventAggregator: eventAggregator,\n                project: selectedProject,\n            });\n        })\n\n        eventAggregator.subscribe('taskAdded', ({task, project}) => {\n            project.addTask(task);\n            renderTaskList();\n        })\n    }\n\n    function renderProjectList() {\n        (0,_util_empty_element__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(dom.projectList);\n        for (const key in projects) {\n            const project = projects[key];\n            const $project = (0,_util_create_element__WEBPACK_IMPORTED_MODULE_4__.div)(project.getName());\n            $project.classList.add('project');\n\n            if (project === selectedProject) {\n                $project.classList.add('selected');\n            }\n\n            $project.addEventListener('click', () => {\n                selectedProject = project;\n                const $list = dom.projectList.children;\n                for (let i = 0; i<$list.length; i++) {\n                    $list[i].classList.remove('selected');\n                }\n                $project.classList.add('selected');\n                renderTaskList();\n            })\n\n            dom.projectList.appendChild($project);\n        }\n    }\n\n    function renderTaskList() {\n        (0,_util_empty_element__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(dom.taskList);\n        const taskList = selectedProject.getTaskList();\n        for (let i = 0; i < taskList.length; i++) {\n            const task = taskList[i];\n            const $task = (0,_util_create_element__WEBPACK_IMPORTED_MODULE_4__.div)(task.getTitle());\n            $task.classList.add('task');\n\n            dom.taskList.appendChild($task);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mProject\": () => (/* binding */ mProject),\n/* harmony export */   \"mTask\": () => (/* binding */ mTask)\n/* harmony export */ });\nfunction mTask(title, description, dueDate, priority, isComplete=false) {\n    return {\n        getTitle: () => title,\n        getDescription: () => description,\n        getDueDate: () => dueDate,\n        getPriority: () => priority,\n        getIsComplete: () => isComplete,\n        markComplete: () => {\n            isComplete = true;\n        },\n    }\n}\n\nfunction mProject(name) {\n    const taskList = [];\n    return {\n        getName: () => name,\n        getTaskList: () => {\n            let list = [];\n            taskList.forEach(task => list.push(task));\n            return list;\n        },\n        addTask: (task) => {\n            taskList.push(task);\n        },\n    }\n}\n\n//# sourceURL=webpack://todo-list/./src/model.js?");

/***/ }),

/***/ "./src/util/create-element.js":
/*!************************************!*\
  !*** ./src/util/create-element.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"button\": () => (/* binding */ button),\n/* harmony export */   \"div\": () => (/* binding */ div),\n/* harmony export */   \"textInput\": () => (/* binding */ textInput)\n/* harmony export */ });\nfunction div(text=null) {\n    const $div = document.createElement('div');\n    if (text) $div.textContent = text;\n    return $div;\n}\n\nfunction button(text='button text', id='') {\n    const $button = document.createElement('button');\n    $button.textContent = text;\n    $button.id = id;\n    return $button;\n}\n\nfunction textInput(id) {\n    const $input = document.createElement('input');\n    $input.type = 'text';\n    $input.id = id;\n    return $input;\n}\n\n\n//# sourceURL=webpack://todo-list/./src/util/create-element.js?");

/***/ }),

/***/ "./src/util/empty-element.js":
/*!***********************************!*\
  !*** ./src/util/empty-element.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ emptyElement)\n/* harmony export */ });\nfunction emptyElement(element) {\n    if (!element) return;\n    element.innerHTML = '';\n}\n\n//# sourceURL=webpack://todo-list/./src/util/empty-element.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;