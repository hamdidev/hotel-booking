import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SettingOutlined } from "@ant-design/icons";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from "../actions/stripe";
import { toast } from "react-toastify";

const { Meta } = Card;
const { Ribbon } = Badge;
const ConnectNav = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      // console. (res);
      setBalance(res.data);
    });
  }, []);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(auth.token);
      // console.log("Payout setting link", res);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Unable to access settings.. Try again later");
    }
  };
  return (
    <>
      <div className="container-fluid p-5">
        <div className="d-flex justify-content-around">
          <Card>
            <Meta
              avatar={<Avatar>{user.name[0]}</Avatar>}
              title={user.name}
              description={`Joined ${moment(user.createdAt).fromNow()}`}
            />
          </Card>
          {auth &&
            auth.user &&
            auth.user.stripe_seller &&
            auth.user.stripe_seller.charges_enabled && (
              <>
                <Ribbon text="Available " color="geekblue">
                  <Card className="bg-light pt-1">
                    {balance &&
                      balance.pending &&
                      balance.pending.map((bp, i) => (
                        <span className="lead" key={i}>
                          {currencyFormatter(bp)}
                        </span>
                      ))}
                  </Card>
                </Ribbon>
                <Ribbon text="Payouts " color="geekblue">
                  <Card
                    onClick={handlePayoutSettings}
                    className="bg-light pointer"
                  >
                    <SettingOutlined className="h5 pt-2" />
                  </Card>
                </Ribbon>
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default ConnectNav;
