const keywords = [
  'break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do',
  'else', 'false', 'finally', 'for', 'function', 'if', 'in', 'instanceof',
  'new', 'null', 'return', 'switch', 'this', 'throw', 'true', 'try', 'typeof',
  'var', 'void', 'while', 'with'
]

const reserved = [
  'abstract', 'boolean', 'byte', 'char', 'class', 'const', 'double', 'enum',
  'export', 'extends', 'final', 'float', 'goto', 'implements', 'import', 'int',
  'interface', 'let', 'long', 'native', 'package', 'private', 'protected',
  'public', 'short', 'static', 'super', 'synchronized', 'throws', 'transient',
  'volatile', 'yield'
]

export default keywords.concat(reserved)
