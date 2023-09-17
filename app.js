
// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const expenseAmount = document.querySelector('#amount');
const description = document.querySelector('#description');
const category = document.querySelector('#category');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

userList.addEventListener('click', removeItem);
userList.addEventListener('click', editItem);


function onSubmit(e) {
    e.preventDefault();

    if (expenseAmount.value === '' || description.value === '' || category.value === '') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
    } else {
        // Create new list item with user
        const li = document.createElement('li');


        li.setAttribute('id', `${Date.now()}`)
        // Add text node with input values
        li.appendChild(document.createTextNode(`${expenseAmount.value} - ${description.value} - ${category.value}`));

        var editBtn = document.createElement('button');

        // Add classes to del button
        editBtn.className = 'btn btn-danger btn-sm float-end edit';

        // Append text node
        editBtn.appendChild(document.createTextNode('Edit Expense'));

        // Append button to li
        li.appendChild(editBtn);

        var deleteBtn = document.createElement('button');

        // Add classes to del button
        deleteBtn.className = 'mx-2 btn btn-danger btn-sm float-end delete';

        // Append text node
        deleteBtn.appendChild(document.createTextNode('Delete Expense'));

        // Append button to li
        li.appendChild(deleteBtn);

        const expenseData = {
            id: Date.now(),
            expenseAmount: expenseAmount.value,
            description: description.value,
            category: category.value,
        }

        const data = JSON.stringify(expenseData);

        localStorage.setItem(expenseData.id, data);

        // Append to ul
        userList.appendChild(li);

        // Clear fields
        expenseAmount.value = '';
        description.value = '';
        category.value = '';

    }
}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            var li = e.target.parentElement;
            const id = li.getAttribute('id');
            localStorage.removeItem(id);
            userList.removeChild(li);
        }
    }
}


function editItem(e) {
    if (e.target.classList.contains('edit')) {
        var li = e.target.parentElement;
        const data = li.firstChild.textContent.split(' - ');
        const expenseAmount = document.querySelector('#amount');
        expenseAmount.value = data[0];
        const description = document.querySelector('#description');
        description.value = data[1];
        const cotegories = document.querySelectorAll('.option');
        const category = document.querySelector('#category');
        for (var i = 0; i < cotegories.length; i++) {
            if (cotegories[i].value === data[2]) {
                category.value = data[2]; // Set the selected index
                break;
            }
        }
        const id = li.getAttribute('id');
        console.log('id: ', id);
        localStorage.removeItem(id);
        userList.removeChild(li);
    }
}