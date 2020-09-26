import { http } from "./http.service";
import { ORGANIZATION_URL } from "./utils"

export const organizationService = {
    createOrganization,
    getOrganizations,
    getOrganizationById,
    assignMemberToOrganization,
    getOrganizationUsers,
    getOrganizationClients,
    getOrganizationTrainers,
  };

  function createOrganization(body) {
    return http.post(`${ORGANIZATION_URL}create`, body);
  }

  function getOrganizations() {
    return http.get(`${ORGANIZATION_URL}`);
  }

  function getOrganizationById(id) {
    return http.get(`${ORGANIZATION_URL}${id}`);
  }

  function assignMemberToOrganization(body) {
    return http.post(`${ORGANIZATION_URL}assignUsers`, body);
  }

  function getOrganizationUsers(id) {
    return http.get(`${ORGANIZATION_URL}users/${id}`);
  }

  function getOrganizationClients(id) {
    return http.get(`${ORGANIZATION_URL}clients/${id}`);
  }

  function getOrganizationTrainers(id) {
    return http.get(`${ORGANIZATION_URL}trainers/${id}`);
  }
  
  