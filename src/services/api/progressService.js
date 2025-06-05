import progressData from '../mockData/progress.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let progress = [...progressData]

export const getAll = async () => {
  await delay(250)
  return [...progress]
}

export const getById = async (id) => {
  await delay(200)
  const item = progress.find(p => p.id === id)
  return item ? {...item} : null
}

export const getByLessonId = async (lessonId) => {
  await delay(200)
  const item = progress.find(p => p.lessonId === lessonId)
  return item ? {...item} : null
}

export const create = async (progressData) => {
  await delay(300)
  const newProgress = {
    id: Date.now().toString(),
    ...progressData
  }
  progress.push(newProgress)
  return {...newProgress}
}

export const update = async (id, updateData) => {
  await delay(250)
  const index = progress.findIndex(p => p.id === id)
  if (index === -1) throw new Error('Progress not found')
  
  progress[index] = { ...progress[index], ...updateData }
  return {...progress[index]}
}

export const delete_ = async (id) => {
  await delay(200)
  const index = progress.findIndex(p => p.id === id)
  if (index === -1) throw new Error('Progress not found')
  
  progress.splice(index, 1)
  return true
}