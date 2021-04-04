function transformObject(varsObject, transformer) {
  if (transformer && {}.toString.call(transformer) === '[object Function]') return transformer(varsObject)
  return varsObject
}

module.exports = transformObject
