import React, { FunctionComponent, useEffect } from 'react';
import MaterialTable from 'material-table';
import { IconButton } from '@material-ui/core';
import styled from '@emotion/styled';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { connect } from 'react-redux';
import { Store } from '@/store';
import { Visitor, EventUser, actions, VisitorsWithTimestamp } from './reducer';
import { Tariff } from '@/screens/';
import { AlertDialog } from '@/components';
import { localizationMaterialTable, calculateCostHelper, calculateDuration } from '@/utils';

type Props = {
    visitors: Array<Visitor>;
    tariffs: Array<Tariff>;
    modals: {
        payVisitors: boolean;
    };
    total: number;
    payedVisitors: Array<Visitor>;
    timer: number;
    addVisitor(visitor: Visitor): void;
    editVisitor(visitor: Visitor): void;
    deleteVisitor(visitor: Visitor): void;
    eventVisitor(event: EventUser): void;
    deleteSelectedVisitors(visitors: Array<Visitor>): void;
    paySelectedVisitors(selectedVisitors: VisitorsWithTimestamp): void;
    toggleModalPayVisitors(status: boolean): void;
    calculateTotal(total: number): void;
    setPayedVisitors(visitors: Array<Visitor>): void;
    updateTimer(timestamp: number): void;
};

interface TableState {
    data: Array<Visitor>;
}

interface NumberToString {
    [n: number]: string;
}

const Controls = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const getFunctionForRow = (action: (visitor: Visitor) => void) => {
    return (newData: Visitor) => {
        action(newData);
        return Promise.resolve();
    };
};
const VisitorsComponent: FunctionComponent<Props> = ({
    payedVisitors,
    total,
    visitors,
    tariffs,
    modals,
    addVisitor,
    editVisitor,
    deleteVisitor,
    eventVisitor,
    deleteSelectedVisitors,
    paySelectedVisitors,
    toggleModalPayVisitors,
    calculateTotal,
    setPayedVisitors,
    updateTimer,
}) => {
    const handleTogglePause = (currentUser: Visitor) => {
        const updatedVisitor: Visitor = visitors.find((visitor) => visitor.id === currentUser.id)!;
        if (updatedVisitor.status === 'active') {
            eventVisitor({ timestamp: Date.now(), status: 'pause', id: currentUser.id });
        } else {
            eventVisitor({ timestamp: Date.now(), status: 'active', id: currentUser.id });
        }
    };
    let tariffsColumn: NumberToString = {};
    tariffsColumn = tariffs.reduce(function (newArr, tariff) {
        newArr[tariff.id] = tariff.title;
        return newArr;
    }, tariffsColumn);

    useEffect(() => {
        const interval = setInterval(() => {
            updateTimer(Date.now());
        }, 60000);
        return () => {
            clearInterval(interval);
        };
    });
    return (
        <>
            <MaterialTable
                title="Фронтир"
                columns={[
                    {
                        title: 'Имя',
                        field: 'name',
                        validate: (rowData) => {
                            if (
                                visitors.map((item) => item.name).includes(rowData.name) &&
                                !visitors.map((item) => item.id).includes(rowData.id)
                            ) {
                                return 'Такое имя уже есть!';
                            } else {
                                return '';
                            }
                        },
                    },
                    {
                        title: 'Тариф',
                        field: 'tariffId',
                        lookup: tariffsColumn,
                    },
                    {
                        title: 'Продолжительность посещения',
                        field: 'duration',
                        type: 'numeric',
                        editable: 'onUpdate',
                        initialEditValue: '0',
                        render: (RowData) => {
                            if (RowData.times == undefined) {
                                return <>0</>;
                            } else {
                                return <>{calculateDuration(RowData.times)}</>;
                            }
                        },
                    },
                    {
                        title: 'Стоимость',
                        field: 'cost',
                        type: 'numeric',
                        render: (RowData) => {
                            return <>{calculateCostHelper(RowData, tariffs)}</>;
                        },
                    },
                    {
                        field: 'status',
                        title: 'Статус',
                        editable: 'never',
                        initialEditValue: 'active',
                        defaultFilter: 'active',
                        render: (RowData) => {
                            let icon;
                            if (RowData.status === 'active') {
                                icon = <PauseIcon />;
                            } else {
                                icon = <PlayArrowIcon />;
                            }
                            return (
                                <Controls>
                                    <IconButton
                                        aria-label="Control"
                                        onClick={() => handleTogglePause(RowData)}
                                    >
                                        {icon}
                                    </IconButton>
                                </Controls>
                            );
                        },
                    },
                ]}
                data={JSON.parse(JSON.stringify(visitors))}
                editable={{
                    onRowAdd: getFunctionForRow(addVisitor),
                    onRowUpdate: getFunctionForRow(editVisitor),
                    onRowDelete: getFunctionForRow(deleteVisitor),
                }}
                actions={[
                    {
                        tooltip: 'Удалить',
                        icon: 'delete',
                        onClick: (evt, data) => {
                            data = Array.isArray(data) ? data : [data];
                            deleteSelectedVisitors(data);
                        },
                    },
                    {
                        tooltip: 'Рассчитать',
                        icon: 'payment',
                        onClick: (evt, data) => {
                            data = Array.isArray(data) ? data : [data];
                            const total = calculateCostHelper(data, tariffs);
                            calculateTotal(total);
                            setPayedVisitors(data);
                            toggleModalPayVisitors(true);
                        },
                    },
                ]}
                localization={localizationMaterialTable}
                options={{
                    selection: true,
                    actionsColumnIndex: -1,
                    filtering: true,
                }}
            />
            <AlertDialog
                agreeButtonText="Расчитать"
                disagreeButtonText="Отмена"
                agreeOnClick={() => {
                    paySelectedVisitors({ visitors: payedVisitors, timestamp: Date.now() });
                    toggleModalPayVisitors(false);
                }}
                dialogTitle="Рассчитать посетителей"
                dialogContent={'Итого к расчету: ' + total}
                isOpen={modals.payVisitors}
                close={() => toggleModalPayVisitors(false)}
            />
        </>
    );
};

const mapStateToProps = (store: Store) => {
    return {
        visitors: store.visitors.visitors,
        tariffs: store.tariffs,
        modals: store.visitors.modals,
        total: store.visitors.total,
        payedVisitors: store.visitors.payedVisitors,
        timer: store.visitors.timer,
    };
};

const mapDispatchToProps = {
    addVisitor: actions.add,
    editVisitor: actions.edit,
    deleteVisitor: actions.delete,
    eventVisitor: actions.event,
    deleteSelectedVisitors: actions.selectedDelete,
    paySelectedVisitors: actions.selectedPay,
    toggleModalPayVisitors: actions.modalPayToggle,
    calculateTotal: actions.totalCalculate,
    setPayedVisitors: actions.payedVisitorsSet,
    updateTimer: actions.timerUpdate,
};

export const VisitorsScreen = connect(mapStateToProps, mapDispatchToProps)(VisitorsComponent);
