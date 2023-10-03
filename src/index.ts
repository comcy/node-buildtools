/**
 * @copyright Copyright (c) 2023 Christian Silfang
 */

export * from './build/clean-package-json';

export class BuildTool {

    constructor() {
        console.log('>>> EXEC >>>');
    }

}

const baseHref = process.cwd();

// const buildTool = new BuildTool();
// buildTool.init();

const argv: string[] = process.argv.slice(2);
let input: string = '';
input = argv[2];

// let argument: Argument = new Argument(input);

console.log('arguments: ', input);

const buildTool = new BuildTool();
// dwncrwlr.init();