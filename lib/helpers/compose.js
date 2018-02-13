/**
 * Compose wrappers
 * @param {Function} wrappers
 * @returns {Function}
 */
function compose (...wrappers) {
  return function wrapper (target) {
    return wrappers.reduceRight((target, wrapper) => wrapper(target), target)
  }
}

module.exports = compose
