const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {

    const createUser = async (request, name, username, password) => {
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: name,
                username: username,
                password: password
            }
        })
    }

    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/test/reset')
        await createUser(request, 'Jean Némard', 'jeannemard', '1234password')
        await page.goto('http://localhost:5173/')
    })

    test('it shows login form', async ({ page }) => {
        const login = await page.getByRole('button', { name: 'Login' })
        await expect(login).toBeVisible()
    })

    describe('Login', () => {

        const login = async (page, username, password) => {
            await page.getByTestId('username').fill(username)
            await page.getByTestId('password').fill(password)
            await page.getByRole('button', { name: 'Login' }).click()
        }

        test('it logins', async ({ page }) => {
            await login(page, 'jeannemard', '1234password')
            await expect(page.getByTestId('success-message')).toHaveText('Connected!')
        })

        test('it fails login with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('wrong username')
            await page.getByTestId('password').fill('wrong password')
            await page.getByRole('button', { name: 'Login' }).click()
            await expect(page.getByTestId('error-message')).toHaveText('Wrong credentials')
        })

        describe('When logged in', () => {

            const createBlog = async (page, title, author, url) => {
                await page.getByRole('button', { name: 'create new blog' }).click()
                await page.getByTestId('blog-form-title').fill(title)
                await page.getByTestId('blog-form-author').fill(author)
                await page.getByTestId('blog-form-url').fill(url)
                await page.getByRole('button', { name: 'create' }).click()
            }

            test('it creates a new blog', async ({ page }) => {
                await login(page, 'jeannemard', '1234password')
                await createBlog(page, 'a blog for test', 'Jean Némard', 'http://blablabla.com')
                const element = page.getByText(/new Blog 'a blog for test' created!/)
                await expect(element).toBeVisible()
            })

            test('it likes a blog', async ({ page }) => {
                await login(page, 'jeannemard', '1234password')
                await createBlog(page, 'a blog for test', 'Jean Némard', 'http://blablabla.com')
                await page.getByRole('button', { name: 'view' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                const element = page.getByText(/likes: 1/)
                await expect(element).toBeVisible()
            })

            test('it deletes a blog', async ({ page }) => {
                await login(page, 'jeannemard', '1234password')
                await createBlog(page, 'a blog i will delete', 'Jean Némard', 'http://blablabla.com')
                await page.getByRole('button', { name: 'view' }).click()
                page.on('dialog', dialog => dialog.accept())
                await page.getByRole('button', { name: 'delete' }).click()
                const element = page.getByText(/blog a blog i will delete deleted!/)
                await expect(element).toBeVisible()
            })

            test('it can\'t delete a blog if it\'s not its owner', async ({ page, request }) => {
                await login(page, 'jeannemard', '1234password')
                await createBlog(page, 'a blog for test', 'Jean Némard', 'http://blablabla.com')
                await page.getByRole('button', { name: 'logout' }).click()
                await createUser(request, 'Judas Bricot', 'judasbricot', '1234password')
                await login(page, 'judasbricot', '1234password')
                await page.getByRole('button', { name: 'view' }).click()
                const element = page.getByRole('button', { name: 'delete' })
                await expect(element).not.toBeVisible()
            })

            test('it orders blogs by like asc', async ({ page }) => {
                await login(page, 'jeannemard', '1234password')
                await createBlog(page, 'a blog for test', 'Jean Némard', 'http://blablabla.com')
                await page.getByTestId('blog-form-title').fill('a second blog')
                await page.getByTestId('blog-form-author').fill('Jean Némard')
                await page.getByTestId('blog-form-url').fill('http://blablabla.com')
                await page.getByRole('button', { name: 'create' }).click()
                await page.getByRole('button', { name: 'view' }).last().click()
                await page.getByRole('button', { name: 'like' }).last().click()
                const lastBlog = await page.getByTestId('blog').last()
                await expect(lastBlog).toContainText(/a blog for test/)
            })
        })
    })

})
