///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['app/plugins/sdk'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sdk_1;
    var defaultQuery, BigQueryQueryCtrl;
    return {
        setters:[
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }],
        execute: function() {
            defaultQuery = "SELECT * FROM `ds-logging.sms.ds_logging_20180727` LIMIT 1000;";
            BigQueryQueryCtrl = (function (_super) {
                __extends(BigQueryQueryCtrl, _super);
                /** @ngInject **/
                function BigQueryQueryCtrl($scope, $injector) {
                    _super.call(this, $scope, $injector);
                    this.query.format = this.query.format || 'time_series';
                    this.query.alias = '';
                    this.formats = [{ text: 'Time series', value: 'time_series' }, { text: 'Table', value: 'table' }];
                    if (!this.query.rawSql) {
                        // special handling when in table panel
                        if (this.panelCtrl.panel.type === 'table') {
                            this.query.format = 'table';
                            this.query.rawSql = 'SELECT 1';
                        }
                        else {
                            this.query.rawSql = defaultQuery;
                        }
                    }
                    this.target = Object.assign(this.target, this.query);
                    this.panelCtrl.events.on('data-received', this.onDataReceived.bind(this), $scope);
                    this.panelCtrl.events.on('data-error', this.onDataError.bind(this), $scope);
                }
                BigQueryQueryCtrl.prototype.onDataReceived = function (dataList) {
                    this.lastQueryMeta = null;
                    this.lastQueryError = null;
                    // let anySeriesFromQuery = _.find(dataList, { refId: this.query.refId });
                    // if (anySeriesFromQuery) {
                    //   this.lastQueryMeta = anySeriesFromQuery.meta;
                    //  }
                };
                BigQueryQueryCtrl.prototype.onDataError = function (err) {
                    if (err.data && err.data.results) {
                        var queryRes = err.data.results[this.query.refId];
                        if (queryRes) {
                            this.lastQueryMeta = queryRes.meta;
                            this.lastQueryError = queryRes.error;
                        }
                    }
                };
                BigQueryQueryCtrl.templateUrl = 'partials/query.editor.html';
                return BigQueryQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("BigQueryQueryCtrl", BigQueryQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map