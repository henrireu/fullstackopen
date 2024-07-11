import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { TableContainer, Table, TableBody, TableRow, TableCell, Typography, Box } from '@mui/material'

const Users = () => {
  const users = useSelector((state) => state.allUsers)

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="div" gutterBottom sx={{ marginTop: 2 }}>
        Users
      </Typography>
      <Typography variant="h6" component="div" gutterBottom sx={{ marginLeft: 8 }}>
        Blogs Created
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name} {user.blogs.length}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}



export default Users