import http from "../httpService";
import config from "../../config.json";

const apiEndPoint = config.apiUrl + "/auth-user/tasks";
const assignTaskEndPoint = config.apiUrl + "/auth-user/tasks-assign";

function getTaskUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getTasks(params) {
  return http.get(apiEndPoint,{ params}); // params if we want to filter data like as sorting, searchig, pagination etc.
}

export function getTask(taskId) {
  return http.get(getTaskUrl(taskId));
}

export function saveTask(task) {
  if (task.id) {
    const body = { ...task };
    delete body.id;
    return http.put(getTaskUrl(task.id), body);
  }
  return http.post(apiEndPoint, task);
}

export function deleteTask(taskId) {
  return http.delete(getTaskUrl(taskId));
}

export function assignTaskToUsers(taskAssignUsers) {
  return http.post(assignTaskEndPoint, taskAssignUsers);
}
