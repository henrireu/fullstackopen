const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByTestId('loginform')
    await expect(locator).toBeVisible()

  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await new Promise(resolve => setTimeout(resolve, 1000))

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'wrong')
    
        await expect(page.getByText('wrong username or password')).toBeVisible()
        await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
      })  
  })

  describe('When logged in', () => {
    //jostain syystä ei toimi kahdella kirjautumisella
    /*beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })*/
  
    test('a new blog can be created', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await page.getByTestId('newblog').click()
      await createBlog(page, 'testititle2', 'testiauthor2', 'testiurl2')

      await expect(page.getByText('testititle2 testiauthor2show')).toBeVisible()

    })

    test('blog can be liked', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')

        await new Promise(resolve => setTimeout(resolve, 1000))

        const showbuttons = await page.getByTestId('show').all()
        await showbuttons[0].click()
        await expect(page.getByTestId('like')).toBeVisible()
    })
  })
})