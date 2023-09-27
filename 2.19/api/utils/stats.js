const stats = {};

const requestStats = (req, res, next) => {
  const currentOperation = `${req.method} ${req.path}`;
  const currentOperationCounter = stats[currentOperation];
  if (currentOperationCounter === undefined) stats[currentOperation] = 0;
  stats[currentOperation] += 1;
  const statsMessage = `Request counter : \n${Object.keys(stats)
    .map((operation) => `- ${operation} : ${stats[operation]}`)
    .join('\n')}
        `;
  console.log(statsMessage);
  next();
};

module.exports = requestStats;
