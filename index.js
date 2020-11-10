let draggables = document.querySelectorAll('.draggable');
let containers = document.querySelectorAll('.container');
let mainContainer = document.getElementById('main-container');
let afterElement;
let elementToInsert;
let count = 0;

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
                let data = e.dataTransfer.getData("elementid");
                console.log("eee",data);
                afterElement = getDragAfterElement(container, e.clientY);
                if (afterElement == null) {
                
                container.appendChild(elementToInsert)
                } else {
                container.insertBefore(elementToInsert, afterElement)
                }
            })
            container.addEventListener('drop', e => {
                e.preventDefault()
                let data = e.dataTransfer.getData("elementid");
                console.log("ff",data);
               
                // draggables = document.querySelectorAll('.draggable');
                // init();
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