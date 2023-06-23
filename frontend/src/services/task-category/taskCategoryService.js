import http from "../httpService";
import config from "../../config.json";

const apiEndPoint = config.apiUrl + "/auth-user/task-categories";

function getTaskCategoryUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getTaskCategories(params) {
  return http.get(apiEndPoint,{ params});
}

export function getTaskCategory(taskCategoryId) {
  return http.get(getTaskCategoryUrl(taskCategoryId));
}

export function saveTaskCategory(taskCategory) {
  if (taskCategory.id) {
    const body = { ...taskCategory };
    delete body.id;
    return http.put(getTaskCategoryUrl(taskCategory.id), body);
  }
  return http.post(apiEndPoint, taskCategory);
}

export function deleteTaskCategory(taskCategoryId) {
  return http.delete(getTaskCategoryUrl(taskCategoryId));
}
