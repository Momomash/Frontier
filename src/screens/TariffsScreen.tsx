import React, { FunctionComponent, useEffect } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';

import { localizationMaterialTable } from '@/utils/localizationMaterialTable';
import { Tariff, Store } from '@/redux/initialState';
import { addTariff, deleteTariff, editTariff } from '@/redux/actions';

type Props = {
    tariffs: Array<Tariff>;
    addTariff(visitor: Tariff): void;
    editTariff(visitor: Tariff): void;
    deleteTariff(visitor: Tariff): void;
};

interface TableState {
    data: Array<Tariff>;
}
const getFunctionForRow = (action: (tariff: Tariff) => void) => {
    return (newData: Tariff) => {
        return new Promise((resolve) => {
            resolve();
            action(newData);
        });
    };
};
export const TariffsComponent: FunctionComponent<Props> = (props: Props) => {
    const { tariffs, addTariff, editTariff, deleteTariff } = props;
    const [state, setState] = React.useState<TableState>({
        data: [],
    });
    useEffect(() => {
        if (tariffs !== state.data) {
            setState({ ...state, data: tariffs });
        }
    });
    return (
        <MaterialTable
            title="Тарифы"
            columns={[
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
                    title: 'Тип',
                    field: 'isDuration',
                    lookup: { true: 'Поминутная', false: 'Фиксированная цена' },
                },
                {
                    title: 'Стоп-чек',
                    field: 'maxCost',
                    type: 'numeric',
                },
            ]}
            data={JSON.parse(JSON.stringify(state.data))}
            editable={{
                onRowAdd: getFunctionForRow(addTariff),
                onRowUpdate: getFunctionForRow(editTariff),
                onRowDelete: getFunctionForRow(deleteTariff),
            }}
            localization={localizationMaterialTable}
            options={{
                actionsColumnIndex: -1,
            }}
        />
    );
};

const mapStateToProps = (store: Store) => {
    return { tariffs: store.tariffs };
};

const mapDispatchToProps = {
    addTariff,
    editTariff,
    deleteTariff,
};

export const TariffsScreen = connect(mapStateToProps, mapDispatchToProps)(TariffsComponent);
