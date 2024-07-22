const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        let filter = {}
  
        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          if (author) {
            filter.author = author._id
          } else {
            return [];
          }
        }
  
        if (args.genre) {
          filter.genres = { $in: [args.genre] }
        }
  
        return Book.find(filter).populate('author')
      },
      allAuthors: async () => Author.find({}),
      allGenres: async () => {
        const objektList = await Book.find({})
        let genres = []
        for(let x = 0; x < objektList.length; x++) {
          let genres2 = objektList[x].genres
          if(genres2.length > 0) {
            for (let y = 0; y < genres2.length; y++) {
              if (!genres.includes(genres2[y])) {
                genres.push(genres2[y])
              }
            }
          }
        }
        //console.log(genres)
        return genres
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Author: {
      /*bookCount: (root) => {
          return books.filter(book => book.author === root.name).length
      }*/
      bookCount: async (root) => {
        return Book.countDocuments({ author: root._id })
      }
    },
    Mutation: {
      addBook: async (root, args, { currentUser }) => {
  
        if (!currentUser) {
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT' }
          }) 
        }
  
        if (args.title.length < 3 || args.author.length < 3) {
          throw new GraphQLError('title and author length must be at least 3 characters')
        }
  
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author, born: null })
          try {
            await author.save();
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                error
              }
            })
          }
        }
  
        const book = new Book({ ...args, author: author._id })
        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              error
            }
          });
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book.populate('author')
      },
      editAuthor: async (root, args, { currentUser }) => {
  
        if (!currentUser) {
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT' }
          }) 
        }
  
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Editing born year failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return author
      },
      createUser: async (root, args) => {
        
        //const user = new User({ username: args.username })
        const user = new User({ ...args })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT' }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
  }

  module.exports = resolvers