import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { createStore } from '@/store';
import { StatisticsScreen } from '@/screens';

describe('StatisticsScreen with real store', () => {
    let store: any;
    beforeEach(() => {
        store = createStore();
        jest.spyOn(store, 'dispatch');
    });

    it('should endDate, startDate, statisticsIndicator - total', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StatisticsScreen />
            </Provider>,
        );
        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: 'total' } });
        wrapper.update();
        wrapper.find('input#startDate').simulate('change', { target: { value: '111' } });
        wrapper.update();
        wrapper.find('input#endDate').simulate('change', { target: { value: '222' } });
        wrapper.update();
        expect(store.getState()).toMatchInlineSnapshot(`
            Object {
              "statistics": Object {
                "endDate": "222",
                "startDate": "111",
                "statisticsIndicator": "total",
              },
              "tariffs": Array [
                Object {
                  "cost": 2.5,
                  "id": 1,
                  "isDuration": true,
                  "maxCost": 600,
                  "title": "2,5р/мин",
                },
                Object {
                  "cost": 0,
                  "id": 2,
                  "isDuration": false,
                  "maxCost": 400,
                  "title": "Ночефка без буфета",
                },
                Object {
                  "cost": 0,
                  "id": 3,
                  "isDuration": false,
                  "maxCost": 600,
                  "title": "Ночефка с буфетом",
                },
                Object {
                  "cost": 0,
                  "id": 4,
                  "isDuration": false,
                  "maxCost": 100,
                  "title": "OneGame",
                },
              ],
              "visitors": Object {
                "historyVisitors": Array [
                  Object {
                    "id": 1,
                    "name": "Франц",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597833600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                  Object {
                    "id": 2,
                    "name": "Франц 2",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597836180000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                  Object {
                    "id": 3,
                    "name": "Франц 3",
                    "status": 2,
                    "tariffId": 3,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597924800000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597938000000,
                      },
                    ],
                  },
                  Object {
                    "id": 4,
                    "name": "Франц 4",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597929600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597953360000,
                      },
                    ],
                  },
                  Object {
                    "id": 5,
                    "name": "Франц 5",
                    "status": 2,
                    "tariffId": 4,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598098200000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598120400000,
                      },
                    ],
                  },
                  Object {
                    "id": 6,
                    "name": "Франц 6",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598184000000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598209200000,
                      },
                    ],
                  },
                  Object {
                    "id": 7,
                    "name": "Франц 7",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598199600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598219100000,
                      },
                    ],
                  },
                ],
                "modals": Object {
                  "historyVisitors": false,
                  "payVisitors": false,
                },
                "payedVisitors": Array [],
                "timer": 0,
                "total": 0,
                "visitors": Array [
                  Object {
                    "id": 0,
                    "name": "Франц",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597833600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                ],
              },
            }
        `);
    });
    it('should statisticsIndicator - average-cost', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StatisticsScreen />
            </Provider>,
        );
        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: 'average-cost' } });
        wrapper.update();
        expect(store.getState()).toMatchInlineSnapshot(`
            Object {
              "statistics": Object {
                "endDate": "2020-08-27",
                "startDate": "2020-07-28",
                "statisticsIndicator": "average-cost",
              },
              "tariffs": Array [
                Object {
                  "cost": 2.5,
                  "id": 1,
                  "isDuration": true,
                  "maxCost": 600,
                  "title": "2,5р/мин",
                },
                Object {
                  "cost": 0,
                  "id": 2,
                  "isDuration": false,
                  "maxCost": 400,
                  "title": "Ночефка без буфета",
                },
                Object {
                  "cost": 0,
                  "id": 3,
                  "isDuration": false,
                  "maxCost": 600,
                  "title": "Ночефка с буфетом",
                },
                Object {
                  "cost": 0,
                  "id": 4,
                  "isDuration": false,
                  "maxCost": 100,
                  "title": "OneGame",
                },
              ],
              "visitors": Object {
                "historyVisitors": Array [
                  Object {
                    "id": 1,
                    "name": "Франц",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597833600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                  Object {
                    "id": 2,
                    "name": "Франц 2",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597836180000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                  Object {
                    "id": 3,
                    "name": "Франц 3",
                    "status": 2,
                    "tariffId": 3,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597924800000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597938000000,
                      },
                    ],
                  },
                  Object {
                    "id": 4,
                    "name": "Франц 4",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597929600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597953360000,
                      },
                    ],
                  },
                  Object {
                    "id": 5,
                    "name": "Франц 5",
                    "status": 2,
                    "tariffId": 4,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598098200000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598120400000,
                      },
                    ],
                  },
                  Object {
                    "id": 6,
                    "name": "Франц 6",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598184000000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598209200000,
                      },
                    ],
                  },
                  Object {
                    "id": 7,
                    "name": "Франц 7",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598199600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598219100000,
                      },
                    ],
                  },
                ],
                "modals": Object {
                  "historyVisitors": false,
                  "payVisitors": false,
                },
                "payedVisitors": Array [],
                "timer": 0,
                "total": 0,
                "visitors": Array [
                  Object {
                    "id": 0,
                    "name": "Франц",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597833600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                ],
              },
            }
        `);
    });
    it('should statisticsIndicator - average-duration', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StatisticsScreen />
            </Provider>,
        );
        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: 'average-duration' } });
        wrapper.update();
        expect(store.getState()).toMatchInlineSnapshot(`
            Object {
              "statistics": Object {
                "endDate": "2020-08-27",
                "startDate": "2020-07-28",
                "statisticsIndicator": "average-duration",
              },
              "tariffs": Array [
                Object {
                  "cost": 2.5,
                  "id": 1,
                  "isDuration": true,
                  "maxCost": 600,
                  "title": "2,5р/мин",
                },
                Object {
                  "cost": 0,
                  "id": 2,
                  "isDuration": false,
                  "maxCost": 400,
                  "title": "Ночефка без буфета",
                },
                Object {
                  "cost": 0,
                  "id": 3,
                  "isDuration": false,
                  "maxCost": 600,
                  "title": "Ночефка с буфетом",
                },
                Object {
                  "cost": 0,
                  "id": 4,
                  "isDuration": false,
                  "maxCost": 100,
                  "title": "OneGame",
                },
              ],
              "visitors": Object {
                "historyVisitors": Array [
                  Object {
                    "id": 1,
                    "name": "Франц",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597833600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                  Object {
                    "id": 2,
                    "name": "Франц 2",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597836180000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                  Object {
                    "id": 3,
                    "name": "Франц 3",
                    "status": 2,
                    "tariffId": 3,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597924800000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597938000000,
                      },
                    ],
                  },
                  Object {
                    "id": 4,
                    "name": "Франц 4",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597929600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597953360000,
                      },
                    ],
                  },
                  Object {
                    "id": 5,
                    "name": "Франц 5",
                    "status": 2,
                    "tariffId": 4,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598098200000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598120400000,
                      },
                    ],
                  },
                  Object {
                    "id": 6,
                    "name": "Франц 6",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598184000000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598209200000,
                      },
                    ],
                  },
                  Object {
                    "id": 7,
                    "name": "Франц 7",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598199600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598219100000,
                      },
                    ],
                  },
                ],
                "modals": Object {
                  "historyVisitors": false,
                  "payVisitors": false,
                },
                "payedVisitors": Array [],
                "timer": 0,
                "total": 0,
                "visitors": Array [
                  Object {
                    "id": 0,
                    "name": "Франц",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597833600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                ],
              },
            }
        `);
    });
    it('should statisticsIndicator - quantity-visitors', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StatisticsScreen />
            </Provider>,
        );
        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: 'quantity-visitors' } });
        wrapper.update();
        expect(store.getState()).toMatchInlineSnapshot(`
            Object {
              "statistics": Object {
                "endDate": "2020-08-27",
                "startDate": "2020-07-28",
                "statisticsIndicator": "quantity-visitors",
              },
              "tariffs": Array [
                Object {
                  "cost": 2.5,
                  "id": 1,
                  "isDuration": true,
                  "maxCost": 600,
                  "title": "2,5р/мин",
                },
                Object {
                  "cost": 0,
                  "id": 2,
                  "isDuration": false,
                  "maxCost": 400,
                  "title": "Ночефка без буфета",
                },
                Object {
                  "cost": 0,
                  "id": 3,
                  "isDuration": false,
                  "maxCost": 600,
                  "title": "Ночефка с буфетом",
                },
                Object {
                  "cost": 0,
                  "id": 4,
                  "isDuration": false,
                  "maxCost": 100,
                  "title": "OneGame",
                },
              ],
              "visitors": Object {
                "historyVisitors": Array [
                  Object {
                    "id": 1,
                    "name": "Франц",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597833600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                  Object {
                    "id": 2,
                    "name": "Франц 2",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597836180000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                  Object {
                    "id": 3,
                    "name": "Франц 3",
                    "status": 2,
                    "tariffId": 3,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597924800000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597938000000,
                      },
                    ],
                  },
                  Object {
                    "id": 4,
                    "name": "Франц 4",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597929600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597953360000,
                      },
                    ],
                  },
                  Object {
                    "id": 5,
                    "name": "Франц 5",
                    "status": 2,
                    "tariffId": 4,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598098200000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598120400000,
                      },
                    ],
                  },
                  Object {
                    "id": 6,
                    "name": "Франц 6",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598184000000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598209200000,
                      },
                    ],
                  },
                  Object {
                    "id": 7,
                    "name": "Франц 7",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1598199600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598219100000,
                      },
                    ],
                  },
                ],
                "modals": Object {
                  "historyVisitors": false,
                  "payVisitors": false,
                },
                "payedVisitors": Array [],
                "timer": 0,
                "total": 0,
                "visitors": Array [
                  Object {
                    "id": 0,
                    "name": "Франц",
                    "status": 2,
                    "tariffId": 1,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597833600000,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1597847340000,
                      },
                    ],
                  },
                ],
              },
            }
        `);
    });
});
