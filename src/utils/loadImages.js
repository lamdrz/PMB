const imageImports = {
    2025: import.meta.glob('../assets/annees/2025/*.{png,jpg,jpeg}'),
    2024: import.meta.glob('../assets/annees/2024/*.{png,jpg,jpeg}'),
    2023: import.meta.glob('../assets/annees/2023/*.{png,jpg,jpeg}'),
    2022: import.meta.glob('../assets/annees/2022/*.{png,jpg,jpeg}'),
    2021: import.meta.glob('../assets/annees/2021/*.{png,jpg,jpeg}'),
    2020: import.meta.glob('../assets/annees/2020/*.{png,jpg,jpeg}'),
    2019: import.meta.glob('../assets/annees/2019/*.{png,jpg,jpeg}'),
    2018: import.meta.glob('../assets/annees/2018/*.{png,jpg,jpeg}'),
    2017: import.meta.glob('../assets/annees/2017/*.{png,jpg,jpeg}'),
    2016: import.meta.glob('../assets/annees/2016/*.{png,jpg,jpeg}'),
    2015: import.meta.glob('../assets/annees/2015/*.{png,jpg,jpeg}'),
    2014: import.meta.glob('../assets/annees/2014/*.{png,jpg,jpeg}'),
    2013: import.meta.glob('../assets/annees/2013/*.{png,jpg,jpeg}'),
    2012: import.meta.glob('../assets/annees/2012/*.{png,jpg,jpeg}'),
    2011: import.meta.glob('../assets/annees/2011/*.{png,jpg,jpeg}'),
    2010: import.meta.glob('../assets/annees/2010/*.{png,jpg,jpeg}'),
    2009: import.meta.glob('../assets/annees/2009/*.{png,jpg,jpeg}'),
    2008: import.meta.glob('../assets/annees/2008/*.{png,jpg,jpeg}'),
    2007: import.meta.glob('../assets/annees/2007/*.{png,jpg,jpeg}'),
    2006: import.meta.glob('../assets/annees/2006/*.{png,jpg,jpeg}'),
    2005: import.meta.glob('../assets/annees/2005/*.{png,jpg,jpeg}'),
};


export const loadImages = async (year) => {
    const images = imageImports[year] || {};
    const Images = [];

    for (const path in images) {
        const image = await images[path]();
        Images.push(image.default);
    }

    return Images;
};
