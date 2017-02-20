export default (elements, separator = ', ') => (
  elements.map((el, i) => i + 1 === elements.length ? el : [el, separator])
)
