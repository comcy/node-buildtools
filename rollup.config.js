import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };

const BANNER = '#!/usr/bin/env node';

const BUILD_ARTIFACTS = [
    './index.d.ts',
    './index.esm.js',
    './index.esm.js.map'
];

const PROJECT_ARTIFACTS = [
    'LICENSE',
    'README.md',
    'package.json'
];

export default {
    input: 'src/index.ts', // Entry point for your library
    output: [
        {
            file: pkg.main, // ES module format
            format: 'esm',
            sourcemap: true,
            plugins: [
                terser({
                    ecma: 2020,
                    // mangle: { toplevel: true },
                    compress: {
                        module: true,
                        // toplevel: true,
                        unsafe_arrows: true,
                        drop_console: false, // DEBUG
                        drop_debugger: false, // DEBUG
                    },
                    output: { quote_style: 1 },
                }),
            ],
            banner: BANNER,

        },
    ],
    external: [
        ...Object.keys(pkg.scripts || {}),
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        peerDepsExternal(), // Exclude peer dependencies from the bundle
        typescript(), // Compile TypeScript files
        nodeResolve(), // Resolve node_modules
        copy({
            targets: [
                {
                    src: PROJECT_ARTIFACTS,
                    dest: './dist'
                },
                {
                    src: BUILD_ARTIFACTS,
                    dest: './dist'
                },
            ],
            hook: 'writeBundle',
            copyOnce: true,
            copySync: true,
        }),
    ],
    external: [], // Specify external dependencies here
};
