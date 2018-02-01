function getOption (options, path, defaultValue) {
  return (typeof options === 'object' && options[path] !== undefined) ? options[path] : defaultValue
}

module.exports = getOption