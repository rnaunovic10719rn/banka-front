import React, { useEffect, useState } from "react";
import Block from "../../components/common/Block";
import Card from "../../components/common/Card";
import ProfilePrivacy from "../../components/privacy";
import ProfileInformation from "../../components/ProfileInformation";

export default function InformationPage(props) {
  return (
    <Block title="Profil">
      <ProfileInformation />
      <ProfilePrivacy />
    </Block>
  )
}
