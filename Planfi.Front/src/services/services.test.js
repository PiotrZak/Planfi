import axios from 'axios'

const localapiURL = 'http://localhost:5005'
export const CATEGORIES_URL = `${localapiURL}/Category`

async function getCategories() {
  const response = await axios.get(CATEGORIES_URL)
  return response.data
}

async function getCategoryById(id) {
  const url = `${CATEGORIES_URL}/${id}`
  const response = await axios.get(url)
  return response.data
}

describe('Category Service', () => {
  it('getAllCategories', async () => {
    //arrange
    const categories = [
      { categoryId: '1', exercises: [], title: 'Amatorskie' },
      { categoryId: '2', exercises: [], title: 'Średnio-Zaawansowane' },
      { categoryId: '3', exercises: [], title: 'Profesjonalistyczne' },
    ]
    //act
    const title = await getCategories()
    //assert
    expect(title).toEqual(categories)
  })

  it('getCategoryById', async () => {
    //arrange
    const id = 3
    const category = {
      categoryId: '3',
      exercises: [],
      title: 'Profesjonalistyczne',
    }

    //act
    const title = await getCategoryById(id)

    //assert
    expect(title).toEqual(category)
  })
})
