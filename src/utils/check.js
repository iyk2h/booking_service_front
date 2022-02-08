function idFormatCheck(id) {
  return /^[0-9]{6}$/.test(id);
}

export { idFormatCheck };