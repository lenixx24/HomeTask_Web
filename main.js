// default items
let items = [
    { id: 1, name: 'Помідори', amount: 2, isBought: false },
    { id: 2, name: 'Печиво', amount: 2, isBought: false },
    { id: 3, name: 'Шоколад', amount: 1, isBought: false }
];

const itemsContainer = document.getElementById('items-container');
const statsLeftContainer = document.getElementById('stats-left-container');
const statsBoughtContainer = document.getElementById('stats-bought-container');
const newItemInput = document.getElementById('new-item-input');
const addItemBtn = document.getElementById('add-item-btn');

function update() {
    itemsContainer.innerHTML = '';
    statsLeftContainer.innerHTML = '';
    statsBoughtContainer.innerHTML = '';

    items.forEach(item => {
        // create product item element
        const itemEl = document.createElement('div');
        itemEl.className = `product-item ${item.isBought ? 'is-bought' : ''}`;

        const nameEl = document.createElement('span');
        nameEl.className = 'product-name';
        nameEl.textContent = item.name;
        
        // editing
        if (!item.isBought) {
            nameEl.addEventListener('click', () => {
                const inputEl = document.createElement('input');
                inputEl.type = 'text';
                inputEl.className = 'edit-name-input';
                inputEl.value = item.name;
        //when input loses focus, save changes
                inputEl.addEventListener('blur', () => {
                    if (inputEl.value.trim() !== '') 
                        item.name = inputEl.value.trim();
                    update(); 
                });
                
            
                inputEl.addEventListener('keyup', (e) => {
                    if (e.key === 'Enter') inputEl.blur();
                });

                itemEl.replaceChild(inputEl, nameEl);
                inputEl.focus(); 
            });
        }

        const amountBlock = document.createElement('div');
        amountBlock.className = 'amount-block';
        
        const minusBtn = document.createElement('button');
        minusBtn.className = 'minus';
        minusBtn.textContent = '-';
        minusBtn.dataset.tooltip = 'Зменшити кількість';
        minusBtn.disabled = item.amount <= 1; 
        minusBtn.addEventListener('click', () => {
            if (item.amount > 1) {
                item.amount--;
                update();
            }
        });

        const amountSpan = document.createElement('span');
        amountSpan.className = 'amount';
        amountSpan.textContent = item.amount;

        const plusBtn = document.createElement('button');
        plusBtn.className = 'plus';
        plusBtn.textContent = '+';
        plusBtn.dataset.tooltip = 'Збільшити кількість';
        plusBtn.addEventListener('click', () => {
            item.amount++;
            update();
        });

        amountBlock.append(minusBtn, amountSpan, plusBtn);

        const statusBlock = document.createElement('span');
        statusBlock.className = 'status';

    
        const statusBtn = document.createElement('button');
        statusBtn.className = 'status-button';
        statusBtn.textContent = item.isBought ? 'Не куплено' : 'Куплено';
        statusBtn.dataset.tooltip = item.isBought ? 'Скасувати покупку' : 'Позначити як куплене';
        statusBtn.addEventListener('click', () => {
            item.isBought = !item.isBought;
            update();
        });

        statusBlock.append(statusBtn);

        if (!item.isBought) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete';
            deleteBtn.textContent = 'x';
            deleteBtn.dataset.tooltip = 'Видалити товар';
            deleteBtn.addEventListener('click', () => {
        
                items = items.filter(i => i.id !== item.id);
                update();
            });
            statusBlock.append(deleteBtn);
        }

        itemEl.append(nameEl, amountBlock, statusBlock);
        itemsContainer.append(itemEl);

        const statItem = document.createElement('span');
        statItem.className = 'product-item';
        statItem.innerHTML = `${item.name} <div class="amount-block"><span class="amount">${item.amount}</span></div>`;

        if (item.isBought)
            statsBoughtContainer.append(statItem);
        else 
            statsLeftContainer.append(statItem);
        
    });
}

function handleAddItem() {
    const name = newItemInput.value.trim();
    if (name !== '') {
        items.push({
            id: Date.now(), 
            name: name,
            amount: 1, 
            isBought: false
        });
        newItemInput.value = ''; 
        newItemInput.focus(); 
        update(); 
    }
}
addItemBtn.addEventListener('click', handleAddItem);
newItemInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') 
        handleAddItem();
});
update();