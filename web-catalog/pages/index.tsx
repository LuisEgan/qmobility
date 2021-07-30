import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { Card, Select } from "antd";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { Vehicle } from "../src/gql";
import { IGetVehicleByMakesAndModelsVars } from "../src/gql/Vehicle/queries";

import { IVehicle } from "../src/gql/Vehicle/Types";
import { Drawer, EVECard } from "../src/components";

export {};

const { Option } = Select;

const CAR_SET = 25;

const Index = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [hasFetchedAll, setHasFetchedAll] = useState<boolean>(false);
  const [makesLoading, setMakesLoading] = useState<boolean>(false);
  const [modelsLoading, setModelsLoading] = useState<boolean>(false);

  const [makesSelected, setMakesSelected] = useState<string[]>([]);

  const [modelsOpts, setModelsOpts] = useState<string[]>([]);
  const [modelsSelected, setModelsSelected] = useState<string[]>([]);

  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [selectedEve, setSelectedEve] = useState<IVehicle>();

  // * Fetch eVes
  const { data: eVes, loading: eVesLoading, fetchMore: getEVEs } = useQuery<
    { getVehicleByMakesAndModels: IVehicle[] },
    IGetVehicleByMakesAndModelsVars
  >(Vehicle.queries.getVehicleByMakesAndModels, {
    variables: {
      skip: 0,
      limit: CAR_SET,
    },
    fetchPolicy: "network-only",
  });

  // * Fetch Makes
  const { data: vehicleMakesData } = useQuery<{
    vehicleMakes: string[];
  }>(Vehicle.queries.vehiclesMakes);

  // * Fetch Models
  const [getVehicleModels, { data: getVehicleModelsData }] = useLazyQuery<
    {
      getVehicleModels: string[];
    },
    { makes: string[] }
  >(Vehicle.queries.getVehicleModels);

  const fetchMore = async () => {
    try {
      if (!hasFetchedAll) {
        await getEVEs({
          variables: {
            skip: skip + CAR_SET,
          },
          updateQuery(_, { fetchMoreResult }) {
            return fetchMoreResult;
          },
        });
        setSkip(skip + CAR_SET);
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };
  useBottomScrollListener(fetchMore);

  // * Display eVes
  useEffect(() => {
    if (eVes) {
      // * Set eVes
      if (skip === 0) {
        setVehicles([...eVes.getVehicleByMakesAndModels]);
      } else {
        setVehicles([...vehicles, ...eVes.getVehicleByMakesAndModels]);
      }

      if (eVes.getVehicleByMakesAndModels.length < CAR_SET) {
        setHasFetchedAll(true);
      }
    }
  }, [eVes]);

  // * Update Models
  useEffect(() => {
    if (getVehicleModelsData) {
      setModelsOpts(getVehicleModelsData.getVehicleModels);
    }
  }, [getVehicleModelsData]);

  const LoadingGrid = () => (
    <>
      {[...Array(10)].map(() => (
        <Card
          key={Math.random()}
          loading={eVesLoading || makesLoading || modelsLoading}
        />
      ))}
    </>
  );

  const handleMakeChange = async (makes: string[]) => {
    setSkip(0);
    const isEmpty = !makes[0].length;
    setMakesSelected(isEmpty ? [] : makes);

    const variables: IGetVehicleByMakesAndModelsVars = {
      skip: 0,
    };

    if (!isEmpty) {
      variables.makes = makes;
    } else {
      setModelsOpts([]);
      setModelsSelected([]);
    }

    if (!isEmpty && modelsSelected.length) {
      variables.models = modelsSelected;
    }

    setMakesLoading(true);
    try {
      getVehicleModels({
        variables: {
          makes,
        },
      });

      await getEVEs({
        variables,
        updateQuery(_, { fetchMoreResult }) {
          return fetchMoreResult;
        },
      });
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setMakesLoading(false);
    }
  };

  const handleModelChange = async (models: string[]) => {
    setSkip(0);

    const isEmpty = !models[0].length;

    setModelsSelected(isEmpty ? [] : models);

    const variables: IGetVehicleByMakesAndModelsVars = {
      makes: makesSelected,
      skip: 0,
    };

    if (!isEmpty) {
      variables.models = models;
    }

    setModelsLoading(true);
    try {
      await getEVEs({
        variables,
        updateQuery(_, { fetchMoreResult }) {
          return fetchMoreResult;
        },
      });
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setModelsLoading(false);
    }
  };

  const selectEve = (v: IVehicle) => {
    setSelectedEve(v);
    setIsDrawerVisible(true);
  };

  return (
    <div>
      <Drawer
        {...{ visible: isDrawerVisible, eve: selectedEve }}
        onClose={() => setIsDrawerVisible(false)}
      />

      <div className="h-20 font-bold text-center flex justify-center items-center">
        <span className="text-5xl">eVe Catalogue</span>
      </div>

      <div className="p-10 lg:p-24">
        <div className="flex pb-10">
          <div className="flex flex-col flex-1 pr-3">
            <span>Makes</span>
            <Select
              virtual={false}
              allowClear
              className="py-3"
              mode="multiple"
              placeholder="Select Makes"
              onChange={(e) => handleMakeChange(e.toString().split(","))}
              optionLabelProp="label"
              value={makesSelected}
            >
              {vehicleMakesData?.vehicleMakes?.map((v) => (
                <Option key={v} value={v} label={v}>
                  <div>{v}</div>
                </Option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col flex-1 pl-3">
            <span>Models</span>
            <Select
              virtual={false}
              allowClear
              mode="multiple"
              className="py-3"
              placeholder="Select Model"
              onChange={(e) => handleModelChange(e.toString().split(","))}
              optionLabelProp="label"
              value={modelsSelected}
            >
              {modelsOpts.map((m) => (
                <Option key={m} value={m} label={m}>
                  <div>{m}</div>
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {!makesLoading
            && vehicles.map((v) => (
              <EVECard
                onClick={() => selectEve(v)}
                key={v.Vehicle_ID}
                imgSource={v.Images[0]}
                title={`${v.Vehicle_Make} ${v.Vehicle_Model}`}
                description={v.Vehicle_Model_Version}
              />
            ))}

          {(eVesLoading || makesLoading || modelsLoading) && <LoadingGrid />}
        </div>
      </div>
    </div>
  );
};

export default Index;
