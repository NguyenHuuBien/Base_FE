
export const BASE_URL_DEV = "http://localhost:8386";

export const BASE_URL_PROD = "https://e-learning-ohlk.onrender.com";

export const AUTH = {
    LOGIN: "/login",
    REGISTER: "/register",
    REFRESH_TOKEN: "/refresh/token",
    LOGOUT: "/logout",
};

export const USERS = {
    GET_LIST: "/user/list",
    GET_BY_ID: "/user/get",
    CREATE: "/user/create",
    UPDATE: "/user/update",
    DELETE: "/user/delete",
};

export const COURSES = {
    GET_LIST: "/course/list",
    GET_BY_ID: "/course/get",
    CREATE: "/course/create",
    UPDATE: "/course/update",
    DELETE: "/course/delete",
    SUGGEST: "/suggest/course",
    EVALUATE: "/evaluate/create",
    EVALUATE_LIST: "/evaluate/list",
};

export const TEST = {
    GET_LIST: "/course/test/list",
    GET_BY_ID: "/course/test/get",
    CREATE: "/course/test/create",
    UPDATE: "/course/test/update",
    DELETE: "/course/test/delete",
};

export const QUESTION = {
    GET_LIST: "/question/list",
    GET_BY_ID: "/question/get",
    CREATE: "/question/create",
    UPDATE: "/question/update",
    DELETE: "/question/delete",
};

export const RESULT = {
    GET_LIST: "/result/list",
    GET_BY_ID: "/result/get",
    CREATE: "/result/create",
    UPDATE: "/result/update",
    DELETE: "/result/delete",
};

export const LESSON = {
    GET_LIST: "/lesson/list",
    GET_BY_ID: "/lesson/get",
    CREATE: "/lesson/create",
    UPDATE: "/lesson/update",
    DELETE: "/lesson/delete",
    LAUNCH: "/scorm/launch",
};

export const DOCUMENT = {
    GET_LIST: "/document/list",
    GET_BY_ID: "/document/get",
    CREATE: "/document/create",
    UPDATE: "/document/update",
    DELETE: "/document/delete",
};

export const REPORT = {
    TEST: "/report/test",
    COURSE: "/report/course",
};

export const BLOG = {
    UPLOAD: "/blog/upload",
    GET_LIST: "/blog/list",
    GET_BY_ID: "/blog/get",
    CREATE: "/blog/create",
    UPDATE: "/blog/update",
};