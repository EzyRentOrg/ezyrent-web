module.exports = {
  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn prettier --write ${filenames.join(' ')}`, // Format with Prettier first
    `yarn eslint --fix ${filenames.join(' ')}` // Then fix with ESLint
  ],
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit'
};
