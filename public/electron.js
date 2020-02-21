const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const convert = require("convert-units");

function createWindow() {
	let win = new BrowserWindow({
		width: 1080,
		height: 720,
		frame: false,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.setMenu(null);
	win.webContents.openDevTools();
	win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
}

ipcMain.on("convert-unit-req", (event, arg) => {
	let { name, from, to, val } = arg;
	try {
		if (from === "yd") {
			from = "ft";
			val = val * 3;
		} else if (to === "yd") {
			to = "ft";
			val = val / 3;
		}
		let res = convert(val)
			.from(from)
			.to(to);
		event.reply("convert-unit-res", { res, name });
	} catch (e) {
		event.reply("convert-unit-res", "Error");
	}
});

app.whenReady().then(createWindow);
