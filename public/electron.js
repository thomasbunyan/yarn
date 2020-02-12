const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const convert = require("convert-units");

function createWindow() {
	let win = new BrowserWindow({
		width: 1080,
		height: 720,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.setMenu(null);
	win.webContents.openDevTools();
	win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
}

// ipcMain.on("convert-unit", (event, arg) => {
// 	// console.log("here 001", arg);
// 	console.log("hit");
// 	try {
// 		convert(arg.val)
// 			.from(arg.from)
// 			.to(arg.to);
// 		event.returnValue = "nice";
// 	} catch (e) {}
// });

ipcMain.on("convert-unit-req", (event, arg) => {
	let { from, to, val } = arg;
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
		event.reply("convert-unit-res", res);
	} catch (e) {
		event.reply("convert-unit-res", "Error");
	}
});

app.whenReady().then(createWindow);
