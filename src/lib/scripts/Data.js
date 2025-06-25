export default class Data {
    static gallery = [];
    static projects = [];
    static progress = [];
    static images = [];
    static loaded = false;

    static async load() {
        if (Data.loaded) return;
        try {
            const response = await fetch('/api/data/gallery');
            Data.gallery = await response.json();
            
            Data.gallery.sort((a, b) => a.number - b.number);
            
            
            const response2 = await fetch('/api/data/projects');
            Data.projects = await response2.json();
            Data.projects.sort((a, b) => a.number - b.number);

            Data.projects.sort((a, b) => b.images.length - a.images.length);
            const response3 = await fetch('/api/data/progress');
            Data.progress = await response3.json();
            Data.loaded = true;
            Data.createImages();
        } catch (error) {
            console.log(error);
        }
    }

    static async reload() {
        Data.loaded = false;
        Data.gallery = [];
        Data.projects = [];
        Data.images = [];
        await Data.load();
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