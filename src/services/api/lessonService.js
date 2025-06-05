import lessonsData from '../mockData/lessons.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let lessons = [...lessonsData]

export const getAll = async () => {
  await delay(300)
  return [...lessons]
}

export const getById = async (id) => {
  await delay(200)
  const lesson = lessons.find(l => l.id === id)
  return lesson ? {...lesson} : null
}

export const create = async (lessonData) => {
  await delay(400)
  const newLesson = {
    id: Date.now().toString(),
    ...lessonData
  }
  lessons.push(newLesson)
  return {...newLesson}
}

export const update = async (id, updateData) => {
  await delay(300)
  const index = lessons.findIndex(l => l.id === id)
  if (index === -1) throw new Error('Lesson not found')
  
  lessons[index] = { ...lessons[index], ...updateData }
  return {...lessons[index]}
}

export const delete_ = async (id) => {
  await delay(250)
  const index = lessons.findIndex(l => l.id === id)
  if (index === -1) throw new Error('Lesson not found')
  
  lessons.splice(index, 1)
  return true
}