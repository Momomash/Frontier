import React, { FunctionComponent } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { IconButton } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import { actions, Status, Tariff } from './reducer';
import { localizationMaterialTable } from '@/utils/localizationMaterialTable';
import { Store } from '@/store';

type Props = {
    tariffs: Array<Tariff>;
    defaultTariff: number;
    addTariff(tariff: Tariff): void;
    deleteTariff(tariff: Tariff): void;
    toggleDefaultTariff(id: number): void;
};

const Controls = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const getFunctionForRow = (action: (tariff: Tariff) => void) => {
    return (newData: Tariff) => {
        action(newData);
        return Promise.resolve();
    };
};
export const TariffsComponent: FunctionComponent<Props> = ({
    tariffs,
    defaultTariff,
    addTariff,
    deleteTariff,
    toggleDefaultTariff,
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
                    field: 'defaultTariff',
                    title: 'Тариф по умолчанию',
                    editable: 'never',
                    initialEditValue: 'active',
                    render: (RowData) => {
                        let icon;
                        if (RowData.id === defaultTariff) {
                            icon = <CheckCircleIcon />;
                        } else {
                            icon = <RadioButtonUncheckedIcon />;
                        }
                        return (
                            <Controls>
                                <IconButton
                                    aria-label="Control"
                                    onClick={() => toggleDefaultTariff(RowData.id)}
                                >
                                    {icon}
                                </IconButton>
                            </Controls>
                        );
                    },
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

const mapStateToProps = (store: Store) => {
    return {
        tariffs: store.tariffs.tariffs,
        defaultTariff: store.tariffs.defaultTariff,
    };
};

const mapDispatchToProps = {
    addTariff: actions.addTariff,
    deleteTariff: actions.deleteTariff,
    toggleDefaultTariff: actions.toggleDefaultTariff,
};

export const TariffsScreen = connect(mapStateToProps, mapDispatchToProps)(TariffsComponent);
