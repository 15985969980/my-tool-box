// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import styles from "rollup-plugin-styles"; // https://github.com/Anidetrix/rollup-plugin-styles
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import rollupTypescript from 'rollup-plugin-typescript2';
import myExample from './rollup-plugin/myTest.js';


import pkg from './package.json';

const config = {
    input: 'src/main.ts',
    output: [{
        file: pkg.main,
        format: 'umd',
        name: 'hxkToolBox',
        sourcemap: false,
    }, {
        file: pkg.module,
        format: 'es',
        sourcemap: false
    }],
    plugins: [
        myExample(),
        styles(),
        rollupTypescript(),
        resolve(),
        commonjs(),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
            plugins: ["@babel/plugin-transform-runtime"]
        }),
        // terser()
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(terser({
        compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
        }
    }))
}

export default config