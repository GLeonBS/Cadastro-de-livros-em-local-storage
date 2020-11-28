import Person, { Gender } from './entities/Person.js'

const name = document.querySelector<HTMLInputElement>('#name')!
const birth = document.querySelector<HTMLInputElement>('#birth')!
const gender = document.querySelector<HTMLSelectElement>('#gender')!
const message = document.querySelector<HTMLParagraphElement>('#message')!
const form = document.querySelector('form')!

const students: Person[] = []

name.focus()

form.addEventListener('submit', (e: Event) => {
  e.preventDefault()
  
})