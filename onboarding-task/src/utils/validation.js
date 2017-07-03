function isEmptyOrWhitespace(text) {
  return !text.replace(/\s/g, '').length;
}

export { isEmptyOrWhitespace };
