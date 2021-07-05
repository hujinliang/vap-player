import { ipcMain, screen } from 'electron';

export default class SizeService {
    constructor() {
        ipcMain.handle('get-screen-size', async (e, path) => {
            const { workArea } = screen.getPrimaryDisplay()
            const screenArea =  workArea
            return [screenArea.width, screenArea.height]
        });
    }
}
