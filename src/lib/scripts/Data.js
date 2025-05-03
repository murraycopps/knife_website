export default class Data {
    static gallery = [];
    static projects = [];
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
}