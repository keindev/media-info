'use strict';

import { promises as fs } from 'fs';
import path from 'path';

const LIBRARY_PATH = path.resolve(process.cwd(), 'lib');

async function* getFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);

    if (entry.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

for await (const filePath of getFiles(LIBRARY_PATH)) {
  const extname = path.extname(filePath);

  if (extname === '.js') {
    const dir = path.dirname(filePath);
    const name = path.basename(filePath, extname);

    await fs.rename(filePath, path.resolve(dir, path.format({ dir, ext: '.mjs', name })));
  }
}

/**
glob('lib\/**\/*.js', (_, filePaths) => {
  for (const filePath of filePaths) {
    const parts = filePath.split('.');
    parts.pop();
    const mjsFileName = parts.join('.') + '.mjs';
    createReadStream(join(__dirname, '..', filePath))
      .pipe(replaceStream(/from '(\.?\.\/[^']*)'/g, "from '$1.mjs'"))
      .pipe(createWriteStream(join(__dirname, '..', mjsFileName)))
      .on('close', () => {
        unlinkSync(filePath);
      });
  }
});
*/
