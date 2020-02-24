
const ApolloServer = require('apollo-server').ApolloServer
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer
const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
    enum LogoTypeEnum {
        INITIALS
    }

    type LevelLogo {
        type: LogoTypeEnum
        initials: String
    }

    type LearningPath {
        id: String
        name: String
        levels: [Level]
    }

    enum LevelType {
        NUMBER_LETTER_ASSOCIATION
    }

    type Level {
        id: String
        name: String
        type: LevelType
        rule: NumberLetterAssociationGame
        logo: LevelLogo
    }

    type NumberLetterAssociationGame {
        game_duration_in_seconds: Int
        initial_score: Int
        winning_score: Int
        letter_number_combinations_being_tested: [LetterNumberCombination]
        allowed_numbers: [Int]
        allowed_letters: [String]
    }

    type LetterNumberCombination {
        number: Int
        letter: String
    }

    type Query {
        learning_paths: [LearningPath]
    }
`

const associations = [
  [0, 'O'],
  [1, 'A'],
  [2, 'B'],
  [3, 'C'],
  [4, 'D'],
  [5, 'E'],
  [6, 'F'],
  [7, 'G'],
  [8, 'H'],
  [9, 'I'],
]

export const basic_learning_path = {
  id: 'basic_learning_path',
  name: 'beginner',
  levels: associations.map(([number, letter]) => {
    return {
      id: number,
      type: 'NUMBER_LETTER_ASSOCIATION',
      name: `${number} - ${letter}`,
      logo: {
        type: 'INITIALS',
        initials: `${number}${letter}`,
      },
      rule: {
        game_duration_in_seconds: 7,
        initial_score: 0,
        winning_score: 10,
        letter_number_combinations_being_tested: [
          {
            letter,
            number,
          },
        ],
        allowed_numbers: associations.map(([number]) => number),
        allowed_letters: associations.map(([, letter]) => letter),
      },
    }
  }),
}


const learning_paths = [basic_learning_path]

export const resolvers = {
  Query: {
    learning_paths: () => learning_paths,
  },
}

function createLambdaServer () {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

function createLocalServer () {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

module.exports = { createLambdaServer, createLocalServer }
