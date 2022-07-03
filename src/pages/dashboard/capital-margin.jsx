import React from "react";
import MarginKapitalDetails from "../../components/margins/MarginKapitalDetails";
import { useParams } from "react-router-dom";

export default function CapitalMarginPage() {
    const params = useParams();
    const type = params['type']

    return (
        <div>
            <MarginKapitalDetails type={type}/>
        </div>
    )
}