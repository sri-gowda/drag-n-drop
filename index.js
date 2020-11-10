function CustomDragAndDrop(){
    this.draggables = undefined;
    this.containers = undefined;
    this.placeholder = undefined;
    this.elementToInsert = undefined;
    this.afterElement = undefined;
    this.sectionCount = 0;
    this.mainContainer = undefined;
    this.existingElement = undefined;

    this.addSection = function(){
        let container = document.createElement('div');
            container.classList.add('container');
        let section = document.createElement('h1');
            section.innerHTML = `Section ${this.sectionCount++}`;
            container.appendChild(section);
            console.log("this main container",this.mainContainer);
        this.mainContainer.appendChild(container);
        this.addEventListenersForContainer(container);
        this.updateContainers();
    }
    this.updateContainers = function(){
        this.containers = document.querySelectorAll('.container');
    }
    this.updateDraggables = function(){
        this.draggables = document.querySelectorAll('.draggable');
    }
    this.addEventListeners = function(name){
        console.log("adding event listeners",this.containers,this.draggables);
        if(name === 'containers' && this.containers){
            this.containers.forEach(container => {
                container.addEventListener('dragover',e => this.onDragHover(e,container,false));
                container.addEventListener('drop',e => this.onDragDrop(e),false);
                container.addEventListener('dragleave',e => this.onDragLeave(e),false);
                container.addEventListener('dragenter',e => this.onDragEnter(e),false);
            });
        }else if('draggables' && this.draggables){
            this.draggables.forEach(draggable => {
                draggable.addEventListener('dragstart',e => this.onDragStart(e,draggable),false);
                draggable.addEventListener('dragend', e => this.onDragEnd(e,draggable),false);
            });
        }else if(this.draggables && this.containers){
            this.containers.forEach(container => {
                container.addEventListener('dragover',e => this.onDragHover(e,container),false);
                container.addEventListener('drop', e => this.onDragDrop(e),false);
                container.addEventListener('dragleave',e => this.onDragLeave(e),false);
                container.addEventListener('dragenter',e => this.onDragEnter(e),false);
            });
            this.draggables.forEach(draggable => {
                draggable.addEventListener('dragstart',e => this.onDragStart(e),false);
                draggable.addEventListener('dragend', e => this.onDragEnd(e),false);
            });
        }
        console.log("draggables",this.draggables);
        console.log("this.containers",this.containers);
    }
    this.removeEventListeners = function(name){
        if(name === 'container' && this.containers){
            this.containers.forEach(container => {
                container.removeEventListener('dragover',e => this.onDragHover(e,container),false);
                container.removeEventListener('drop', e => this.onDragDrop(e),false);
                container.removeEventListener('dragleave',e => this.onDragLeave(e),false);
                container.removeEventListener('dragenter',e => this.onDragEnter(e),false);
            });
        }else if(name === 'draggables' && this.draggables){
            this.draggables.forEach(draggable => {
                draggable.removeEventListener('dragstart',e => this.onDragStart(e,draggable),false);
                draggable.removeEventListener('dragend', e => this.onDragEnd(e,draggable),false);
            });
        }else if(this.draggables && this.containers){
            this.containers.forEach(container => {
                container.removeEventListener('dragover',e => this.onDragHover(e,container),false);
                container.removeEventListener('drop',e => this.onDragDrop(e),false);
                container.removeEventListener('dragleave',e => this.onDragLeave(e),false);
                container.removeEventListener('dragenter',e => this.onDragEnter(e),false);
            });
            this.draggables.forEach(draggable => {
                draggable.removeEventListener('dragstart',e => this.onDragStart(e),false);
                draggable.removeEventListener('dragend',e => this.onDragEnd(e),false);
            });
        }
    }
    this.createPlaceHolder = function(){
        let placeholder = document.createElement('div');
        placeholder.style.height = '50px';
        placeholder.style.borderRadius = '5px';
        placeholder.style.backgroundColor = '#eee';
        placeholder.style.margin = '10px 0';
        this.placeholder = placeholder;
    }
    this.getDragAfterElement = function(container, y){
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
        } else {
        return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
    }

    this.onDragStart = function(e,draggable){
        e.stopPropagation();
        let elementToInsert;
        console.log("drag start",draggable);
        // e.dataTransfer.setData('elementid',e.target.id);
        if(draggable && draggable.getAttribute('name')){
            let element = draggable.getAttribute('name');
            
            switch(element){
                case 'text-field':
                    elementToInsert = document.createElement('input');
                    elementToInsert.classList.add('draggable');
                    elementToInsert.setAttribute('draggable',true);
                    elementToInsert.setAttribute('placeholder','Text');
                    elementToInsert.setAttribute('disabled',true);
                    elementToInsert.setAttribute('id',`field-${Date.now()}`);
                    this.elementToInsert = elementToInsert;
                    this.existingElement = false;
                    break;
                case 'email-field':
                        elementToInsert = document.createElement('input');
                        elementToInsert.classList.add('draggable');
                        elementToInsert.setAttribute('draggable',true);
                        elementToInsert.setAttribute('placeholder','Email');
                        elementToInsert.setAttribute('disabled',true);
                        elementToInsert.setAttribute('id',`field-${Date.now()}`);
                        this.elementToInsert = elementToInsert;
                        this.existingElement = false;
                        break;
                case 'phone-field':
                    elementToInsert = document.createElement('input');
                    
                    elementToInsert.classList.add('draggable');
                    elementToInsert.setAttribute('draggable',true);
                    elementToInsert.setAttribute('placeholder','Phone');
                    elementToInsert.setAttribute('disabled',true);
                    elementToInsert.setAttribute('id',`field-${Date.now()}`);
                    this.elementToInsert = elementToInsert;
                    this.existingElement = false;
                    break;
                default:
                    this.elementToInsert = draggable;
                    this.existingElement = true;
                    break;
            }
        }else{
            this.existingElement = true;
            this.elementToInsert = draggable; 
        }
        this.placeholder.setAttribute("id",`placeholder-${Date.now()}`);
        draggable.classList.add('dragging');
    }
    this.onDragEnd = function(e,draggable){
        draggable.classList.remove('dragging');
        console.log("drag end",this.elementToInsert);
        if(!this.existingElement){
            this.addEventListenerForDraggableItem(this.elementToInsert);
            this.updateDraggables('draggables');
        }else{
            console.log("existing ele",this.elementToInsert);
            this.elementToInsert.classList.remove('dragging');
        }
    }
    this.addEventListenerForDraggableItem = function(element){
        console.log("ele",element);
        element.addEventListener('dragstart',e => this.onDragStart(e,element));
        element.addEventListener('dragend',e => this.onDragEnd(e,element));
    }

    this.addEventListenersForContainer = function(container){
        container.addEventListener('dragover',e => this.onDragHover(e,container,false));
        container.addEventListener('drop',e => this.onDragDrop(e),false);
        container.addEventListener('dragleave',e => this.onDragLeave(e),false);
        container.addEventListener('dragenter',e => this.onDragEnter(e),false);
    }

    this.onDragHover = function(e,container){
        e.preventDefault();
        this.afterElement = this.getDragAfterElement(container, e.clientY);
        if (this.afterElement == null) {
            container.appendChild(this.placeholder)
        } else {
            container.insertBefore(this.placeholder, this.afterElement)
        }
    }
    this.onDragEnter = function(e){
        e.preventDefault();
    }
    this.onDragLeave = function(e){
        e.preventDefault();
        console.log("on drag leave");
    }
    this.onDragDrop = function(e){
        e.preventDefault()
        // let data = e.dataTransfer.getData("elementid");
        this.placeholder.replaceWith(this.elementToInsert);
    }

    this.init = function(){
        try{
            this.mainContainer = document.getElementById('main-container');
            this.updateContainers();
            this.updateDraggables();
            this.addEventListeners();
            this.createPlaceHolder();
        }catch(e){
            console.log(e);
        }
    }
}

let customDragnDrop = new CustomDragAndDrop();
customDragnDrop.init();