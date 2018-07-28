export default class ResponseParser {
    constructor(q: any);
    parse(query: any, results: any): {
        target: string;
        datapoints: any;
    }[];
}
