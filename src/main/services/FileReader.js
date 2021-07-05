import { ipcMain, dialog } from 'electron';
const fs = require('fs-extra')

export default class FileReaderService {
    constructor() {
        ipcMain.handle('read-file', async (e, path) => {
            return await this.readFile(path)
        });
    }
    readFile(path) {
        return fs.readJsonSync(path)
    }
}
