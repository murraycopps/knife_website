export default class Data {
    static gallery = [];
    static projects = [];
    static images = [];
    static loaded = false;

    static async load() {
        if (Data.loaded) return;
        try {
            const response = await fetch('/api/data/gallery');
            Data.gallery = await response.json();
            const response2 = await fetch('/api/data/projects');
            Data.projects = await response2.json();
            Data.projects.sort((a, b) => b.images.length - a.images.length);
            Data.loaded = true;
            Data.createImages();
        } catch (error) {
            console.log(error);
        }
    }

    static async getGallery() {
        if (!Data.loaded) await Data.load();
        return Data.gallery;
    }

    static async getProjects() {
        if (!Data.loaded) await Data.load();
        return Data.projects;
    }
    static async getImages() {
        if (!Data.loaded) await Data.load();
        return Data.images;
    }
    static async createImages() {
        Data.projects.forEach(project => {
            project.images.forEach(image => {
                Data.images.push(image);
            })
        })
        Data.gallery.forEach(knife => {
            knife.images.forEach(image => {
                Data.images.push(image);
            })
        })
    }

}