module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  //Con esto se puede incluir una librería especifica del node_modules a las pruebas de jest
  moduleNameMapper: {
    '^query-string$': '<rootDir>/node_modules/query-string/index.js',
  },
  /**
   * Evita que se aplique las transformaciones de babel a la librería especificada
   * Parece ser que la librería de query-string en concreto, da fallo al hacer la transformacion
   * de Babel
   */
  transformIgnorePatterns: ["/node_modules/(?!query-string)/"],
}