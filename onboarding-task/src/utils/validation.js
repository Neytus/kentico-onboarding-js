function notEmptyNotWhitespace(text) {
  return !text.replace(/\s/g, '').length;
}

export { notEmptyNotWhitespace };
