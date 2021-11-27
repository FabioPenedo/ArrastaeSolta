const qS = (el)=>document.querySelector(el);
const qSa = (el)=>document.querySelectorAll(el);

let areas = {
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
    f: null
}

qSa('.item').forEach(item=>{
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

qSa('.area').forEach(area=>{
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

qSa('.areaItem').forEach(areaItem=>{
    areaItem.addEventListener('dragover', dragOverNeutral);
    areaItem.addEventListener('dragleave', dragLeaveNeutral);
    areaItem.addEventListener('drop', dropNeutral);
});

function dragStart(e) {
    e.currentTarget.classList.add('dragging')
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging')
}

function dragOver(e) {
    if(e.currentTarget.querySelector('.item') === null) {
        e.preventDefault()
        e.currentTarget.classList.add('hover')
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}

function drop(e) {
    e.currentTarget.classList.remove('hover')
    if(e.currentTarget.querySelector('.item') === null) {
        let dragItem = qS('.item.dragging')
        e.currentTarget.appendChild(dragItem)
    }
    updateAreas()
}

function dragOverNeutral(e) {
    if(e.currentTarget.querySelector('.item') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e) {
    if(e.currentTarget.querySelector('.item') === null) {
        e.currentTarget.classList.remove('hover');
        let dragItem = qS('.item.dragging');
        e.currentTarget.appendChild(dragItem);
    }
    updateAreas();
}

function updateAreas() {
    qSa('.area').forEach(area=>{
        let name = area.getAttribute('data-name');
        if(area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').getAttribute('data-name');
        }else {
            areas[name] = null;
        }
    });

    if(areas.a === '2' && areas.b === '4' && areas.c === '1' && areas.d === '6' && areas.e === '3' && areas.f === '5') {
        qS('.areas').classList.add('correct')
    }else {
        qS('.areas').classList.remove('correct')
    }
}