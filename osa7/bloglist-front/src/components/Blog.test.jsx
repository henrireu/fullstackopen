import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = {
  username: 'testi',
  name: 'testi',
  id: '6620d43426e129f9b18bf46b',
}

const blog = {
  title: 'testititle',
  author: 'testiauthor',
  url: 'testiurl',
  likes: 40,
  user: user,
}

test('renders title', () => {
  const { container } = render(<Blog blog={blog} user={user} />)

  const element = container.querySelector('.box')
  expect(element).toHaveTextContent('testititle')
})

test('clicking the button shows likes, url and user', async () => {
  const user = userEvent.setup()
  const { container } = render(<Blog blog={blog} user={user} />)
  const button = container.querySelector('#show')
  await userEvent.click(button)

  render(<Blog blog={blog} user={user} />)

  screen.debug()

  expect(screen.getByText('testiurl')).toBeInTheDocument()
  expect(screen.getByText('40')).toBeInTheDocument()
  expect(screen.getByText('testi')).toBeInTheDocument()
})

test('clicking like button twice, handlefunction will be called twice', async () => {
  const handleLike = vi.fn()

  const user = userEvent.setup()

  const { container } = render(<Blog blog={blog} user={user} />)
  const button = container.querySelector('#show')
  await userEvent.click(button)

  const { container2 } = render(
    <Blog blog={blog} user={user} handleLike={handleLike} />,
  )
  const button2 = container.querySelector('#like')
  await userEvent.click(button2)
  await userEvent.click(button2)

  expect(handleLike.mock.calls).toHaveLength(2)
})
