import Immutable from 'immutable'

const Grammar = Immutable.fromJS(require('./grammar.json'))

export default Grammar.map((nodeDef) => nodeDef.merge({
  props: (nodeDef.get('base') || new Immutable.List())
    .map((type) => {
      const def = Grammar.get(type)
      if (!def) {
        console.error('No definition for', type, '. Ignoring...')
      }
      return def
    })
    .filter(Boolean)
    .push(nodeDef)
    .reduce((props, def) => props.merge(def.get('props')), new Immutable.Map())
}))
