import { useSelector, useDispatch } from 'react-redux'
import AddBlog from './AddBlog'
import { Link } from 'react-router-dom'

import { TableContainer, Table, TableBody, TableRow, TableCell, Typography, Box } from '@mui/material'

const Blogs = () => {
  const blogs2 = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <Box sx={{ padding: 2 }}>
      {user.username !== null && (
        <AddBlog />
      )}
      <Typography variant="h5" component="div" gutterBottom sx={{ marginTop: 2 }}>
          blogs
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {blogs2.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Blogs
