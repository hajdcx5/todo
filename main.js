import {
	db,
	doc,
	collection,
	updateDoc,
	deleteDoc,
	setDoc,
	getDocs,
} from './firebase-config.js'

const todoList = document.querySelector('.todos')
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')

function uuid() {
	var temp_url = URL.createObjectURL(new Blob())
	var uuid = temp_url.toString()
	URL.revokeObjectURL(temp_url)
	return uuid.substr(uuid.lastIndexOf('/') + 1)
}

async function getTodos() {
	const snapshot = await getDocs(collection(db, 'todos'))
	const data = snapshot.docs.map((doc) => doc.data())
	return data
}

async function renderTodos() {
	const todos = await getTodos()

	todoList.innerHTML = ''

	for (const todo of todos) {
		todoList.innerHTML += `<div id="${todo.id}" class="todo-item">
            <input type="checkbox" class="todo-checkbox" ${
				todo.done ? 'checked' : ''
			} />
            <span>${todo.title}</span>
            <button class="todo-delete">Xoá</button>
        </div>`
	}

	const deletes = document.querySelectorAll('.todo-delete')
	const checkboxes = document.querySelectorAll('.todo-checkbox')

	deletes.forEach((del) => {
		del.addEventListener('click', async (e) => {
			const id = e.target.parentElement.id
			await deleteDoc(doc(db, 'todos', id))
			await renderTodos()
		})
	})

	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener('change', async (e) => {
			const done = e.target.checked
			const id = e.target.parentElement.id

			await updateDoc(doc(db, 'todos', id), {
				done,
			})
		})
	})
}

renderTodos()

todoButton.addEventListener('click', async () => {
	const value = todoInput.value

	const id = uuid()

	await setDoc(doc(db, 'todos', id), {
		id,
		title: value,
		done: false,
	})

	await renderTodos()

	todoInput.value = ''
	todoInput.focus()
})
