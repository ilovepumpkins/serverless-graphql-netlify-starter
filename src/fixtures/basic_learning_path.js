const { make_more_complicated_levels } = require('./make_more_complicated_levels.js')

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

const create_level = ([number, letter]) => {
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
      allowed_numbers: associations.map(([number,_]) => number),
      allowed_letters: associations.map(([_,letter]) => letter),
    },
  }
}

const levels = associations.map(create_level)

module.exports = {
  basic_learning_path: {
    id: 'basic_learning_path',
    name: 'beginner',
    levels: make_more_complicated_levels(levels)
  }
}
