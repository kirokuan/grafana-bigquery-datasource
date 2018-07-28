export default class ResponseParser {
    constructor(q: any);
    parseTable(query: any, results: any): any;
    parse(query: any, results: any): {
        data: {
            target: any;
            datapoints: any;
        }[];
    };
}
