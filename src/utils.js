import {getAccountCashStateSupervisor} from "./clients/accountClient";

export const BANK_POSITIONS = {
    ADMIN_GL: "ROLE_GL_ADMIN",
    ADMIN: "ROLE_ADMIN",
    ROLE_SUPERVISOR: "ROLE_SUPERVISOR",
    ROLE_AGENT: "ROLE_AGENT",
};

export function isSupervisor(user) {
    const supervisorRoles = [BANK_POSITIONS.ADMIN_GL, BANK_POSITIONS.ROLE_SUPERVISOR]
    return supervisorRoles.includes(user['role']['name'])
}

export function isAgent(user) {
    const supervisorRoles = [BANK_POSITIONS.ROLE_AGENT]
    return supervisorRoles.includes(user['role']['name'])
}
