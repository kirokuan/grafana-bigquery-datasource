export default class ResponseParser {
    constructor(q: any);
    parse(query: any, results: any): {
        target: any;
        datapoints: any;
    }[];
}
