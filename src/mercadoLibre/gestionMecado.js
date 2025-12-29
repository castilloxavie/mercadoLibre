import dotenv from "dotenv";
import  browserConfig  from "../browser/browserConfig.js"
import { timeOut } from "../utils/time.js";
import puppeteer from "puppeteer";
import { MERCADO_LIBRE } from "../utils/selectores.js";

dotenv.config();

export const gestionMercadoLibre = async () => {

    try {
        
       
        

        console.log("Iniciando navegador...");

        //1. INICO DE NAVEGACIÓN
        const browser = await puppeteer.launch(browserConfig)
        const page = await browser.newPage()

        //2. NAVEGAR A LA URL
        console.log("Navegando a la URL...");
        await page.goto(process.env.BASE_URL)

        //3. BUSCAR CATEGORIAS
        console.log("Buscando categorías...");
        await page.waitForSelector(MERCADO_LIBRE.CATEGORIA.categorias)
        await page.click(MERCADO_LIBRE.CATEGORIA.categorias)
        console.log("Encontroron las categorias");
        
        await timeOut(5000)
        
        console.log("Cerrando navegador...");
        await browser.close();

    } catch (error) {
        console.error("Error en gestionMercadoLibre:", error);
    }


}
