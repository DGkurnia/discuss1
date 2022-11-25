const add = document.querySelector('.add-items');
  const lists = document.querySelector('.plates');
  const items = JSON.parse(localStorage.getItem('items'))||[];

function itemAddition(el){
    el.preventDefault()
    const text = (this.querySelector('[name=item]')).value
    const data = {
        text,
        completed: false
    }

    items.push(data)
    itemLists(data, lists)
    localStorage.setItem('items', JSON.stringify(items))
    this.reset()

}

function itemLists(plates = [], plateLists){
    plateLists.innerHTML =  plates.map((p, a) =>{
        return`
        <li>
        <input type="checkbox" data-index=${a} id="item${a}" ${p.completed ?
        'checked' : ''}/>
        <label for="item${a}">${p.text}</label>
        </li>`
    }).join('')
}

function triggerDone(a){
    if (!a.target.matches('input')) return
    const e = a.target;
    const i = e.dataset.index
    items[i].done = !items[i].done
    localStorage.setItem('items', JSON.stringify(items))
    itemLists(items, lists)
}

add.addEventListener('submit', itemAddition)
lists.addEventListener(items, triggerDone)

itemLists(items,lists)
