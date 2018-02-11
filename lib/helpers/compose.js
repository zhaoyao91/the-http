/**
 * Compose wrappers
 * @param {THWrapper[]} wrappers
 * @returns {THWrapper}
 */
function compose (...wrappers) {
  return function wrapper (target) {
    return wrappers.reduceRight((target, wrapper) => wrapper(target), target)
  }
}

module.exports = compose
