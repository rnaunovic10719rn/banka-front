import React, { useEffect, useState } from "react";
import Block from "../../components/common/Block";
import Card from "../../components/common/Card";
import ProfilePrivacy from "../../components/privacy";
import ProfileInformation from "../../components/ProfileInformation";
import nightwind from "nightwind/helper"
import Button from "../../components/common/Button";

export default function InformationPage(props) {
  return (
    <Block title="Profil">
      <ProfileInformation />
      <ProfilePrivacy />
      <Card title="Ostalo">
        <Button label="Toggle Dark Mode" onClick={() => nightwind.toggle()} />
      </Card>
    </Block>
  )
}
