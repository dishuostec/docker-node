const generateBuildMatrix = require('./genMatrix.js');

const generatePublishMatrix = () => {
  const matrix = generateBuildMatrix([
    'genMatrix.js',
  ], [], []);

  const config = require('./versions.json');

  function map_to_platform(variant) {
    if (variant === 's390x') {
      return null;
    }
    if (variant.startsWith('arm')) {
      variant = variant.replace('arm32', 'arm').replace('v', '/v');
    }

    return 'linux/' + variant;
  }

  matrix.include.forEach(item => {
    const node_version = item.version.split('.')[0];
    item.platforms = config[node_version].variants[item.variant].map(map_to_platform).filter(d => d).join(',');
  });

  return matrix;
};

module.exports = generatePublishMatrix;
