import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogForm from './BlogForm'


describe('Blogs', () => {

    const blog = {
        title: 'this is a test',
        author: 'jean némard',
        url: 'https://xyz.com'
    }

    test('it shows a blog with title and author', () => {
        render(<Blog blog={blog} />)
        const displayedElements = screen.getByText((content, element) =>
            content.includes('this is a test') && content.includes('jean némard')
        )
        expect(displayedElements).toBeVisible()

        const hiddenElements = screen.getByText((content, element) =>
            content.includes('https://xyz.com') && content.includes('likes:')
        )
        expect(hiddenElements).not.toBeVisible()
    })


    test("it shows the blog's URL and number of like when the button controlling the shown details has been clicked", async () => {
        render(<Blog blog={blog} />)
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const elements = screen.getByText((content, element) =>
            content.includes('https://xyz.com') && content.includes('likes:')
        )
        expect(elements).toBeVisible()
    })

    test('it likes twice', async () => {
        const clickHandler = jest.fn()
        render(<Blog blog={blog} addLike={clickHandler} />)
        const user = userEvent.setup()
        const view = screen.getByText('view')
        await user.click(view)
        const like = screen.getByText('like')
        await user.click(like)
        await user.click(like)

        expect(clickHandler).toHaveBeenCalledTimes(2)
    })

    test('it creates new blog', async () => {
        const addBlog = jest.fn()
        render(<NewBlogForm addBlog={addBlog} />)
        const user = userEvent.setup()
        const title = screen.getByPlaceholderText('blog title')
        await user.type(title, 'blog title')
        const author = screen.getByPlaceholderText('blog author')
        await user.type(author, 'Jean Némard')
        const url = screen.getByPlaceholderText('blog url')
        await user.type(url, 'https://blablabla.com')
        const submit = screen.getByText('create')
        await user.click(submit)

        expect(addBlog).toHaveBeenCalledTimes(1)
        expect(addBlog.mock.calls[0][0]).toBe('blog title')
    })
})
