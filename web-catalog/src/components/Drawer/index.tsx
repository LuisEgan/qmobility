import { useEffect, useState } from "react";
import {
  Drawer as DrawerAntd,
  Divider,
  Button,
  message,
  Spin,
  Modal,
  Input,
} from "antd";
import { Carousel } from "react-responsive-carousel";
import { useLazyQuery } from "@apollo/react-hooks";
import { IVehicle } from "../../gql/Vehicle/Types";

import Battery from "../../../public/svg/battery_std.svg";
import Polymer from "../../../public/svg/polymer.svg";
import Bubbles from "../../../public/svg/bubbles.svg";
import Spa from "../../../public/svg/spa.svg";
import Nature from "../../../public/svg/nature.svg";
import Speed from "../../../public/svg/speed.svg";
import Flash from "../../../public/svg/flash_on.svg";
import Pound from "../../../public/svg/pound.svg";

import "./styles.scss";
import { Vehicle } from "../../gql";
import { kmToMiles } from "../../lib/numbers";
import { IBookTestDriveVars } from "../../gql/Vehicle/queries";

interface IDrawer {
  onClose?: () => void;
  visible: boolean;
  eve: IVehicle;
}

interface IItem {
  icon?: JSX.Element | string;
  title: string;
  description: string;
}

const Drawer = (props: IDrawer) => {
  const { onClose, visible, eve } = props;

  const [bookTestDrive, { data: bookTestDriveData, loading }] = useLazyQuery<
    {
      bookTestDrive: boolean;
    },
    IBookTestDriveVars
  >(Vehicle.queries.bookTestDrive);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (bookTestDriveData) {
      message.success("We'll contact you soon!");
      setIsModalVisible(false);
    }
  }, [bookTestDriveData]);

  const onBookTestDrive = () => {
    if (email && name) {
      bookTestDrive({
        variables: {
          name,
          email,
          carId: eve?.Vehicle_ID,
        },
      });
    } else {
      message.warning("Please enter all your information.");
    }
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setIsModalVisible(false);
  };

  const Item = (item: IItem) => {
    const { icon, title, description } = item;

    return (
      <div>
        <div>
          {icon}
          {title}
        </div>

        <div>{description}</div>
      </div>
    );
  };

  return (
    <DrawerAntd
      width="75vw"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      className="drawer"
    >
      <Modal
        title="How could we contact you?"
        visible={isModalVisible}
        onOk={onBookTestDrive}
        onCancel={resetForm}
        okText="Let's go"
        cancelText="Not yet"
      >
        <Input
          value={name}
          placeholder="What's your name?"
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "2vh 0" }}
        />
        <Input
          value={email}
          placeholder="your@email.com"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>

      <span className="text-2xl font-bold">
        {eve?.Vehicle_Make}
        {" "}
        {eve?.Vehicle_Model}
        {" "}
        {eve?.Vehicle_Model_Version}
      </span>

      <Carousel className="m-auto pt-10 lg:w-3/4" autoPlay>
        {eve?.Images.slice(0, 5).map((i) => (
          <img key={i} src={i} alt={i} />
        ))}
      </Carousel>
      <Divider />

      <div className="grid grid-cols-2">
        <Item
          title="Battery"
          description={`${eve?.Battery_Capacity_Full} kW/h`}
          icon={<Battery />}
        />
        <Item
          title="Range"
          description={`${kmToMiles(eve?.Range_Real)} Km`}
          icon={<Polymer />}
        />
        <Item
          title="Seats"
          description={`${eve?.Misc_Seats}`}
          icon={<Bubbles />}
        />
        <Item
          title="Efficiency"
          description={`${eve?.Efficiency_Real}`}
          icon={<Nature />}
        />
        <Item
          title="Speed"
          description={`${kmToMiles(eve?.Performance_Topspeed)} m/h`}
          icon={<Speed />}
        />
        <Item
          title="Charge time"
          description={`${eve?.Fastcharge_ChargeTime} h`}
          icon={<Flash />}
        />
        <Item
          title="Price"
          description={`${eve?.Price_From_UK} £`}
          icon={<Pound />}
        />
        <Item
          title="Availability"
          description={`From ${eve?.Availability_Date_From}`}
          icon={<Spa />}
        />
      </div>

      <Divider />

      <Button
        type={loading ? "ghost" : "primary"}
        onClick={() => setIsModalVisible(true)}
      >
        {loading ? <Spin /> : "Book test drive"}
      </Button>
    </DrawerAntd>
  );
};

Drawer.defaultProps = {};

export default Drawer;
