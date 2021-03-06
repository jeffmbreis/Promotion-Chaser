const puppeteer = require("puppeteer");
const stores = require('./dictionaries/stores');

const getJQueryPageObject = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
        width: 1200,
        height: 800,
    })
    await page.goto(url, {waitUntil: 'networkidle2'});
    await page.evaluate(() => {
        const links = document.querySelector('a');

        console.log('links', links)
    })



    browser.close();

    // const html = await rp(url);
    // const linksMap = cheerio('a', html).map(async (a, b) => {
    //     console.log('=================')
    //     console.log('========a========')
    //     console.log('=================')
    //     console.log(a)
    //     console.log('=================')
    //     console.log('========/a=======')
    //     console.log('=================')
    //     console.log('=================')
    //     console.log('========b========')
    //     console.log('=================')
    //     console.log(b.attribs.href)
    //     console.log('=================')
    //     console.log('========/b=======')
    //     console.log('=================')
    // })

    //
    //
    // console.log(`------------------------`);
    // console.log(`Iniciando navegação em ${url}`);
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // console.log(`Indo para a página ${url}`);
    // await page.goto(url);
    // console.log(`Adicionando jQuery em ${url}`);
    // await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});
    //
    // console.log(`Aguardando carregamento da página em ${url}`);
    // const jQueryObject = await page.evaluate((data) => {
    //     console.log(data)
    // });
    //
    // console.log(`Navegação finalizada em ${url}`);
    //
    // browser.close();
    // console.log(`retornando valor em ${url}`);
    // console.log(`--------------------`);
    //
    // console.log('jQueryObject', jQueryObject)
    //
    // return jQueryObject
}

const getLinksFromJQueryPageObject = jQueryPageObject => {
    const pageLinks = jQueryPageObject('a');

    console.log('pageLinks', pageLinks)

    Object.keys(pageLinks).forEach(key => {
        console.log(pageLinks[key])
    })
}

stores.forEach(store => {
    store.urlsToCrawler.forEach(async (urlToCrawler) => {
        getJQueryPageObject(urlToCrawler.url)
        .then(response => {
            console.log('jQUeryPageObject', response)
        })
        .catch(err => console.log('error', err))

        // const links = getLinksFromJQueryPageObject(jQUeryPageObject)
    })
})