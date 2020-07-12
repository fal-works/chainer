import resolve from "@rollup/plugin-node-resolve";
import cleanup from "rollup-plugin-cleanup";

// ----------------------------------------------------------------------------

const version = "0.9.0";

const moduleName = "chainer";
const umdName = "chainer";
const year = "2020";
const description = `* Small library for 2D motion graphics.`;

const bannerComment = `/**
 * ${moduleName}
 *
${description}
 * GitHub repository: {@link https://github.com/fal-works/${moduleName}}
 *
 * @module ${moduleName}
 * @copyright ${year} FAL
 * @author FAL <contact@fal-works.com>
 * @license MIT
 * @version ${version}
 */
`;

const distributionDirectory = "lib";

// ----------------------------------------------------------------------------

export { distributionDirectory, moduleName, umdName, bannerComment };

export const input = `out/${moduleName}.js`;

export const createPlugins = () => [
  resolve(),
  cleanup({
    comments: /^\*\*/, // preserve jsdoc comments
    sourcemap: false,
    extensions: ["js"],
  }),
];
