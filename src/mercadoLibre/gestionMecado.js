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

        await timeOut(2000);

        //!4. SELECCIONAR CATEGORIA
        try {

            //supermercados
            await page.waitForSelector(MERCADO_LIBRE.SUBCATEGORIA.supermercado)
            await page.click(MERCADO_LIBRE.SUBCATEGORIA.supermercado)
            console.log("Encontraron la categoria supermercado");

            await page.waitForSelector(MERCADO_LIBRE.SUBCATEGORIA.verMas)
            await page.click(MERCADO_LIBRE.SUBCATEGORIA.verMas)
            console.log("Encontraron el boton ver mas");
            await timeOut(2000);


            //supermercado- extraccion de datos
            await page.waitForSelector(MERCADO_LIBRE.SUBCATEGORIA.productos)
            const productos = await page.$$eval(MERCADO_LIBRE.SUBCATEGORIA.productos, (cards, selectors) => {
                return cards.map(card => {
                    const titleLink = card.querySelector(selectors.name);
                    const img = card.querySelector(selectors.description);
                    const priceSpan = card.querySelector(selectors.price);
                    return {
                        name: titleLink ? titleLink.textContent.trim() : '',
                        description: img ? img.alt : '',
                        url: titleLink ? titleLink.href : '',
                        price: priceSpan ? priceSpan.textContent.trim() : '',
                        level: 2,
                        parent_id: 1,
                        source: "Mercado Libre"
                    };
                });
            }, MERCADO_LIBRE.SUBCATEGORIA);

            console.log("Encontraron los productos");
            console.log(JSON.stringify(productos, null, 2));
           



        } catch (error) {
            console.error("Error al seleccionar la categoria supermercado:", error);
        }

        
        await timeOut(5000)
        
        console.log("Cerrando navegador...");
        await browser.close();

    } catch (error) {
        console.error("Error en gestionMercadoLibre:", error);
    }


}
