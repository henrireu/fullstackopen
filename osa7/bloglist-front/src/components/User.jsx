import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Box, Card, Typography, CardContent, List, ListItem, ListItemText } from '@mui/material'

const User = () => {
  const users = useSelector((state) => state.allUsers)

  const id = useParams().id
  const user = users.find(u => u.id === id.toString())

  if (!user) {
    return null
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
            {user.name}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
            added blogs
          </Typography>
          <List>
            {user.blogs.map((blog) => (
              <React.Fragment key={blog.id}>
                <ListItem>
                  <ListItemText>
                    {blog.title}
                  </ListItemText>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )

}

export default User