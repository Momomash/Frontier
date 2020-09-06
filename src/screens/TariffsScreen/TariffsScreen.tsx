import React, { FunctionComponent } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';

import { actions, Status, Tariff } from './reducer';
import { localizationMaterialTable } from '@/utils/localizationMaterialTable';
import { Store } from '@/store';

type Props = {
    tariffs: Array<Tariff>;
    addTariff(tariff: Tariff): void;
    deleteTariff(tariff: Tariff): void;
};

const getFunctionForRow = (action: (tariff: Tariff) => void) => {
    return (newData: Tariff) => {
        action(newData);
        return Promise.resolve();
    };
};
export const TariffsComponent: FunctionComponent<Props> = ({
    tariffs,
    addTariff,
    deleteTariff,
}) => {
    const activeTariffs = tariffs.filter((tariff) => tariff.status === Status.active);
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
            data={JSON.parse(JSON.stringify(activeTariffs))}
            editable={{
                onRowAdd: getFunctionForRow(addTariff),
                onRowDelete: getFunctionForRow(deleteTariff),
            }}
            localization={localizationMaterialTable}
            options={{
                actionsColumnIndex: -1,
            }}
        />
    );
};

const mapStateToProps = ({ tariffs }: Store) => ({ tariffs });

const mapDispatchToProps = {
    addTariff: actions.add,
    deleteTariff: actions.delete,
};

export const TariffsScreen = connect(mapStateToProps, mapDispatchToProps)(TariffsComponent);
