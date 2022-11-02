class EmptyFileException extends Error {
  constructor() {
    super('File you have choosen to convert is empty. Please add some content and try again.');
  }
}

export { EmptyFileException };
