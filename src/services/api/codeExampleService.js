import codeExamplesData from '../mockData/codeExamples.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let codeExamples = [...codeExamplesData]

export const getAll = async () => {
  await delay(300)
  return [...codeExamples]
}

export const getById = async (id) => {
  await delay(200)
  const example = codeExamples.find(e => e.id === id)
  return example ? {...example} : null
}

export const create = async (exampleData) => {
  await delay(400)
  const newExample = {
    id: Date.now().toString(),
    ...exampleData
  }
  codeExamples.push(newExample)
  return {...newExample}
}

export const update = async (id, updateData) => {
  await delay(300)
  const index = codeExamples.findIndex(e => e.id === id)
  if (index === -1) throw new Error('Code example not found')
  
  codeExamples[index] = { ...codeExamples[index], ...updateData }
  return {...codeExamples[index]}
}

export const delete_ = async (id) => {
  await delay(250)
  const index = codeExamples.findIndex(e => e.id === id)
  if (index === -1) throw new Error('Code example not found')
  
  codeExamples.splice(index, 1)
  return true
}