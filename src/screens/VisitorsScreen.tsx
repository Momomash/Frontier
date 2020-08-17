import React, { FunctionComponent } from 'react';
import MaterialTable, { Column } from 'material-table';
import { IconButton } from '@material-ui/core';
import styled from '@emotion/styled';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { localizationMaterialTable } from '@/utils/localizationMaterialTable';
import { initialUsers } from '@/utils/initialData';

type Props = {};
type State = {};
interface Row {
    id: number;
    name: string;
    tariff: string;
    duration: number;
    cost: number;
    status: string;
}
interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}
const Controls = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const VisitorsScreen: FunctionComponent<State> = () => {
    const users = initialUsers;
    const handleTogglePause = (currentUser: Row) => {
        const updatedUser: Row = state.data.find((user) => user.id === currentUser.id)!;
        if (updatedUser.status === 'active') {
            updatedUser.status = 'pause';
        } else {
            updatedUser.status = 'active';
        }
        setState((prevState) => {
            const data = [...prevState.data];
            data[data.indexOf(currentUser)] = updatedUser;
            return { ...prevState, data };
        });
    };
    const [state, setState] = React.useState<TableState>({
        columns: [
            {
                title: 'Имя',
                field: 'name',
                validate: (rowData) => {
                    if (
                        users.map((item) => item.name).includes(rowData.name) &&
                        !users.map((item) => item.id).includes(rowData.id)
                    ) {
                        return 'Такое имя уже есть!';
                    } else {
                        return '';
                    }
                },
            },
            {
                title: 'Тариф',
                field: 'tariff',
                lookup: { 1: '2р/мин', 2: 'Ночевка' },
            },
            {
                title: 'Продолжительность посещения',
                field: 'duration',
                type: 'numeric',
                editable: 'onUpdate',
                initialEditValue: '0',
            },
            { title: 'Стоимость', field: 'cost', type: 'numeric' },
            {
                field: 'status',
                title: 'Пауза/Старт',
                editable: 'never',
                initialEditValue: 'active',
                defaultGroupSort: 'asc',
                render: (RowData) => {
                    let icon;
                    if (RowData.status == 'active') {
                        icon = <PlayArrowIcon />;
                    } else {
                        icon = <PauseIcon />;
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
        data: users,
    });
    return (
        <MaterialTable
            title="20.08.2020"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
            actions={[
                {
                    tooltip: 'Удалить',
                    icon: 'delete',
                    onClick: () => alert('Вы хотите удалить посетителей'),
                },
                {
                    tooltip: 'Рассчитать',
                    icon: 'payment',
                    onClick: () => alert('Вы хотите рассчитать посетителей'),
                },
            ]}
            localization={localizationMaterialTable}
            options={{
                selection: true,
                actionsColumnIndex: -1,
            }}
        />
    );
};
