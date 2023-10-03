/**
 * @copyright Copyright (c) 2023 Christian Silfang
 */

import * as fs from 'fs';

export class CleanPackageJson {

    public workingDirectory: string;
    public pkgDistPath: string;

    constructor() {
        console.info('CleanPackageJson');
        this.workingDirectory = process.env.PWD as string;
        this.pkgDistPath = `${this.workingDirectory}/dist/package.json`;
    }

    public clean() {
        console.info('Start cleanup `package.json` ...');

        // Cleanup sections in package.json
        const packageJson = JSON.parse(fs.readFileSync(this.pkgDistPath).toString());

        delete packageJson.devDependencies;
        console.info('... devDependencies');
        delete packageJson.dependencies;
        console.info('... dependencies');
        delete packageJson.scripts;
        console.info('... scripts');

        fs.writeFileSync(this.pkgDistPath, JSON.stringify(packageJson, null, 2));

        console.info('Finished cleanup `package.json`');
    }

}

