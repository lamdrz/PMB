export const loadImages = async (tag) => {
    const images = [];

    const response = await fetch(
        `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_APP_NAME}/image/list/${tag}.json`
    ).then((res) => {
        if (!res.ok) {
            throw new Error('Error fetching images: ' + res.statusText);
        }
        return res.json();
    }).then((data) => {
        if (data.resources) {
            data.resources.forEach((resource) => {
                images.push(
                    `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_APP_NAME}/image/upload/f_auto,q_auto/v${resource.version}/${resource.public_id}.${resource.format}`
                );
            });
        }
    }).catch((error) => {
        console.error('Error loading images:', error);
    });

    return images;
};
