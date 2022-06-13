import React from "react";
import Block from "../../components/common/Block";
import ProfilePrivacy from "../../components/privacy";
import ProfileInformation from "../../components/ProfileInformation";

export default function InformationPage(props) {
    return (
        <Block title="Profil">
            <ProfileInformation/>
            <ProfilePrivacy/>
        </Block>
    )
}
