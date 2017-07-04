function isEmptyOrWhitespace(text) {
  return !(text.replace(/\s/g, '').length);
//  (!text) ||
}

export { isEmptyOrWhitespace };
