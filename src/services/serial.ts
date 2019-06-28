
export default class Serial {
    static async generate(model) {
        const lastId: number = await model.lastModelId();
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return `Vooom-${model.name.toLowerCase()}-${lastId + 1}-${text}`;
    }
}