import achievementsData from '../mockData/achievements.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let achievements = [...achievementsData]

export const getAll = async () => {
  await delay(300)
  return [...achievements]
}

export const getById = async (id) => {
  await delay(200)
  const achievement = achievements.find(a => a.id === id)
  return achievement ? {...achievement} : null
}

export const create = async (achievementData) => {
  await delay(400)
  const newAchievement = {
    id: Date.now().toString(),
    ...achievementData
  }
  achievements.push(newAchievement)
  return {...newAchievement}
}

export const update = async (id, updateData) => {
  await delay(300)
  const index = achievements.findIndex(a => a.id === id)
  if (index === -1) throw new Error('Achievement not found')
  
  achievements[index] = { ...achievements[index], ...updateData }
  return {...achievements[index]}
}

export const delete_ = async (id) => {
  await delay(250)
  const index = achievements.findIndex(a => a.id === id)
  if (index === -1) throw new Error('Achievement not found')
  
  achievements.splice(index, 1)
  return true
}