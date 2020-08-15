import React, { FunctionComponent, useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import { IconButton } from '@material-ui/core';
import styled from '@emotion/styled';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { connect } from 'react-redux';
import { AlertDialog } from '@/components';

import {
    addVisitor,
    editVisitor,
    deleteVisitor,
    eventVisitor,
    deleteSelectedVisitors,
    paySelectedVisitors,
} from '@/redux/actions';
import { localizationMaterialTable } from '@/utils';
import { Tariff, Visitor, EventUser, Store } from '@/redux/initialState';
import { calculateCost } from '@/utils';
import { calculateDuration } from '@/utils';

type Props = {
    visitors: Array<Visitor>;
    tariffs: Array<Tariff>;
    addVisitor(visitor: Visitor): void;
    editVisitor(visitor: Visitor): void;
    deleteVisitor(visitor: Visitor): void;
    eventVisitor(event: EventUser): void;
    deleteSelectedVisitors(visitors: Array<Visitor>): void;
    paySelectedVisitors(visitors: Array<Visitor>): void;
};

interface TableState {
    columns: Array<Column<Visitor>>;
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
        return new Promise((resolve) => {
            resolve();
            action(newData);
        });
    };
};
const VisitorsComponent: FunctionComponent<Props> = (props: Props) => {
    const {
        visitors,
        tariffs,
        addVisitor,
        editVisitor,
        deleteVisitor,
        eventVisitor,
        deleteSelectedVisitors,
        paySelectedVisitors,
    } = props;
    const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [total, setTotal] = React.useState<number>(0);
    const [payedVisitors, setPayedVisitors] = React.useState<Visitor[]>([]);
    const handleTogglePause = (currentUser: Visitor) => {
        const updatedVisitor: Visitor = visitors.find((visitor) => visitor.id === currentUser.id)!;
        if (updatedVisitor.status === 'active') {
            updatedVisitor.status = 'pause';
            eventVisitor({ timestamp: Date.now(), status: 'pause', id: currentUser.id });
        } else {
            updatedVisitor.status = 'active';
            eventVisitor({ timestamp: Date.now(), status: 'active', id: currentUser.id });
        }
        setState((prevState) => {
            const data = [...prevState.data];
            data[data.indexOf(currentUser)] = updatedVisitor;
            return { ...prevState, data };
        });
    };
    let tariffsColumn: NumberToString = {};
    tariffsColumn = tariffs.reduce(function (newArr, tariff) {
        newArr[tariff.id] = tariff.title;
        return newArr;
    }, tariffsColumn);
    const [timer, setTimer] = React.useState<number>(Date.now());
    const calculateTariffHelper = (data: Visitor) => {
        const tariffId = +data.tariffId;
        const tariffMaxCost = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff).maxCost;
        const tariffCost = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff).cost;
        const tariffIsDuration = (tariffs.find((tariff) => tariff.id === tariffId) as Tariff)
            .isDuration;
        return calculateCost(
            tariffCost,
            tariffMaxCost,
            calculateDuration(data.times),
            tariffIsDuration,
        );
    };
    const [state, setState] = React.useState<TableState>({
        columns: [
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
                    return <>{calculateTariffHelper(RowData)}</>;
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
                    } else if (RowData.status === 'pause') {
                        icon = <PlayArrowIcon />;
                    } else {
                        icon = <StopIcon />;
                    }
                    return (
                        <Controls>
                            <IconButton
                                aria-label="Pause"
                                onClick={() => handleTogglePause(RowData)}
                            >
                                {icon}
                            </IconButton>
                        </Controls>
                    );
                },
            },
        ],
        data: [],
    });
    useEffect(() => {
        if (visitors !== state.data) {
            setState({ ...state, data: visitors });
        }
        const interval = setInterval(() => {
            setTimer(Date.now());
        }, 60000);
        return () => clearInterval(interval);
    });
    return (
        <>
            <MaterialTable
                title="Фронтир"
                columns={state.columns}
                data={JSON.parse(JSON.stringify(state.data))}
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
                            let total = 0;
                            for (let i = 0; i < data.length; i++) {
                                total += calculateTariffHelper(data[i]);
                            }
                            setTotal(total);
                            setPayedVisitors(data);
                            setDialogOpen(true);
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
                    paySelectedVisitors(payedVisitors);
                    setDialogOpen(false);
                }}
                dialogTitle="Рассчитать посетителей"
                dialogContent={'Итого к расчету: ' + total}
                isOpen={isDialogOpen}
                close={() => setDialogOpen(false)}
            />
        </>
    );
};

const mapStateToProps = (store: Store) => {
    return { visitors: store.visitors, tariffs: store.tariffs };
};

const mapDispatchToProps = {
    addVisitor,
    editVisitor,
    deleteVisitor,
    eventVisitor,
    deleteSelectedVisitors,
    paySelectedVisitors,
};

export const VisitorsScreen = connect(mapStateToProps, mapDispatchToProps)(VisitorsComponent);
