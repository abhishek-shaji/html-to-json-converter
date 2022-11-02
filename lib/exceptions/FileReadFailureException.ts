class FileReadFailureException extends Error {
  constructor() {
    super('Fail to read file. Please make sure this file exist and try again');
  }
}

export { FileReadFailureException };
