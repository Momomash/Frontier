import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { createStore } from '@/store';
import { VisitorsScreen } from '@/screens';

describe('VisitorsScreen with real store', () => {
    let store: any;
    beforeEach(() => {
        store = createStore();
        jest.spyOn(store, 'dispatch');
    });

    it('should delete Visitor', () => {
        const wrapper = mount(
            <Provider store={store}>
                <VisitorsScreen />
            </Provider>,
        );
        wrapper.find('button[title="Удалить"]').first().simulate('click');
        wrapper.update();
        wrapper.find('button[title="Сохранить"]').simulate('click');
        wrapper.update();
        expect(store.getState()).toMatchInlineSnapshot(`
            Object {
              "statistics": Object {
                "endDate": "",
                "startDate": "",
                "statisticsIndicator": "",
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
                "historyVisitors": Array [],
                "modals": Object {
                  "historyVisitors": false,
                  "payVisitors": false,
                },
                "payedVisitors": Array [],
                "timer": 0,
                "total": 0,
                "visitors": Array [
                  Object {
                    "id": 2,
                    "name": "Франц 2",
                    "status": 2,
                    "tariffId": 2,
                    "times": Array [
                      Object {
                        "status": 0,
                        "timestamp": 1597246825795,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598099948000,
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
                        "timestamp": 1597246825795,
                      },
                      Object {
                        "status": 2,
                        "timestamp": 1598099948000,
                      },
                    ],
                  },
                ],
              },
            }
        `);
    });
});
