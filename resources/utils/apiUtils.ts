

export function fillRequestTemplate(template: any, data: Record<string, any>) {
    const templateString = JSON.stringify(template);
    const filledString = templateString.replace(/{{(.*?)}}/g, (_, key) => {
        const value = data[key.trim()];
        return value !== undefined ? value : '';
    });
    return JSON.parse(filledString);
}
