const R = require('ramda')

const raw_levels = [{
  rule: {
    letter_number_combinations_being_tested: [{letter: 'A', number: 1}]
  }
},{
  rule: {
    letter_number_combinations_being_tested: [{letter: 'B', number: 2}]
  }
}]

const executable_doc = (a,b,message) => {
  if(!R.equals(a,b)){
    console.log(`
      ${JSON.stringify(a)} =/= ${JSON.stringify(b)}
    `)
  }
}

let t = () => executable_doc(
  extract_being_tested_arrays(raw_levels),
  [{letter: 'A', number: 1},{letter: 'B', number: 2}]
)

const combinationsBeingTestedLens = R.lensPath(['rule' , 'letter_number_combinations_being_tested'])

const extract_being_tested_arrays = R.map(
  R.compose(
    R.nth(0),
    R.view(combinationsBeingTestedLens)
  )
)
t()

t = () => executable_doc(
  turn_into_full_square(['a','b']),
  [['a','b'],['a','b']]
)
const turn_into_full_square = levels => {
  const nbr_levels = levels.length
  return R.times(() => R.clone(levels), nbr_levels)
}
t()

t = () => executable_doc(
  cut_square_diagonally([[1,2],[1,2]]),
  [[1],[1,2]]
)
const cut_square_diagonally = square => {
  return square.map((row,index) => {
    return row.slice(0,index+1)
  })
}
t()

t = () => executable_doc(
  make_more_complicated_levels(raw_levels),
  [{
    rule: {
      letter_number_combinations_being_tested: [{letter: 'A', number: 1}]
    }
  },{
    rule: {
      letter_number_combinations_being_tested: [{letter: 'A', number: 1}, {letter: 'B', number: 2}]
    }
  }]
)

t = () => executable_doc(
  merge_back_in_levels([{}])(['a']),
  [{'rule': {letter_number_combinations_being_tested:'a'}}]
)

const merge_back_in_levels = levels => letter_number_combinations_being_tested => {
  return R.compose(
    R.map(([level,combination]) => {
      return R.set(combinationsBeingTestedLens, combination, level)
    }),
    R.zip(levels)
  )(letter_number_combinations_being_tested)
}
t()

t = () => executable_doc(
  make_more_complicated_levels(raw_levels),
  [{
    rule: {
      letter_number_combinations_being_tested: [{letter: 'A', number: 1}]
    }
  },{
    rule: {
      letter_number_combinations_being_tested: [{letter: 'A', number: 1}, {letter: 'B', number: 2}]
    }
  }]
)
const make_more_complicated_levels = levels => R.pipe(
  extract_being_tested_arrays,
  turn_into_full_square,
  cut_square_diagonally,
  merge_back_in_levels(levels)
)(levels)

t()

module.exports = {
  make_more_complicated_levels
}
