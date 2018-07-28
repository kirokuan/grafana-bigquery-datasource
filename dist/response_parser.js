System.register([], function(exports_1) {
    var noExponents, ResponseParser;
    return {
        setters:[],
        execute: function() {
            // {
            //   "kind": "bigquery#queryResponse",
            //   "schema": {
            //    "fields": [
            //     {
            //      "name": "timestamp",
            //      "type": "TIMESTAMP",
            //      "mode": "NULLABLE"
            //     },
            //     {
            //      "name": "env",
            //      "type": "STRING",
            //      "mode": "NULLABLE"
            //     }
            //    ]
            //   },
            //   "jobReference": {
            //    "projectId": "ds-logging",
            //    "jobId": "job_HAcSgSoUU8r8CLo_3-F2aC66QFoY",
            //    "location": "US"
            //   },
            //   "totalRows": "10",
            //   "rows": [
            //    {
            //     "f": [
            //      {
            //       "v": "1.532683173436196E9"
            //      },
            //      {
            //       "v": "sms"
            //      }
            //     ]
            //    },
            //    {
            //     "f": [
            //      {
            //       "v": "1.532683095487301E9"
            //      },
            //      {
            //       "v": "sms"
            //      }
            //     ]
            //    },
            //    {
            //     "f": [
            //      {
            //       "v": "1.532681806182326E9"
            //      },
            //      {
            //       "v": "sms"
            //      }
            //     ]
            //    },
            //    {
            //     "f": [
            //      {
            //       "v": "1.532682252343027E9"
            //      },
            //      {
            //       "v": "sms"
            //      }
            //     ]
            //    },
            //    {
            //     "f": [
            //      {
            //       "v": "1.532683254888358E9"
            //      },
            //      {
            //       "v": "sms"
            //      }
            //     ]
            //    },
            //    {
            //     "f": [
            //      {
            //       "v": "1.532683367185995E9"
            //      },
            //      {
            //       "v": "sms"
            //      }
            //     ]
            //    },
            //    {
            //     "f": [
            //      {
            //       "v": "1.532682250447601E9"
            //      },
            //      {
            //       "v": "sms"
            //      }
            //     ]
            //    },
            //    {
            //     "f": [
            //      {
            //       "v": "1.532680646821175E9"
            //      },
            //      {
            //       "v": "sms"
            //      }
            //     ]
            //    },
            //    {
            //     "f": [
            //      {
            //       "v": "1.532683483158908E9"
            //      },
            //      {
            //       "v": "sms"
            //      }
            //     ]
            //    },
            //    {
            //     "f": [
            //      {
            //       "v": "1.53268016365358E9"
            //      },
            //      {
            //       "v": "sms"
            //      }
            //     ]
            //    }
            //   ],
            //   "totalBytesProcessed": "20436",
            //   "jobComplete": true,
            //   "cacheHit": false
            //  }
            noExponents = function (s) {
                var data = String(s).split(/[eE]/);
                if (data.length == 1)
                    return parseInt(data[0]);
                var n = Number(data[0]);
                for (var i = 0; i < parseInt(data[1]); i++) {
                    n *= 10;
                }
                return n;
            };
            ResponseParser = (function () {
                function ResponseParser(q) {
                }
                ResponseParser.prototype.parse = function (query, results) {
                    /*
                    if (!results || results.results.length === 0) { return []; }
                
                    var sqlResults = results.results[0];
                    if (!sqlResults.series) {
                      return [];
                    }
                
                    var res = {};
                    _.each(sqlResults.series, serie => {
                      _.each(serie.values, value => {
                        if (_.isArray(value)) {
                          addUnique(res, value[0]);
                        } else {
                          addUnique(res, value);
                        }
                      });
                    });
                
                    return _.map(res, value => {
                      return { text: value};
                    });
                  }
                  */ console.log(query);
                    var schema = results.schema.fields;
                    var rows = results.rows;
                    var data_points = rows.map(function (r) {
                        var a = r.f;
                        var v = 0, t = 0;
                        a.forEach(function (e, i) {
                            if (schema[i].name == 't') {
                                t = Math.round(noExponents(e.v) * 1000);
                            }
                            if (schema[i].name == 'm') {
                                v = parseInt(e.v);
                            }
                        });
                        return [v, t];
                    });
                    var sample_response = [{
                            "target": "upper_75",
                            "datapoints": [
                                [622, 1450754160000],
                                [365, 1450754220000]
                            ]
                        },
                        {
                            "target": "upper_90",
                            "datapoints": [
                                [861, 1450754160000],
                                [767, 1450754220000]
                            ]
                        }
                    ];
                    return [{ target: query.refId, datapoints: data_points }];
                };
                return ResponseParser;
            })();
            exports_1("default", ResponseParser);
        }
    }
});
//# sourceMappingURL=response_parser.js.map