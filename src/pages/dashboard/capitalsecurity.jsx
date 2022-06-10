import React from "react"

export default function CapitalSecurityPage() {
    const title = window.location.pathname.split("/")[2];
    return (
        <div>
            {title}
        </div>
    )
}