let draggables = document.querySelectorAll('.draggable');
let containers = document.querySelectorAll('.container');
let mainContainer = document.getElementById('main-container');
let afterElement;
let elementToInsert;
let count = 0;

//TODO: 
// 1. on drag create new element and on hover show placeholder.
// 2. on drop remove all event listeners of containers and draggables and reassign event listeners


let addsec = document.getElementById('addsection');

    addsec.addEventListener('click',function(e){
        let container = document.createElement('div');
            container.classList.add('container');
        let section = document.createElement('h1');
            section.innerHTML = `Section ${count++}`;
            container.appendChild(section);
        mainContainer.appendChild(container)
        init();
    })

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.stopPropagation();
          
        console.log("drag start",e,draggable);
        e.dataTransfer.setData('elementid',e.target.id);
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
                    elementToInsert.addEventListener('dragstart',function(ev){
                        ev.dataTransfer.setData('elementid',ev.target.id);
                    });
                    break;
                case 'email-field':
                        elementToInsert = document.createElement('input');
                        
                        elementToInsert.classList.add('draggable');
                        elementToInsert.setAttribute('draggable',true);
                        elementToInsert.setAttribute('placeholder','Email');
                        elementToInsert.setAttribute('disabled',true);
                        elementToInsert.setAttribute('id',`field-${Date.now()}`);
                        elementToInsert.addEventListener('dragstart',function(ev){
                            ev.dataTransfer.setData('elementid',ev.target.id);
                        });
                        break;
                case 'phone-field':
                    elementToInsert = document.createElement('input');
                    
                    elementToInsert.classList.add('draggable');
                    elementToInsert.setAttribute('draggable',true);
                    elementToInsert.setAttribute('placeholder','Phone');
                    elementToInsert.setAttribute('disabled',true);
                    elementToInsert.setAttribute('id',`field-${Date.now()}`);
                    elementToInsert.addEventListener('dragstart',function(ev){
                        ev.dataTransfer.setData('elementid',ev.target.id);
                    });
                    break;
                default:
                    elementToInsert = draggable;
                    break;
            }
        }else{
            elementToInsert = draggable; 
        }

        draggable.classList.add('dragging')
        })
    
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            console.log("on drag end");
        })
    })

   
    function init(){
     
        containers = document.querySelectorAll('.container');
        console.log("draggables",containers);
        
        containers.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault()
                afterElement = getDragAfterElement(container, e.clientY);
                if (afterElement == null) {
                
                container.appendChild(elementToInsert)
                } else {
                elementToInsert.style.opacity = 0.5;
                container.insertBefore(elementToInsert, afterElement)
                }
            })
            container.addEventListener('drop', e => {
                e.preventDefault()
                elementToInsert.style.opacity = 1;
                let data = e.dataTransfer.getData("elementid");
                console.log("ff",data);
               
            })
            container.addEventListener('dragleave', e => {
                e.preventDefault();
            })
            container.addEventListener('dragenter', e => {
                e.preventDefault();
            })
        })


    }

    function getDragAfterElement(container, y) {
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