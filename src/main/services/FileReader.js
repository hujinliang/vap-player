import {ipcMain} from 'electron';

const fs = require('fs-extra')
var MP4Box = require('mp4box');

export default class FileReaderService {
    constructor() {
        ipcMain.handle('read-file', async (e, path) => {
            return await this.readFile(path)
        });
        ipcMain.handle('read-config', async (e, path) => {
            return await this.readConfig(path)
        });
    }
    readFile(path) {
        return fs.readJsonSync(path)
    }
    // 从mp4中解析出config
    readConfig(path) {
        var mp4boxfile = MP4Box.createFile();
        var arrayBuffer = fs.readFileSync(path).buffer;
        arrayBuffer.fileStart = 0;
        mp4boxfile.appendBuffer(arrayBuffer);
        let box = mp4boxfile.boxes[1]
        if (box.type !== 'vapc') {
            box = mp4boxfile.boxes[3]
        }
        return Buffer.from(box.data).toString()
    }
}
