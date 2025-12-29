import dotenv from "dotenv";
import puppeteer from "puppeteer";
import { browserConfig } from "../browser/browserConfig.js"
import { timeOut } from "../utils/time.js";

dotenv.config();

export const gestionMercadoLibre = async () => {
    
    //1.Inicio de Navegación

    const browser = await puppeteer.launch(browserConfig)
    const page = await browser.newPage()

    //2. Navegacion a la URL
    await page.goto(process.env.BASE_URL)
}