const puppeteer = require('puppeteer');

const getProductInfo = async productLink => {
  const selectCityButtonClass = '.confirm-city-mobile__accept';
  const productPriceContainerClass = '.product-buy__price_active';
  const shopsButtonClass = '.order-avail-wrap__link';
  const shopsContainerClass = '.base-shop-view';
  const userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36';

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.setViewport({
      width: 768,
      height: 1080,
    });
    await page.goto(productLink);

    await page.waitForSelector(selectCityButtonClass);
    await page.click(selectCityButtonClass);

    const productPriceContainer = await page.$eval(
      productPriceContainerClass,
      el => el.textContent,
    );
    const price = productPriceContainer.split('₽')[0].replaceAll(' ', '');

    await page.waitForSelector(shopsButtonClass);
    await page.click(shopsButtonClass);

    await page.waitForSelector(shopsContainerClass);
    const allShops = await page.$$eval(shopsContainerClass, shopView =>
      shopView.map(view => {
        const available = view.lastElementChild.textContent;
        if (available.startsWith('сегодня')) {
          return view.firstElementChild.firstElementChild.textContent;
        }
      }),
    );

    const shops = allShops.filter(shop => shop);

    await browser.close();

    return {
      price: Number(price),
      shops,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getProductInfo;
