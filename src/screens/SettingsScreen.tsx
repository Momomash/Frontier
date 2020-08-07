import React, { FunctionComponent } from 'react';
import MaterialTable, { Column } from 'material-table';

import { localizationMaterialTable } from '@/utils/localizationMaterialTable';
import { initialTariffs } from '@/utils/initialData';

type Props = {};
type State = {};
interface Row {
    id: number;
    title: string;
    cost: number;
    maxCost: number;
    isDuration: boolean;
}
interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

export const SettingsScreen: FunctionComponent<State> = () => {
    const [state, setState] = React.useState<TableState>({
        columns: [
            {
                title: 'Название тарифа',
                field: 'title',
            },
            {
                title: 'Стоимость за минуту',
                field: 'cost',
                type: 'numeric',
            },
            {
                title: 'Стоп-чек',
                field: 'maxCost',
                type: 'numeric',
            },
        ],
        data: initialTariffs,
    });
    return (
        <MaterialTable
            title="Тарифы"
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
            ]}
            localization={localizationMaterialTable}
            options={{
                selection: true,
                actionsColumnIndex: -1,
            }}
        />
    );
};
